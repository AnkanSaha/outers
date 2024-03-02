// Check if IP address is IPv4 or IPv6 address

/**
 * Checks whether the provided IP address is IPv4 or IPv6.
 *
 * @param {string} IP The IP address to check.
 * @returns {string} Returns 'IPv4' if the address is IPv4, 'IPv6' if IPv6, or an Error message if invalid.
 */
export default function IPChecker(IP: string): string | unknown {
  try {
    // Regular expressions for IPv4 and IPv6 addresses
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regular expression for IPv4 addresses
    const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/; // Regular expression for IPv6 addresses

    // Check if the IP address matches IPv4 or IPv6 regex
    if (ipv4Regex.test(IP)) {
      return "IPv4";
    } else if (ipv6Regex.test(IP)) {
      return "IPv6";
    } else {
      return new Error("Invalid IP address");
    }
  } catch (error) {
    // If any error occurs, reject the Promise with the error
    return error;
  }
}
