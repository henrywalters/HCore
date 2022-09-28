import Tests, {test} from "../tests";
import Type from "../type";

export const IntTest = () => {
    return Tests.runFn("Type.isInt", Type.isInt, [
        test('-1', true),
        test('+1', false),
        test('asdfsadf9123123', false),
        test('1.0', false),
    ])
}

export const FloatTest = () => {
    return Tests.runFn("Type.isFloat", Type.isFloat, [
        test('-1.0', true),
        test('-1.03123', true),
        test('+1.123', false),
        test('asdfsadf9123123123.123123', false),
        test('1.', false),
        test('.3123', true),
        test('1000.3123', true),
        test('0.3123', true),
        test('00.3123', false),
    ])
}