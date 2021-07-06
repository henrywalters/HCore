import { HObject } from "../interfaces/hobject";

// The list class provides a wrapper over JS lists with added functionalities
export class List<T extends HObject> implements Iterator<T> {

    public data: T[];
    
    constructor(data: T[] = []) {
        this.data = data;
    }

    next(value?: T): IteratorResult<T> {
        return {
            done: value.id === this.data.length - 1,
            value: this.data[value.id + 1],
        };
    }

    return?(value?: any): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }
    throw?(e?: any): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }

    public static isList(obj: any): obj is List<any> {
        return obj.constructor.name === List.name && 'data' in obj;
    }

    public iterate(it: (value: T) => void) {
        for (const value of this.data) {
            it(value);
        }
    }

    public sum(): number {
        let total = 0;
        this.iterate((value) => {total += value.toNumber()});
        return total;
    }

    public sort(): void {
        this.data.sort((a, b) => a.compare(b));
    }

    public push(value: T | T[] | List<T>): void {
        if (Array.isArray(value) || List.isList(value)) {
            for (const el of value) {
                el.id = this.data.length;
                this.data.push(el);
            }
        } else {
            value.id = this.data.length;
            this.data.push(value);
        }
    }

    [Symbol.iterator]() {
        return this.data.values();
    }

    // Removes first instance of value
    public remove(value: T): void {
        for (let i = 0; i < this.data.length; i++) {
            if (value.equals(this.data[i])) {
                this.data.splice(i, 1);
                break;
            }
        }
    }

    public removeAll(value: T): void {
        let newData = [];
        for (let i = 0; i < this.data.length; i++) {
            if (!value.equals(this.data[i])) {
                newData.push(this.data[i]);
            }
        }
        this.data = newData;
    }
}