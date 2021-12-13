export function assert(a: any, b: any) {
    if (a !== b) {
        throw new Error(`Value ${a} does not match expected value of ${b}`);
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
}