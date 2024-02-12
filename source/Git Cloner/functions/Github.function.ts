/* eslint-disable @typescript-eslint/no-explicit-any */
// This file is used to clone Github Repository

// types
type str = string; // String type
type bool = boolean; // Boolean Type

// Import Package for executeCommand
import { methods } from "../../Config/outer"; // import package from outer

export default async function GithubCloner(
  UserName: str,
  RepositoryName: str,
  Directory: str,
  BranchName: str
): Promise<bool> {
  // Execute git clone command for GitHub repository
  const GitHubStatus = await methods.Command.Execute(
    `git clone -b ${BranchName} https://github.com/${UserName}/${RepositoryName}.git ./${Directory}`
  );

  // Check if Downloaded or not
  if (GitHubStatus.error && (GitHubStatus.error as any).code === 128) {
    return false; // Download Failed
  }
  return true; // Download finished
}
