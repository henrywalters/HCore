export type HashMap<T> = {[key: string]: T};

export function generateHashMap<T>(data: T[], hashFn: (value: T) => string): HashMap<T> {
    const map = {};
    for (const value of data) {
        map[hashFn(value)] = value;
    }
    return map;
}