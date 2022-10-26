import Tests, {test} from "../tests";
import {Vector} from "../math/vector";

export const VectorTests = () => {

    const a = new Vector(1, 2, 3);
    const b = new Vector(1, 2, 3);
    const c = new Vector(4, 5, 6);
    const d = new Vector(1, 2);

    return Tests.run([
        test(Vector.Add(a, b), new Vector(2, 4, 6)),
        test(Vector.Scalar(a, 2), new Vector(2, 4, 6)),
        test(a, b),
        test(Vector.Sub(a, b), Vector.Zero(3)),
        test(Vector.Dot(a, c), 32),
    ])
}