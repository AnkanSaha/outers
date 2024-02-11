import { access, constants, rm } from "node:fs/promises"; // import package from outer

// types
type str = string;
type responseType = {
  status: number;
  OldFolderDeleted: boolean;
  message: string;
};

// Main Function to check if directory exists or not
export default async function checkFileExists(
  FolderPATH: str,
  AutoDelete = false,
): Promise<responseType> {
  try {
    await access(FolderPATH, constants.F_OK);
    if (AutoDelete === true) {
      await rm(FolderPATH, { recursive: true }); // recursive delete folder
      return {
        status: 200,
        OldFolderDeleted: true,
        message: "Directory Deleted",
      };
    }
    return {
      status: 200,
      OldFolderDeleted: false,
      message: "Directory Not Deleted",
    };
  } catch (error) {
    return {
      status: 404,
      OldFolderDeleted: false,
      message: "Directory Not Found",
    };
  }
}
