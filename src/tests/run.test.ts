import {FloatTest, IntTest} from "./type.test";


const tests = [
    IntTest,
    FloatTest,
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