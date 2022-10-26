export function equal(a: any, b: any) {

    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (!(equal(a[i], b[i]))) return false;
    }

    return true;
}