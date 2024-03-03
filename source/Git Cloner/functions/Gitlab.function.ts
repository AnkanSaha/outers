/* eslint-disable @typescript-eslint/no-explicit-any */
// This file is used to clone Gitlab Repository

// types
type str = string; // String type
type bool = boolean; // Boolean Type

// Import Package for executeCommand
import Execute from "../../command/exec.command"; // import executeCommand from outer
import { GitlabURL } from "../../Config/Constant/Git Cloner.Constant"; // Import Gitlab URL

export default async function GitlabCloner(
  UserName: str,
  RepositoryName: str,
  Directory: str,
  BranchName: str,
): Promise<bool> {
  // Execute git clone command for Gitlab repository
  const GitlabStatus = await Execute(
    `git clone -b ${BranchName} ${GitlabURL}${UserName}/${RepositoryName}.git ./${Directory}`,
  );

  // Check if Downloaded or not
  if (GitlabStatus.error && (GitlabStatus.error as any).code === 128) {
    return false; // Download Failed
  }
  return true; // Download finished
}
