/* eslint-disable @typescript-eslint/no-explicit-any */
// Imports

// This interface is used to define the type of the ResponseObject object
export interface ResponseObject {
  ActiveServer: any; // This interface is used to define the type of the ResponseObject object
  ActiveWorker: number; // This interface is used to define the type of the ResponseObject object
  TotalBeforeFunctions: number; // This interface is used to define the type of the ResponseObject object
  TotalAfterFunctions: number; // This interface is used to define the type of the ResponseObject object
  [key: string]: any | number | undefined | object; // This interface is used to define the type of the ResponseObject object
  ActiveMiddlewares: any[]; // Active Middlewares
}
