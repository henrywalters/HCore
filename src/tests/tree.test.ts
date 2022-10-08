import Tests, {test} from "../tests";
import {Tree} from "../tree";

export const TreeTests = () => {

    const tree = new Tree<number>(1);
    const l1 = tree.insert(2);
    const r1 = tree.insert(3);
    l1.insert(4);
    l1.insert(5);
    r1.insert(6);
    r1.insert(7);

    return Tests.run([
        test(tree.breadthFirst(), [1, 2, 3, 4, 5, 6, 7]),
    ]);
}