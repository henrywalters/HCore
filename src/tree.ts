import {Random} from "./random";
import {SAFE_ID_SIZE} from "./constants";

export class Tree<T> {

    public readonly id: string;
    public value: T;
    public readonly children: {[id: string]: Tree<T>} = {};

    constructor(value: T) {
        this.id = Random.alphanumeric(SAFE_ID_SIZE);
        this.value = value;
    }

    public insert(value: T): Tree<T> {
        const node = new Tree<T>(value);
        this.children[node.id] = node;
        return node;
    }

    public remove(node: Tree<T>) {
        if (node.id in this.children) {
            delete this.children[node.id];
        }
    }

    public breadthFirst(): T[] {
        const result = [];

        let queue = [];

        queue.push(this);

        while (queue.length > 0) {
            const top = queue.shift();
            result.push(top.value);
            for (const id in top.children) {
                queue.push(top.children[id]);
            }
        }

        return result;
    }
}