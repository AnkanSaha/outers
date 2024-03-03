/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect, connection } from "mongoose"; // import the mongoose module
import Methods, {
    ConnectDB,
    CreateData,
    ReadData,
    UpdateData,
    DeleteData
} from "../Config/Provider"; // Import All Function from Provider
// global types
type str = string;
type bool = boolean;
type globe = any;
type int = number;

//  class to run on start/* The above class is a TypeScript implementation of a MongoDB connection
// handler that can connect to a local or cloud server and listen for
// connection events. */
export default class Mongo {
    /* These are private properties of the `Mongo` class in TypeScript. */
    #MongoURL: str; // string value to store the URL of the MongoDB database to connect to
    #Database_Name: str; // string value to check if the connection is to cloud or local
    #ConnectionState: str; // string value to check if the connection is to cloud or local
    #NeverDisconnect: bool; // boolean value to check if the connection is to cloud or local
    #Schema?: globe; // mongoose schema type
    #models: globe; // mongoose model type
    #CollectionName?: str; // string value to store the name of the collection
    #connection: typeof connection; // mongoose connection type
    #InstantConnect: (MongoURL: str) => Promise<void>; // function to connect to the database
    #isTimeStamps: bool = false; // boolean value to check if the connection is to cloud or local

    /**
     * This is a constructor function that initializes properties for a MongoDB connection, including
     * the URL and logging options.
     * @param {str} [MongoURL=mongodb://localhost:27017/test] - A string representing the URL of the
     * MongoDB database to connect to. The default value is 'mongodb://localhost:27017/test', which
     * connects to a local MongoDB instance on the default port and uses a database named 'test'.
     * @param {bool} [Log=true] - The "Log" parameter is a boolean value that determines whether or not
     * to enable logging. If set to true, the code will log information about the database connection.
     * If set to false, no logging will occur.
     */
    constructor(Details: {
        MongoURL: str; // default value is 'mongodb://localhost:27017/
        Database_Name?: str; // default value is 'test'
        NeverDisconnect: bool; // default value is false
        Schema?: globe; // default value is {}
        CollectionName?: str; // default value is 'test'
        isTimeStamps?: bool; // default value is false
    }) {
        this.#Database_Name =
            Details === undefined || Details.Database_Name === undefined
                ? "test"
                : Details.Database_Name; // assign the Database_Name property
        this.#MongoURL =
            Details === undefined || Details.MongoURL === undefined
                ? `mongodb://localhost:27017/${this.#Database_Name}`
                : `${Details.MongoURL}${this.#Database_Name}`; // assign the MongoURL property
        this.#NeverDisconnect =
            Details === undefined || Details.NeverDisconnect === undefined
                ? false
                : Details.NeverDisconnect; // assign the NeverDisconnect property
        this.#Schema =
            Details === undefined || Details.Schema === undefined
                ? {}
                : Details.Schema; // assign the Schema property
        this.#isTimeStamps =
            Details === undefined || Details.isTimeStamps === undefined
                ? false
                : Details.isTimeStamps; // assign the isTimeStamps property
        this.#CollectionName =
            Details === undefined || Details.CollectionName === undefined
                ? "test"
                : Details.CollectionName; // assign the Collection property
        this.#ConnectionState = "Local"; // assign the ConnectionState property
        this.#connection = connection; // assign the connection property
        this.#InstantConnect = ConnectDB; // assign the Connect property
        this.#models = Methods.CreateModel(
            Methods.CreateSchema(this.#Schema, this.#isTimeStamps),
            this.#CollectionName
        ); // assign the models property
    } // end of constructor

    /* The above code is a TypeScript method called `LogGen` which is marked as `private` and `async`. It
returns a `Promise` of type `globe`. */
    private async LogGen(): Promise<globe> {
        if (this.#MongoURL.includes("mongodb+srv")) {
            this.#ConnectionState = "Cloud";
        } else {
            this.#ConnectionState = "Local";
        } // check if the connection is to cloud or local
    }

    /* The above code is defining a method called `listen` which listens for events related to the MongoDB
connection. It listens for the `connected`, `error`, and `disconnected` events. */
    private listen() {
        this.#connection.on("connected", async (): Promise<void> => {
            console.log(
                `MongoDB connected successfully with ${this.#ConnectionState} Server`
            );
        }); // listen for connected event

        this.#connection.on("error", async (): Promise<void> => {
            console.log(" Error: MongoDB connection failed");
            await connect(this.#MongoURL); // connect to the database
            console.log(
                `MongoDB reconnected successfully with ${this.#ConnectionState} Server`
            );
        });
        this.#connection.on("disconnected", async (): Promise<void> => {
            // check if the connection is to cloud or local
            console.log(
                `MongoDB disconnected with ${this.#ConnectionState} Server and trying to reconnect`
            );
            await connect(this.#MongoURL); // connect to the database
            console.log(
                `MongoDB reconnected successfully with ${this.#ConnectionState} Server`
            );
        });
    } // end of listen method

    public async Connect(): Promise<globe> {
        try {
            await this.#InstantConnect(this.#MongoURL); // connect to the database
            await this.LogGen(); // Checking if The Connection String is Local or Server in private function

            if (this.#NeverDisconnect === true) {
                this.listen(); // listen for events related to the database connection
            } // check if this is a never disconnect connection

            return {
                status: true,
                message: `MongoDB connected successfully with ${this.#ConnectionState} Server`
            };
        } catch {
            return {
                status: false,
                message: "Error: MongoDB connection failed"
            };
        }
    } // end of SingleConnect method


    public async disconnect(): Promise<globe> {
        try {
            if (this.#NeverDisconnect === false) {
                console.log(
                    "This is not a never disconnect connection, to disconnect use set NeverDisconnect to false"
                );
                return {
                    status: false,
                    message:
                        "This is not a never disconnect connection, to disconnect use set NeverDisconnect to false"
                };
            } // check if this is a never disconnect connection
            else {
                this.#connection.close(); // disconnect from the database
                return {
                    status: true,
                    message: "MongoDB disconnected successfully"
                };
            }
        } catch {
            return {
                status: false,
                message: "Error: MongoDB disconnection failed"
            };
        }
    } // end of disconnect method

    // method to find a document in the database
    public async find(
        type: str = "AND",
        Filter: globe[] = [],
        limit: int = 0,
        skip: int = 0
    ): Promise<globe> {
        try {
            return {
                skipped: skip,
                limit,
                count: Array.from(
                    await ReadData(type, Filter, this.#models, limit, skip)
                ).length, // find the document in the database
                Data: await ReadData(type, Filter, this.#models, limit, skip) // find the document in the database
            };
        } catch {
            console.log("Error while finding the document");
            return [];
        }
    } // end of find method

    // method to findAndCount a document in the database
    public async findAndCount(
        type: str = "AND",
        Filter: globe[] = [],
        limit: int = 0,
        skip: int = 0
    ): Promise<globe> {
        try {
            return {
                skipped: skip,
                limit,
                count: Array.from(
                    await ReadData(type, Filter, this.#models, limit, skip)
                ).length, // find the document in the database
                Data: await ReadData(type, Filter, this.#models, limit, skip) // find the document in the database
            };
        } catch {
            console.log("Error while finding the document");
            return {
                count: 0,
                Data: []
            };
        }
    } // FindAndCount Function End

    // method to create a document in the database

    public async create(Data: globe): Promise<globe> {
        try {
            return await CreateData(Data, this.#models); // create the document in the database
        } catch {
            console.log("Error while creating the document");
            return {
                NewCount: 0,
                NewData: []
            };
        }
    } // end of create method

    // method to update a document in the database
    public async update(
        Filter: globe[] = [],
        Data: globe,
        MultiUpdate: bool = false
    ): Promise<globe> {
        try {
            return await UpdateData(Filter, Data, this.#models, MultiUpdate);
        } catch {
            console.log("Error while updating the document");
            return {
                status: false,
                message: "Failed to Update Data",
                UpdatedCount: 0,
                UpdatedData: []
            };
        }
    } // end of Update function

    public async delete(
        Filter: globe[] = [],
        MultiDelete: bool = false
    ): Promise<globe> {
        try {
            return await DeleteData(Filter, this.#models, MultiDelete);
        } catch {
            console.log("Error while deleting the document");
            return {
                status: false,
                message: "Failed to Delete Data",
                DeletedCount: 0,
                DeletedData: []
            };
        }
    } // end of delete method
} // end of alwaysRun class
