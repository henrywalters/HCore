
// HObject is a no requirement object to extend from. This is a requirement for some data structures and should be the preferred return type.
export abstract class HObject {

    public id: any;

    public value: any;

    private notDefined(method: string) {
        throw new Error(`${method} not defined for ${this.type()}`);
    }

    public type(): string {
        return this.constructor.name;
    }

    public toString(): string {
        return this.type();
    }

    public toNumber(): number {
        this.notDefined('toNumber');
        return 0;
    }

    public equals(b: HObject): boolean {
        this.notDefined("equals");
        return false;
    }

    public compare(b: HObject): number {
        this.notDefined("compare");
        return 0;
    }
}