// Client-side guard + compression for admin image uploads. Runs in the
// browser before a file ever reaches the backend, so oversized camera
// photos never make it into storage.

export const MAX_IMAGE_UPLOAD_BYTES = 300 * 1024; // 300KB — keep in sync with backend FileUploadConstants
const MAX_IMAGE_UPLOAD_LABEL = `${MAX_IMAGE_UPLOAD_BYTES / 1024}KB`;
// Largest uploaded image on the site renders ~800px wide; 1600px keeps it sharp on 2x screens.
const MAX_IMAGE_DIMENSION = 1600;
// Tried in order until the encoded image fits under the cap.
const OUTPUT_QUALITIES = [0.8, 0.7, 0.6, 0.5];

export class ImageUploadError extends Error {}

function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new ImageUploadError("Could not read image file"));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new ImageUploadError("Could not process image"))),
      type,
      quality,
    );
  });
}

async function resizeAndCompress(img: HTMLImageElement, mimeType: string, quality: number): Promise<Blob> {
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new ImageUploadError("Image processing is not supported in this browser");
  ctx.drawImage(img, 0, 0, width, height);

  // WebP is smaller than JPEG and keeps transparency. Browsers that can't
  // encode it (older Safari) silently return a PNG instead, so check the
  // result type and fall back: PNG for transparent sources, else JPEG.
  const webp = await canvasToBlob(canvas, "image/webp", quality);
  if (webp.type === "image/webp") return webp;

  return canvasToBlob(canvas, mimeType === "image/png" ? "image/png" : "image/jpeg", quality);
}

const EXTENSIONS: Record<string, string> = {
  "image/webp": "webp",
  "image/png":  "png",
  "image/jpeg": "jpg",
};

/**
 * Validates and compresses an image file selected in an admin upload form.
 * Resizes to a max 1600px edge and re-encodes as WebP (falling back to
 * JPEG, or PNG for transparent sources, where WebP encoding is unsupported). Throws ImageUploadError with a user-facing
 * message if the file isn't an image or is still too large afterward.
 */
export async function prepareImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new ImageUploadError("Please select an image file");
  }

  // Animated GIFs can't be re-encoded via canvas without losing the
  // animation, so just enforce the size cap and pass them through.
  if (file.type === "image/gif") {
    if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
      throw new ImageUploadError(`Image must be under ${MAX_IMAGE_UPLOAD_LABEL}`);
    }
    return file;
  }

  const img = await loadImage(file);
  let blob = await resizeAndCompress(img, file.type, OUTPUT_QUALITIES[0]);
  for (const quality of OUTPUT_QUALITIES.slice(1)) {
    if (blob.size <= MAX_IMAGE_UPLOAD_BYTES) break;
    blob = await resizeAndCompress(img, file.type, quality);
  }

  if (blob.size > MAX_IMAGE_UPLOAD_BYTES) {
    throw new ImageUploadError(
      `Image is too large even after compression. Please use a smaller image (under ${MAX_IMAGE_UPLOAD_LABEL}).`,
    );
  }

  const ext = EXTENSIONS[blob.type] ?? "jpg";
  const name = file.name.replace(/\.[^.]+$/, "") + "." + ext;
  return new File([blob], name, { type: blob.type });
}
