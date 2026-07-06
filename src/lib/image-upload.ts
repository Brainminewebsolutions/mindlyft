// Client-side guard + compression for admin image uploads. Runs in the
// browser before a file ever reaches the backend, so oversized camera
// photos never make it into storage.

export const MAX_IMAGE_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_DIMENSION = 1920;
const JPEG_QUALITY = 0.8;

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

function resizeAndCompress(img: HTMLImageElement, mimeType: string): Promise<Blob> {
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new ImageUploadError("Image processing is not supported in this browser"));
  ctx.drawImage(img, 0, 0, width, height);

  // Keep PNG for transparency; everything else becomes JPEG for the size win.
  const outputType = mimeType === "image/png" ? "image/png" : "image/jpeg";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new ImageUploadError("Could not process image"))),
      outputType,
      JPEG_QUALITY,
    );
  });
}

/**
 * Validates and compresses an image file selected in an admin upload form.
 * Resizes to a max 1920px edge and re-encodes as JPEG (PNGs stay PNG to
 * preserve transparency). Throws ImageUploadError with a user-facing
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
      throw new ImageUploadError(`Image must be under ${MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024)}MB`);
    }
    return file;
  }

  const img = await loadImage(file);
  const blob = await resizeAndCompress(img, file.type);

  if (blob.size > MAX_IMAGE_UPLOAD_BYTES) {
    throw new ImageUploadError(
      `Image is too large even after compression. Please use a smaller image (under ${MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024)}MB).`,
    );
  }

  const ext = blob.type === "image/png" ? "png" : "jpg";
  const name = file.name.replace(/\.[^.]+$/, "") + "." + ext;
  return new File([blob], name, { type: blob.type });
}
