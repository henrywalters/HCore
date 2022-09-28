export function assert(a: any, b: any) {
    if (a !== b) {
        throw new Error(`Value ${a} does not match expected value of ${b}`);
    }
}

export const assertFn = (fn: (any) => any, check, against) => {
    if (fn(check) !== against) {
        throw new Error(`Value does not match expected value`);
    }
}

export function test(test, against) {
    return {
        test,
        against,
    }
}

export interface Test {
    test: any;
    against :any;
}



export default class Tests {
    public static run(tests: Test[]): boolean {
        let passed = 0;
        let failed = 0;

        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            try {
                console.log(`Test ${i+1} succeeded: ${test.test} matches ${test.against}`);
                assert(test.test, test.against);
                passed += 1;
            } catch (e) {
                console.log(`Test ${i+1} failed: ${test.test} does not match ${test.against}`);
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