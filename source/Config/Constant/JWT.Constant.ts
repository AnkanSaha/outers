// Global Types
type str = string; // String Type
type int = number; // Integer Type

// import Uniquegen
import {randomNumber, randomMixed, randomBoolean} from "uniquegen"; // Import Uniquegen

// Current Time
export const todayDate: str = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

// cipherList List for destroying the token
export const cipherList: str[] = (()=> {
    let NumberCiphers: int = randomNumber(2, false); // Create the number of ciphers
    const cipherList: str[] = []; // Create the cipherList
    
    // Inserting the ciphers into the cipherList
    do {
        cipherList.push(randomMixed(randomNumber(2, false), randomBoolean())); // Inserting the ciphers into the cipherList
        NumberCiphers--; // Decrease the number of ciphers
    } while (NumberCiphers != 0);

    return cipherList; // Return the cipherList
})(); // Create the cipher list