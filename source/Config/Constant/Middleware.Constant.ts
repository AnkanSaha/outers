// Server Name & X-Powered-By Headers
export const ServerName = "Google LLC"; // Set Server Name to Google LLC
export const XPoweredBy = "Google"; // Set X-Powered-By Header to Google

// Constants for Allowed HTTP Methods in IP Injection Middleware
export const IPAllowedMethods = ["PUT", "POST", "PATCH", "DELETE"]; // Allowed Methods

// Constants for Allowed HTTP Methods in Request Controller Middleware
export const AllowedMethods = [...IPAllowedMethods, "OPTIONS"]; // Allowed Methods
