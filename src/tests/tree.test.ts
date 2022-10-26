import Tests, {test} from "../tests";
import {Tree} from "../tree";


interface TreeNode {
    values: number[]
}

export const TreeTests = () => {

    const tree = new Tree<number>(1);
    const l1 = tree.insert(2);
    const r1 = tree.insert(3);
    l1.insert(4);
    l1.insert(5);
    r1.insert(6);
    r1.insert(7);

    const tree2 = new Tree<TreeNode>({values: [1]});
    tree2.insert({
        values: [2]
    });

    const tree2Check: TreeNode[] = [
        {
            values: [1],
        },
        {
            values: [2]
        }
    ]

    return Tests.run([
        test(tree.breadthFirst(), [1, 2, 3, 4, 5, 6, 7]),
        test(tree2.breadthFirst(), tree2Check),
    ]);
}