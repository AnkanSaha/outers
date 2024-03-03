import { Schema } from "mongoose"; // Import mongoose types

type globe = any;
type bool = boolean;

/**
 * This function creates a new schema object based on the provided data, and returns it or undefined if
 * there was an error.
 * @param {globe} Data - The parameter `Data` is of type `globe`, which is not a standard JavaScript
 * type. It is likely a custom type defined elsewhere in the codebase. Without knowing the definition
 * of `globe`, it is difficult to determine what kind of data this parameter expects.
 * @returns The function `CreateSchema` is returning either an instance of the `Schema` class created
 * with the `Data` parameter, or `undefined` if an error occurs during the creation of the schema.
 */
export function CreateSchema(
    Data: globe,
    isTimeStamps: bool
): undefined | globe {
    try {
        switch (Data) {
            case undefined:
                console.log("Schema is undefined");
                return;
            default:
                return new Schema(Data, { timestamps: isTimeStamps });
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }
} // end of function
