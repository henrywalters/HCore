const { resolve, relative } = require('path');
const { readdir } = require('fs').promises;
import * as fs from 'fs';
import { HObject } from './interfaces/hobject';
import { List } from './structures/list';

export interface PathParts {
    name: string;
    path: string;
    extension: string;
}

export class FileDescription extends HObject implements PathParts {
    name: string;
    path: string;
    relativePath: string;
    extension: string;
    size: number;

    constructor(path: PathParts, dir: string, size: number) {
        super();
        this.size = size;
        this.name = path.name;
        this.path = path.path;
        this.relativePath = relative(dir, path.path);
        this.extension = path.extension;
    }

    public toNumber(): number {
        return this.size;
    }

    public equals(b: FileDescription) {
        return this.path === b.path;
    }

    public compare(b: FileDescription): number {
        return this.size - b.size;
    }
}

export class FileSystem {

    public static ParsePath(path: string): PathParts {
        const parts = path.split('/');
        const lastPart = parts[parts.length - 1];
        const lastParts = lastPart.split('.');

        return {
            name: lastParts[0],
            extension: lastParts[lastParts.length - 1],
            path,
        }
    }

    private static async ListSubFiles(dirname: string, recursive: boolean, root: string): Promise<List<FileDescription>> {
        const files = new List<FileDescription>();
        const directories = await readdir(dirname, { withFileTypes: true });
        for (const directory of directories) {
            const res = resolve(dirname, directory.name);
            if (directory.isDirectory() && recursive) {
                const dirFiles = await FileSystem.ListSubFiles(res, recursive, root);
                files.push(dirFiles);
            }

            if (!directory.isDirectory()) {
                files.push(new FileDescription(FileSystem.ParsePath(res), resolve(root), fs.statSync(res).size));
            }
        }

        return files;
    }

    public static async ListFiles(dirname: string = __dirname, recursive = true): Promise<List<FileDescription>> {
        return this.ListSubFiles(dirname, recursive, dirname);
    }
}