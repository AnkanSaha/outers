/* This File is used to update Data in Database. */

import findValidator from "../Validator/FindValidator"; // Importing Find Validator

/**
 * This is an async function in JavaScript that updates data in a MongoDB database based on a filter
 * and returns a status message, count of updated data, and the updated data.
 * @param Filter - The filter parameter is an object that specifies the criteria for selecting the
 * documents to update. It can contain one or more key-value pairs, where each key represents a field
 * in the document and the corresponding value represents the value to match against.
 * @param data - "data" is an object that contains the updated values for the document(s) that match
 * the filter criteria. The keys of the object represent the fields to be updated, and the values
 * represent the new values for those fields.
 * @param model - The model parameter refers to the Mongoose model that represents the collection in
 * the MongoDB database that needs to be updated.
 * @param MultiUpdate - MultiUpdate is a boolean parameter that determines whether to update multiple
 * documents that match the filter criteria or just update a single document. If MultiUpdate is set to
 * true, the function will use the updateMany method to update all documents that match the filter
 * criteria. If MultiUpdate is set to false, the
 * @returns an object with the following properties:
 * - status: a boolean value indicating whether the update was successful or not
 * - message: a string message describing the result of the update operation
 * - UpdatedCount: a number indicating the count of documents that were updated
 * - UpdatedData: the updated data as an array of objects, or null if the update was not successful.
 */
export async function Update(Filter, data, model, MultiUpdate) {
    try {
        const Verification = await findValidator(Filter); // Verifying the Filter
        if (Verification === true) {
            // If Verification is true then it will proceed
            if (MultiUpdate === false) {
                // If MultiUpdate is False then it will update only one data
                const result = await model.updateOne(Filter[0], data);
                if (!result) {
                    // If result is null then it will return false
                    return {
                        status: false,
                        message: "Failed to Update Data",
                        UpdatedCount: 0,
                        UpdatedData: null
                    };
                } else if (result) {
                    // If result is not null then it will return true
                    if (result.modifiedCount === 0) {
                        return {
                            status: false,
                            message:
                                "Failed to Update Data, May be Data is not available",
                            UpdatedCount: result.modifiedCount,
                            UpdatedData: undefined
                        };
                    } else {
                        const UpdatedData = await model.find(Filter[0]); // Finding the Updated Data
                        return {
                            status: true, // Returning the Status
                            message: "Data Updated Successfully", // Returning the Message
                            UpdatedCount: 1, // Returning the Updated Count
                            UpdatedData: UpdatedData[0] // Returning the Updated Data
                        };
                    }
                }
            } else if (MultiUpdate === true) {
                const result = await model.updateMany({ $and: Filter }, data);
                if (!result) {
                    return {
                        status: false,
                        message: "Failed to Update Data",
                        UpdatedCount: 0,
                        UpdatedData: null
                    };
                } else if (result) {
                    if (result.modifiedCount === 0) {
                        return {
                            status: false,
                            message:
                                "Failed to Update Data, May be Data is not available",
                            UpdatedCount: result.modifiedCount,
                            UpdatedData: undefined
                        };
                    } else {
                        const UpdatedData = await model.find({ $and: Filter });
                        return {
                            status: true,
                            message: "Data Updated Successfully",
                            UpdatedCount: UpdatedData.length,
                            UpdatedData
                        };
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: "Failed to Update Data",
            UpdatedCount: 0,
            UpdatedData: null
        };
    }
} // Main Update Function
