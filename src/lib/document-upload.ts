// Client-side guard for admin resource-file uploads (PDFs, docs, slides, zips).
// Mirrors the backend's FileUploadConstants.DocumentExtensions / MaxDocumentSizeBytes
// so bad files are rejected before ever reaching the API.

export const MAX_DOCUMENT_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB
export const DOCUMENT_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".zip"];

export class DocumentUploadError extends Error {}

export function validateDocumentFile(file: File): File {
  const ext = "." + (file.name.split(".").pop() ?? "").toLowerCase();
  if (!DOCUMENT_EXTENSIONS.includes(ext)) {
    throw new DocumentUploadError(`File must be one of: ${DOCUMENT_EXTENSIONS.join(", ")}`);
  }
  if (file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
    throw new DocumentUploadError(`File must be under ${MAX_DOCUMENT_UPLOAD_BYTES / (1024 * 1024)}MB`);
  }
  return file;
}
