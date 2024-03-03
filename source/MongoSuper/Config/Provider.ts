import MongoDB_Connection from "../Js/Connection/ConnectMongo"; // import MongoDB Connection Function

// CRUD Functions
import { Create } from "../Js/Service/Create"; // Import Create Function
import { Find } from "../Js/Service/Read"; // Import Read Function
import { Update } from "../Js/Service/Update"; // Import Update Function
import { Delete } from "../Js/Service/Delete"; // Import Delete Function

// Schema & Models creator
import { CreateSchema } from "../Ts/Schema/CreateSchema"; // Import CreateSchema Function
import { CreateModel } from "../Ts/Model/CreateModel"; // Import CreateModel Function

/* Export All Service Functions */
export const ConnectDB = MongoDB_Connection;

// CRUD Operations
export const CreateData = Create;
export const ReadData = Find;
export const UpdateData = Update;
export const DeleteData = Delete;

// Export With Default Export
export default Object.freeze({
    CreateModel,
    CreateSchema
});
