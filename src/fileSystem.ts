const { resolve } = require('path');
const { readdir } = require('fs').promises;

export class FileSystem {
    public static async ListFiles(dirname: string = __dirname, recursive = true): Promise<string[]> {
        const directories = await readdir(dirname, { withFileTypes: true });
        const files = await Promise.all(directories.map((directory) => {
            const res = resolve(dirname, directory.name);
            return directory.isDirectory() && recursive ? FileSystem.ListFiles(res) : res;
        }))
        return Array.prototype.concat(...files);
    }
}