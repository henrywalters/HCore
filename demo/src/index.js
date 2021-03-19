import HCore from 'hcore';

console.log(HCore.Tests.run([
    { test: HCore.Type.isBoolean('false'), against: true },
    { test: HCore.Type.isBoolean('true'), against: true },
    { test: HCore.Type.isBoolean('0'), against: true },
    { test: HCore.Type.isBoolean('1'), against: true },
    { test: HCore.Type.isBoolean('asdfasdfas'), against: false },
    { test: HCore.Type.isBoolean('2'), against: false },
    { test: HCore.Type.toBoolean('true'), against: true },
    { test: HCore.Type.toBoolean('false'), against: false },
    { test: HCore.Type.toBoolean('1'), against: true },
    { test: HCore.Type.toBoolean('0'), against: false },

    { test: HCore.Type.isInt('1123123'), against: true },
    { test: HCore.Type.isInt('1123123.0123123'), against: false },
    { test: HCore.Type.toInt('1123'), against: 1123 },

    { test: HCore.Type.isFloat('1123.1231'), against: true },
    { test: HCore.Type.isFloat('1123asdf'), against: false },
    { test: HCore.Type.toFloat('3.14159'), against: 3.14159 },
    { test: HCore.Type.isFloat('3.1234123123123'), against: true },

    { test: HCore.Type.isSqlDate('2020-01-01asdf'), against: true },
    { test: HCore.Type.isSqlTime('12:23PM'), against: true},
    { test: HCore.Type.isSqlDatetime('2020-01-0112:23'), against: true},
]))