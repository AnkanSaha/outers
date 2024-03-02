/* eslint-disable @typescript-eslint/no-explicit-any */
// This file is used to clone BitBucket Repository

// types
type str = string; // String type
type bool = boolean; // Boolean Type

// Import Package for executeCommand
import { ClassBased } from "../../Config/outer"; // import package from outer
import { BitbucketURL } from "../../Config/Constant/Git Cloner.Constant"; // Import Bitbucket URL

export default async function BitBucketCloner(
  UserName: str,
  RepositoryName: str,
  Directory: str,
  BranchName: str,
): Promise<bool> {
  // Execute git clone command for BitBucket repository
  const BitBucketStatus = await ClassBased.Command.Execute(
    `git clone -b ${BranchName} ${BitbucketURL}${UserName}/${RepositoryName}.git ./${Directory}`,
  );

  // Check if Downloaded or not
  if (BitBucketStatus.error && (BitBucketStatus.error as any).code === 128) {
    return false; // Download Failed
  }
  return true; // Download finished
}
