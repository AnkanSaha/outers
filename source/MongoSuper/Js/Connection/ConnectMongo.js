import { connect } from "mongoose"; // import the mongoose module

/**
 * This is an asynchronous function that connects to a MongoDB database using a provided URL.
 * @param MongoURL - The MongoDB connection string that specifies the location of the MongoDB server
 * and the name of the database to connect to. It typically looks like this:
 * mongodb://<username>:<password>@<host>:<port>/<database>.
 */
export default async function connectDB(MongoURL) {
    try {
        await connect(MongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); // connect to the database
    } catch (err) {
        console.log(err);
    } // catch any errors
} // create a function to connect to the database
