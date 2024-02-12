/* eslint-disable @typescript-eslint/no-explicit-any */
// To Clone any GIT repositories from the repository
type str = string;
type bool = boolean;

// Import Package for executeCommand
import { methods } from "../outer"; // import package from outer
import checkFileExists from "./functions/CheckFolderExistence"; // import package from outer

// Import Cloner Functions
import GithubCloner from "./functions/Github.function"; // To Clone Github Repos
import GitlabCloner from "./functions/Gitlab.function"; // To Clone Gitlab Repos
import BitBucketCloner from "./functions/BitBucket.function"; // To Clone BitBucket Repos

// Main Class Definitions
export default class repositoryCloner {
  // Properties
  readonly #Provider; // Name of the provider to use for the repository
  readonly #UserName; // Username for the repository
  #Directory; // Directory to clone the repository (private)
  readonly #AutoDelete; // Delete the old repository after cloning (private)

  /**
   * Constructs a new RepositoryCloner instance.
   * @param {string} Provider - The name of the provider to use for the repository.
   * @param {string} [UserName] - The username for the repository.
   * @param {boolean} [AutoDelete=false] - Whether to delete the old repository after cloning (default is false).
   * @param {string} [DirectoryName] - The directory to clone the repository (optional).
   */
  constructor(
    Provider: str,
    UserName: str,
    AutoDelete = false,
    DirectoryName?: str
  ) {
    this.#Provider = Provider.toUpperCase();
    this.#UserName = UserName;
    this.#Directory = DirectoryName;
    this.#AutoDelete = AutoDelete;
  }

  // Methods
  /**
   * Clone a repository from a specified provider to a directory.
   * @param {string} [RepositoryName] - The name of the repository to clone.
   * @param {string} [Branch] - Branch name to clone (Default main)
   * @returns {Promise<bool | undefined>} - A Promise that resolves to true if the download finishes successfully, false if it fails, or undefined if an error occurs.
   */
  public async Clone(
    RepositoryName?: str,
    Branch = "main"
  ): Promise<bool | undefined> {
    // Check if Repository Name is provided
    if (!RepositoryName) {
      throw new Error("Repository Name is not provided");
    }

    // Check if Provider is provided
    if (!this.#Provider) {
      throw new Error("Provider is not provided");
    }

    // Check if Username is provided
    if (!this.#UserName) {
      throw new Error("Username is not provided");
    }

    // Set Directory Name to Repository Name if not provided
    if (!this.#Directory) {
      this.#Directory = RepositoryName;
    }

    // Check if directory exists and if auto-delete is enabled
    const FolderStatus = await checkFileExists(
      this.#Directory,
      this.#AutoDelete
    );

    // If auto-delete is enabled and directory already exists, throw an error
    if (
      this.#AutoDelete === true &&
      FolderStatus.message === "Directory Not Deleted"
    ) {
      throw new Error(
        "Directory already exists & cannot be deleted Automatically"
      );
    }

    // Clone the Repository from the specified provider to the directory
    if (this.#Provider.toUpperCase() === "GITHUB") {
      // Execute git clone command for GitHub repository & Return It
      return await GithubCloner(
        this.#UserName,
        RepositoryName,
        this.#Directory,
        Branch
      );
    }

    // Clone the Repository from BitBucket to directory
    if (this.#Provider.toUpperCase() === "BITBUCKET") {
      // Execute git clone command for BitBucket repository
      return await BitBucketCloner(
        this.#UserName,
        RepositoryName,
        this.#Directory,
        Branch
      );
    }

    // Clone the Repository from GitLab to directory
    if (this.#Provider.toUpperCase() === "GITLAB") {
      // Execute git clone command for GitLab repository & Return It
      return await GitlabCloner(
        this.#UserName,
        RepositoryName,
        this.#Directory,
        Branch
      ); // Clone Gitlab Repo
    }
  }

  /**
   * Clone a repository from the specified URL using git clone command.
   * @param {string} [RepositoryURL] - The URL of the repository to clone.
   * @param {string} [Branch] - Branch name to clone (Default main)
   * @returns {Promise<bool | undefined>} - A Promise that resolves to true if the download finishes successfully, false if it fails, or undefined if an error occurs.
   */
  static async Clone(
    RepositoryURL?: str,
    Branch = "main"
  ): Promise<bool | undefined> {
    // Execute the git clone command to clone the repository specified by RepositoryURL
    const GitStatus = await methods.Command.Execute(
      `git clone -b ${Branch} ${RepositoryURL}.git`
    );

    // Check if any error occurred during the cloning process
    if (GitStatus.error && (GitStatus.error as any).code === 128) {
      return false; // Return false indicating that the download failed
    }

    // If no error occurred during cloning, return true indicating that the download finished successfully
    return true;
  }
}
