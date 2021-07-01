export const INT_REGEX = /^\d+$/;
export const FLOAT_REGEX = /^[0-9]*[.][0-9]+$/;
export const SQL_DATE_REGEX = /^\d{4}[-]\d{2}[-]\d{2}$/
export const SQL_TIME_REGEX = /^\d{2}[:]\d{2}$/
export const SQL_DATETIME_REGEX = /^(\d{4}[-]\d{2}[-]\d{2})|(\d{2}[:]\d{2})$/
export const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

// Class to determine more specific types from JS primitives and coerce them into the proper data type.
export default class Type {
    public static isBoolean(value: string) {
        const upper = value.toUpperCase();
        return upper === 'TRUE' || upper === 'FALSE' || upper === '0' || upper === '1';
    }

    public static toBoolean(value: string) {
        if (!this.isBoolean) {
            throw new Error("Value is not a boolean variable");
        }
        const upper = value.toUpperCase();
        return upper === 'TRUE' || upper === '1' ? true : false;
    }

    public static isInt(value: string) {
        return INT_REGEX.test(value);
    }

    public static toInt(value: string) {
        if (!this.isInt(value)) {
            throw new Error("value is not a int variable");
        }
        return parseInt(value);
    }

    public static isFloat(value: string) {
        return FLOAT_REGEX.test(value);
    }

    public static toFloat(value: string) {
        if (!this.isFloat(value)) {
            throw new Error("value is not a float variable");
        }
        return parseFloat(value);
    }

    public static isSqlDate(value: string) {
        return SQL_DATE_REGEX.test(value);
    }

    public static isSqlTime(value: string) {
        return SQL_TIME_REGEX.test(value);
    }

    public static isSqlDatetime(value: string) {
        return SQL_DATETIME_REGEX.test(value);
    }

    public static isDate(value: string) {
        return !isNaN(Date.parse(value));
    }
}