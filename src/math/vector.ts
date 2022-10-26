export class Vector {
    public _data: number[];
    public size: number;

    constructor(...data: number[]) {
        this.data = data;
        this.size = data.length;
    }

    public static Zero(size: number) {
        return Vector.Fill(size, 0);
    }

    public static Fill(size: number, val: number) {
        let data = [];
        for (let i = 0; i < size; i++) {
            data.push(val);
        }
        return new Vector(...data);
    }

    public copy(): Vector {
        return new Vector(...this.data);
    }

    public set data(data: number[]) {
        this._data = data;
    }

    public toString() {
        return '<' + this.data.join(', ') + '>';
    }

    public get data(): number[] {
        return this._data;
    }

    public get x(): number {
        if (this.size < 1) {
            throw new Error("X only exists on vectors size > 1");
        }
        return this.data[0];
    }

    public set x(value: number) {
        if (this.size < 1) {
            throw new Error("X only exists on vectors size > 1");
        }
        this.data[0] = value;
    }

    public get y(): number {
        if (this.size < 2) {
            throw new Error("Y only exists on vectors size > 1");
        }
        return this.data[1];
    }

    public set y(value: number) {
        if (this.size < 1) {
            throw new Error("X only exists on vectors size > 1");
        }
        this.data[1] = value;
    }

    public get z(): number {
        if (this.size < 2) {
            throw new Error("Z only exists on vectors size > 1");
        }
        return this.data[2];
    }

    public set z(value: number) {
        if (this.size < 2) {
            throw new Error("X only exists on vectors size > 1");
        }
        this.data[2] = value;
    }

    // map creates a new vector with the mapFn
    public map(mapFn: (el: number) => number) {
        const vector = Vector.Zero(this.size);
        for (let i = 0; i < this.size; i++) {
            vector.data[i] = mapFn(this.data[i]);
        }
        return vector;
    }

    // forEach mutates the vector with the eachFn
    public forEach(eachFn: (el: number) => number) {
        for (let i = 0; i < this.size; i++) {
            this.data[i] = eachFn(this.data[i]);
        }
        return this;
    }

    public add(vec: Vector) {
        for (let i = 0; i < Vector.MinSize(this, vec); i++) {
            this.data[i] += vec.data[i];
        }
        return this;
    }

    public sub(vec: Vector) {
        for (let i = 0; i < Vector.MinSize(this, vec); i++) {
            this.data[i] -= vec.data[i];
        }
        return this;
    }

    public scalar(scalar: number) {
        for (let i = 0; i < this.size; i++) {
            this.data[i] *= scalar;
        }
        return this;
    }

    public prod(vec: Vector) {
        for (let i = 0; i < Vector.MinSize(this, vec); i++) {
            this.data[i] *= vec.data[i];
        }
        return this;
    }

    public div(vec: Vector) {
        for (let i = 0; i < Vector.MinSize(this, vec); i++) {
            this.data[i] /= vec.data[i];
        }
        return this;
    }

    public invert() {
        for (let i = 0; i < this.size; i++) {
            this.data[i] = 1 / this.data[i];
        }
        return this;
    }

    public inverted() {
        const vec = Vector.Zero(this.size);
        for (let i = 0; i < this.size; i++) {
            vec.data[i] = 1 / this.data[i];
        }
        return vec;
    }

    public pow(power: number) {
        for (let i = 0; i < this.size; i++) {
            this.data[i] = Math.pow(this.data[i], power);
        }
        return this;
    }

    public static MinSize(...vecs: Vector[]) {
        let min = 0;
        for (let i = 0; i < vecs.length; i++) {
            if (i == 0 || vecs[i].size < min) {
                min = vecs[i].size;
            }
        }
        return min;
    }

    public static MaxSize(...vecs: Vector[]) {
        let max = 0;
        for (let i = 0; i < vecs.length; i++) {
            if (i == 0 || vecs[i].size > max) {
                max = vecs[i].size;
            }
        }
        return max;
    }

    public static Add(a: Vector, b: Vector) {
        const c = Vector.Zero(Vector.MaxSize(a, b));

        for (let i = 0; i < Vector.MinSize(a, b); i++) {
            c.data[i] = a.data[i] + b.data[i];
        }

        return c;
    }

    public static Scalar(a: Vector, m: number) {
        const c = a.copy();
        for (let i = 0; i < a.size; i++) {
            c.data[i] *= m;
        }
        return c;
    }

    public static Sub(a: Vector, b: Vector) {
        return Vector.Add(a, Vector.Scalar(b, -1));
    }

    public static Dot(a: Vector, b: Vector) {
        let sum = 0;
        for (let i = 0; i < Vector.MinSize(a, b); i++) {
            sum += a.data[i] * b.data[i];
        }
        return sum;
    }
}