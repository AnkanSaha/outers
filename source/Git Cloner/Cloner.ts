/* eslint-disable @typescript-eslint/no-explicit-any */
// To Clone any GIT repositories from the repository
type str = string;
type bool = boolean;

// Import Package for executeCommand
import { methods } from '../outer'; // import package from outer

// Main Class Definitions
export default class repositoryCloner {
    // Properties
    readonly #Provider // Name of the provider to use for the repository
    readonly #UserName // Username for the repository
    readonly #Directory // Directory to clone the repository

    constructor(Provider: str, UserName?: str, DirectoryName?: str) {
        this.#Provider = Provider.toUpperCase(); // Name of the provider to use for the repository
        this.#UserName = UserName; // Username for the repository
        this.#Directory = DirectoryName ?? 'GitService'; // Directory to clone the repository
    }

    // Methods
    public async Clone(RepositoryName?: str): Promise<bool | undefined> {
        // Check if User Provided Repository Name or not
        if(RepositoryName === undefined || RepositoryName === null || RepositoryName === '') {
            throw new Error("Repository Name is not provided");
        }

        // Check if User Provided Provider or not
        if(this.#Provider === undefined || this.#Provider === null || this.#Provider === ''){
            throw new Error("Provider is not provided");
        }

        // Check if User Provided Username or not
        if(this.#UserName === undefined || this.#UserName === null || this.#UserName === '') {
            throw new Error("Username is not provided");
        }

        // Clone the Repository from GitHub to directory
        if(this.#Provider === 'GitHub' || this.#Provider === 'GITHUB') {
            const GitHubStatus = await methods.Command.Execute(`git clone https://github.com/${this.#UserName}/${RepositoryName}.git ./${this.#Directory}`);
            
            // Check if Downloaded or not
            if (GitHubStatus.error && (GitHubStatus.error as any).code === 128) {
                return false; // Download Failed
            }
            return true; // Download finished
        }

        // Clone the Repository from BitBucket to directory
        if(this.#Provider === 'BitBucket' || this.#Provider === 'BITBUCKET') {
            const BitBucketStatus = await methods.Command.Execute(`git clone https://bitbucket.org/${this.#UserName}/${RepositoryName}.git ./${this.#Directory}`);
            
            // Check if Downloaded or not
            if (BitBucketStatus.error && (BitBucketStatus.error as any).code === 128) {
                return false; // Download Failed
            }
            return true; // Download finished
        }

        // Clone the Repository from GitLab to directory
        if(this.#Provider === 'GitLab' || this.#Provider === 'GITLAB') {
           const GitlabStatus = await methods.Command.Execute(`git clone https://gitlab.com/${this.#UserName}/${RepositoryName}.git ./${this.#Directory}`);
            
           // Check if Downloaded or not
            if (GitlabStatus.error && (GitlabStatus.error as any).code === 128) {
                return false; // Download Failed
            }
            return true; // Download finished
        }
    }
}