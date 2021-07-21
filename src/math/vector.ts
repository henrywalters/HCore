export class Vector {
    public data: number[];
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

    public get x(): number {
        if (this.size < 1) {
            throw new Error("X only exists on vectors size > 1");
        }
        return this.data[0];
    }

    public get y(): number {
        if (this.size < 2) {
            throw new Error("Y only exists on vectors size > 1");
        }
        return this.data[1];
    }

    public get z(): number {
        if (this.size < 2) {
            throw new Error("Z only exists on vectors size > 1");
        }
        return this.data[2];
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
}