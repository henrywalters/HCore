import {FloatTest, IntTest} from "./type.test";
import {TreeTests} from "./tree.test";
import {StateMachineTest} from "./stateMachine.test";
import {VectorTests} from "./vector.test";

const tests = [
    IntTest,
    FloatTest,
    TreeTests,
    StateMachineTest,
    VectorTests,
];

let passed = true;

for (const test of tests) {
    if (!test()) {
        console.log("\x1b[31m", test.name + " failed");
        passed = false;
    }
}

if (!passed) {
    console.log("\x1b[31m", "Tests not passed")
    process.exit(1);
}

process.exit(0);
console.log("Successfully ran all tests!")