// Main function
export default function DestroyJWT(token: string, cipherList: string[]) {
  const positions: number[] = [5, 3, 9, 4, 7]; // List of positions
  let tokenArray: string[] = token.split(""); // Split the token

  cipherList.forEach((cipher: string, index: number) => {
    tokenArray.splice(positions[index], 0, cipher); // Add the cipher to the token
  }); // Loop through the list of supported algorithms

  tokenArray = tokenArray.reverse(); // Reverse the token
  const modifiedToken: string = tokenArray.join(""); // Join the token
  return modifiedToken; // Return the modified token
}
