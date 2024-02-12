/* eslint-disable @typescript-eslint/no-explicit-any */
// This file is used to clone Gitlab Repository

// types
type str = string; // String type
type bool = boolean; // Boolean Type

// Import Package for executeCommand
import { methods } from "../../Config/outer"; // import package from outer

export default async function GitlabCloner(
  UserName: str,
  RepositoryName: str,
  Directory: str,
  BranchName: str
): Promise<bool> {
  // Execute git clone command for Gitlab repository
  const GitlabStatus = await methods.Command.Execute(
    `git clone -b ${BranchName} https://gitlab.com/${UserName}/${RepositoryName}.git ./${Directory}`
  );

  // Check if Downloaded or not
  if (GitlabStatus.error && (GitlabStatus.error as any).code === 128) {
    return false; // Download Failed
  }
  return true; // Download finished
}
