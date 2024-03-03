/* This File is used to delete the data from the database. */
import findValidator from "../Validator/FindValidator"; // import the find validator

export async function Delete(Filter, Models, Multiple = false) {
    try {
        const Validator = await findValidator(Filter); // find the validator
        if (Validator === true) {
            if (Multiple === false) {
                const DeleteData = await Models.deleteOne(Filter[0]); // delete the data
                if (DeleteData.deletedCount === 1) {
                    return {
                        status: true,
                        message: "Data Deleted Successfully",
                        DeletedCount: DeleteData.deletedCount,
                        NewData: await Models.find({ $and: Filter }) // find the data
                    };
                } else {
                    return {
                        status: false,
                        message:
                            "Data not Deleted, Data not found, please check the filter",
                        DeletedCount: DeleteData.deletedCount,
                        DeletedData: undefined
                    };
                }
            } else if (Multiple === true) {
                const DeleteData = await Models.deleteMany({ $and: Filter }); // delete the data
                if (DeleteData.deletedCount > 0) {
                    return {
                        status: true,
                        message: "Data Deleted Successfully",
                        DeletedCount: DeleteData.deletedCount,
                        NewData: await Models.find({ $and: Filter }) // find the data
                    };
                } else {
                    return {
                        status: false,
                        message:
                            "Data not Deleted, Data not found, please check the filter",
                        DeletedCount: DeleteData.deletedCount,
                        DeletedData: undefined
                    };
                }
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "Something went wrong",
            DeletedCount: 0,
            DeletedData: []
        };
    }
} // delete data from the database
