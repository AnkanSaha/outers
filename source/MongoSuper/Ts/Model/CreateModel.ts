import { model } from "mongoose"; // Import mongoose types

// Global types
type globe = any;
type str = string;

/**
 * This is an asynchronous function that returns a model based on a given data schema and collection
 * name, or undefined if no collection name is provided.
 * @param {globe} DataSchema - The DataSchema parameter is a variable of type "globe", which is not a
 * standard data type in JavaScript. It is likely a custom data type defined elsewhere in the code.
 * Without more information, it is difficult to determine what this variable represents.
 * @param {str} [CollectionName] - CollectionName is an optional parameter of type string. It
 * represents the name of the collection in the database where the data will be stored. If it is not
 * provided, the function will return undefined.
 * @returns If `CollectionName` is `undefined`, then `undefined` is being returned. Otherwise, a model
 * is being returned based on the `DataSchema` and `CollectionName`.
 */
export function CreateModel(
    DataSchema: globe,
    CollectionName?: str
): undefined | globe {
    switch (CollectionName) {
        case undefined:
            return undefined;
        default:
            try {
                return model(CollectionName, DataSchema);
            } catch (err) {
                console.log(err);
                return undefined;
            }
    }
} // end of function
