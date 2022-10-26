import {equal} from "./equal";

export function assert(a: any, b: any) {
    if (!equal(a, b)) {
        throw new Error(`Value ${a} does not match expected value of ${b}`);
    }
}

export const assertFn = (fn: (any) => any, check, against) => {
    if (!equal(fn(check), against)) {
        throw new Error(`Value does not match expected value`);
    }
}

export function test(test, against, postHook = () => {}) {
    return {
        test,
        against,
        postHook,
    }
}

export interface Test {
    test: any;
    against: any;
    postHook: () => void;
}



export default class Tests {
    public static run(tests: Test[]): boolean {
        let passed = 0;
        let failed = 0;

        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            try {
                assert(test.test, test.against);
                console.log("\x1b[32m", `Test ${i+1} succeeded: ${test.test} matches ${test.against}`);
                test.postHook();
                passed += 1;
            } catch (e) {
                console.log("\x1b[31m", `Test ${i+1} failed: ${test.test} does not match ${test.against}`);
                failed += 1;
            }
        }

        console.log(`${passed} / ${failed + passed} tests passed`);

        return failed === 0;
    }

    public static runFn(name: string, fn: (any) => any, tests: Test[]): boolean {
        let passed = 0;
        let failed = 0;

        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            try {
                assertFn(fn, test.test, test.against);
                console.log("\x1b[32m", `Test ${i+1} succeeded: ${name}(${test.test}) = ${test.against}`);
                passed += 1;
            } catch (e) {
                console.log("\x1b[31m", `Test ${i+1} failed: ${name}(${test.test}) = ${test.against}`);
                failed += 1;
            }
        }

        console.log(`${passed} / ${failed + passed} tests passed`);

        return failed === 0;
    }
}