// Regex to check if the content type is a valid MIME type
export const MIME_Types = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/svg+xml",
  "image/tiff",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/vnd.wap.wbmp",
  "image/apng",
  "image/x-jng",
  "image/x-ms-bmp",
  "image/x-xbitmap",
  "image/x-xbm",
  "image/x-portable-bitmap",
  "image/x-portable-graymap",
  "image/x-portable-pixmap",
]; // List of MIME Types

// Cookie Type for Global
export type CookieType = Array<{
  name: string;
  value: string;
  options: object;
}>; // Global Cookie Type
