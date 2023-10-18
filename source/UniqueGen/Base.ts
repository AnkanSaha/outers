import {randomMixed, randomNumber, randomSymbol, randomWord} from 'uniquegen'; // Import the module


export class UniqueGen {
    private _length?: number;

    constructor(length: number) {
        this._length = length;
    }

    // Methods
   /**
    * The function "RandomNumber" generates a random number with the option to include zero and the
    * ability to provide a custom set of numbers.
    * @param {boolean} [withzero=true] - The "withzero" parameter is a boolean value that determines
    * whether or not the generated random number can include zero. If set to true, zero can be included
    * in the range of possible random numbers. If set to false, zero will not be included in the range.
    * @param {number[]} [CustomNumbers] - The `CustomNumbers` parameter is an optional array of numbers
    * that you can pass to the `RandomNumber` function. If you provide this parameter, the function
    * will generate a random number from the `CustomNumbers` array. If you don't provide this
    * parameter, the function will generate a random number
    * @returns a random number.
    */
    public RandomNumber(withzero:boolean = true, CustomNumbers?: number[]) {
        return randomNumber(this._length, withzero, CustomNumbers);
    }

    // Random Word
/**
 * The RandomWord function generates a random word with an optional parameter to make it all capital
 * letters and an optional array of custom words to choose from.
 * @param {boolean} [isCAPITAL=false] - The `isCAPITAL` parameter is a boolean value that determines
 * whether the generated random word should be in all capital letters or not. If `isCAPITAL` is set to
 * `true`, the generated word will be in all capital letters. If `isCAPITAL` is set to `false
 * @param {string[]} [CustomWords] - The `CustomWords` parameter is an optional array of strings that
 * allows you to provide your own set of words from which the random word will be selected. If you
 * don't provide any custom words, the function will use a default set of words.
 * @returns a random word.
 */
    public RandomWord(isCAPITAL: boolean = false, CustomWords?: string[]) {
        return randomWord(this._length, isCAPITAL, CustomWords);
    }

    // Mixed
/**
 * The function "RandomMixed" generates a random mixed string with optional capitalization and custom
 * character options.
 * @param {boolean} [isCAPITAL=false] - The `isCAPITAL` parameter is a boolean value that determines
 * whether the generated random mixed string should include capital letters or not. If `isCAPITAL` is
 * set to `true`, capital letters will be included in the generated string. If it is set to `false` or
 * not provided,
 * @param {string[]} [CustomMixeds] - CustomMixeds is an optional parameter of type string array. It
 * allows you to provide a custom set of characters that will be used for generating the random mixed
 * string. If you don't provide any custom set, the function will use a default set of characters.
 * @returns The function `RandomMixed` returns the result of calling the `randomMixed` function with
 * the `_length` property, `isCAPITAL` argument, and `CustomMixeds` argument.
 */
    public RandomMixed(isCAPITAL: boolean = false, CustomMixeds?: string[]) {
        return randomMixed(this._length, isCAPITAL, CustomMixeds);
    }

    // Symbol
/**
 * The function "RandomSymbol" generates a random symbol based on a specified length and optional
 * custom symbols.
 * @param {string[]} [CustomSymbols] - CustomSymbols is an optional parameter of type string array. It
 * allows you to pass an array of custom symbols that you want to include in the random symbol
 * generation. If you don't provide any custom symbols, the function will generate a random symbol from
 * a default set of symbols.
 * @returns the result of calling the `randomSymbol` function with the `_length` parameter and the
 * `CustomSymbols` array as arguments.
 */
    public RandomSymbol(CustomSymbols?: string[]) {
        return randomSymbol(this._length, CustomSymbols);
    }
}