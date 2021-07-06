import { HObject } from "../interfaces/hobject";
import Type from "../type";

export class HInt extends HObject {

    constructor(value: number = 0) {
        super();
        this.set(value);
    }

    public set(value: any): void {
        if (!Type.isInt(value)) {
            throw new Error("Value is not an integer");
        }
        this.value = value;
    }

    public get(): number {
        return this.value;
    }

    public toNumber(): number {
        return this.value;
    }
}