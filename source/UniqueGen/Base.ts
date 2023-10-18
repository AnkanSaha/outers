import {randomMixed, randomNumber, randomSymbol, randomWord} from 'uniquegen'; // Import the module


export class UniqueGen {
    private _length: number;

    constructor(length: number) {
        this._length = length;
    }

    // Methods
    public RandomNumber() {
        const A = randomNumber(this._length).then((result) => {
            return result;
        });
        return A;
    }
}