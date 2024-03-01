import { todayDate } from "../../Config/Constant/JWT.Constant"; // Importing todayDate from JWT.Constant

// Main function
export default function verifyCipher(token: string, cipherList: string[]) {
  try {
    // Checking if the token is destroyed by manually checking the token

    let cipherResult = false; // Cipher result
    cipherList.forEach((cipher: string) => {
      if (token.includes(cipher)) {
        cipherResult = true;
      } else {
        cipherResult = false;
      }
    }); // Check if the token contains the cipher

    if (!cipherResult) {
      return {
        status: "Not Destroyed",
        message: "Token is not Destroyed Manually",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
    }

    return {
      status: "Already Destroyed",
      message: "Token is Destroyed Manually with the destroy() method",
      currentTimeStamp: todayDate,
      algoRithm: "HS256 (Default)",
    }; // Create an error object
  } catch {
    return {
      status: "error",
      message: "Error verifying token",
      currentTimeStamp: todayDate,
      algoRithm: "HS256 (Default)",
    }; // Create an error object
  }
}
