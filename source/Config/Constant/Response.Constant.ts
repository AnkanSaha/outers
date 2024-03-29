// Regex to check if the content type is a valid MIME type
export const MIME_Types = [
  // Image Types
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
  "image/x-portable-anymap",
  // application Types
  "application/pdf",
  "application/zip",
  "application/x-zip",
  "application/x-zip-compressed",
  "application/x-7z-compressed",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-gzip",
  "application/x-bzip2",
  "application/x-xz",
  "application/x-lzip",
  "application/x-lzma",
  "application/x-lzop",
  "application/x-lrzip",
  "application/x-cpio",
  "application/x-shar",
  "application/x-rar",
  "application/x-ace",
  "application/json",
  "application/javascript",
  "application/xml",
  "application/xhtml+xml",
  "application/atom+xml",
  "application/rss+xml",
  "application/font-woff",
  "application/font-woff2",
  "application/font-otf",
  "application/font-ttf",
  "application/font-sfnt",
  "application/font-eot",
  // Audio Types
  "audio/midi",
  "audio/mpeg",
  "audio/webm",
  "audio/ogg",
  "audio/wav",
  "audio/aac",
  "audio/3gpp",
  "audio/3gpp2",
  "audio/x-aiff",
  "audio/x-mpegurl",
  "audio/x-pn-realaudio",
  "audio/x-wav",
  "audio/x-ms-wax",
  "audio/x-ms-wma",
  "audio/x-flac",
  "audio/x-matroska",
  "audio/x-musepack",
  "audio/x-speex",
  // Text Types
  "text/plain",
  "text/html",
  "text/css",
  "text/csv",
  "text/tab-separated-values",
  "text/calendar",
  "text/richtext",
  "text/enriched",
  "text/sgml",
  "text/troff",
  "text/turtle",
  "text/uri-list",
  "text/directory",
  "text/parityfec",
  "text/prs.lines.tag",
  "text/vnd.graphviz",
  // Video Types
  "video/mpeg",
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/x-ms-asf",
  "video/x-matroska",
  "video/x-flv",
  "video/x-f4v",
  "video/x-fli",
  "video/x-flc",
  "video/x-ms-vob",
  "video/x-ms-vrml",
  "video/x-ms-wax",
  "video/x-ms-wmx",
  // Binary Types
  "application/octet-stream",
  "application/x-binary",
  "application/x-unknown",
  "application/x-msdownload",
  "application/x-elf",
  "application/x-mach-binary",
  "application/x-archive",
  "application/x-sharedlib",
  "application/x-java-archive",
  "application/x-rpm",
  "application/x-deb",
  "application/x-ipk",
  "application/x-apk",
  "application/x-msi",
  "application/x-appimage",
  "application/x-nupkg",
  "application/x-xar",
  "application/x-compress",
  "application/x-lz4",
  "application/x-lzip",
  "application/x-lzma",
  "application/x-lzop",
  // Font Types
  "application/x-font",
  "application/x-font-ttf",
  "application/x-font-otf",
  "application/x-font-woff",
  "application/x-font-woff2",
  "application/x-font-eot",
  "application/x-font-sfnt",
  "application/x-font-bdf",
  "application/x-font-pcf",
  "application/x-font-type1",
  "application/x-font-ghostscript",
  "application/x-font-linux-psf",
  "application/x-font-snf",
  "application/x-font-tex",
  "application/x-font-vfont",
  "application/x-font-otf",
  "application/x-font-ttf",
  "application/x-font-woff",
  // Model Types
  "model/iges",
  "model/mesh",
  "model/vrml",
  "model/x3d+binary",
  "model/x3d+vrml",
  "model/x3d+xml",
  "model/x3d+fastinfoset",
  "model/x3d+compressed",
  "model/stl",
  "model/step",
  "model/step-xml",
  "model/step+zip",
  "model/step+json",
  "model/step+zip",
  "model/step+zip",
]; // List of MIME Types

// Cookie Type for Global
export type CookieType = Array<{
  name: string;
  value: string;
  options: object;
}>; // Global Cookie Type
