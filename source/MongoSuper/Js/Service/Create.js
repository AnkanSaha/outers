/* This File is used to Create Data in Database. */

/**
 * This is an asynchronous function that creates a new document in a database using the provided data
 * and model, and returns a success or failure message along with the new data.
 * @param data - The data parameter is an object that contains the information to be saved to the
 * database. It is used to create a new document in the database.
 * @param model - The "model" parameter is likely a Mongoose model that represents a specific
 * collection in a MongoDB database. It is used to create a new document in the collection based on the
 * "data" parameter passed to the function.
 * @returns an object with properties `status`, `message`, `NewCount`, and `NewData`. The values of
 * these properties depend on the outcome of the function. If the document creation is successful,
 * `status` is `true`, `message` is `"Successfully Created Data"`, `NewCount` is the length of the
 * array containing the newly created document (which is 1),
 */
export async function Create(data, model) {
    try {
        const result = await model.create(data); // Create the document and save it to the database.
        return {
            status: true,
            message: "Successfully Created Data",
            NewCount: 1,
            NewData: [result]
        };
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return {
            status: false,
            message: "Failed to Create Data",
            NewCount: 0,
            NewData: []
        };
    }
}
