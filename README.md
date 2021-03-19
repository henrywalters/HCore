# HCore
A TypeScript library providing data structures and utilities to be used across all apps.

## Getting Started

### Installation
Install with `npm run install --save hcore`.

### Philosophy
Any code that is non-platform specific and provides an useful abstraction or utility likely belongs in this library. The benefit of this is two-fold. Firstly, it minimizes code duplication. More important, however, is the compounding reward of having a single highly maintained set of simple utilities instead of complex application specific ones.

## Constants
### Math Constants
- E
- PI
- SQRT_3
- SQRT_2

### English Constants
- ALPHABET ('a', 'b', 'c',...)
- DIGITS ('1', '2', '3'...)
- SPECIAL_CHARACTERS (!, @, #...)
- AMBIGUOUS_CHARACTERS (characters such as 0 and O)

## Data Structures
### HashMap
`HashMap<T>` is a simple wrapper over an object with string keys and type T values.

Use `generateHashMap<T>(data: T[], hashFn: (t: T) => string)` to convert an array of data to an indexable object. This is good way to convert O(n^2) algorithms into O(n).

```ts
import {HashMap, generateHashMap} from 'hcore/dist/structures/hashMap'

const A = [
    { id: 'a', foo: 'foo' },
    { id: 'b', foo: 'bar' },
    { id: 'c', foo: ';)'  },
]

const B = [
    { id: 'b', foo: 'bar' },
    { id: 'c', foo: ';)'  },
    { id: 'd', foo: ':0'  },
]

// Find the intersection of two sets
function intersection(a, b) {
    
    const output = [];
    
    // For each item we could iterate the other array to see if it exists, but it won't scale well to larger problems. 
    // It's quicker to create a hashmap (or lookup table) first.

    // generate a hashmap with the ID as the key.
    const lookupTable = generateHashMap(a, (a) => a.id);

    for (const item of B) {
        if (lookupTable.hasOwnProperty(item.id)) {
            output.push(item);
        }
    }

    return output;
}

```

## Utilities

### Random
`hcore/dist/random.ts` exposes the `Random` class which provides several static functions to generate random data.

```ts
// Here are some examples

Random.float(0, 10) // 5.321234
Random.int(0, 5) // 3
Random.digits(4) // "0023"
Random.alphanumeric(6) // "as3F9d"
```

### Path
`hcore/dist/path.ts` exposes the `Path` class which provides a method of rigidly defining and using dynamic string paths. The motivation for this comes from developing powerful frontend api service wrappers as quickly as possible while maintaining a clean codebase.

`hcore/dist/pathParameters.ts` is a wrapper around the `HashMap` specifically designed for the `Path` class. This is exposed in `Path.params`.

```ts

const assetDir = new Path('assets/:subFolder?/:file', {subFolder: 'sprites'})

assetDir.path // Error! file must be defined
assetDir.params.setParam('file', 'ntf.png')
assetDir.path // "assets/sprites/ntf.png"
assetDir.params.clearParam('subFolder')
assetDir.path // "assets/ntf.png"

```

### Type
`hcore/dist/type.ts` exposes the `Type` class which provides several static methods to identify and coerce string values intro their proper type.

```ts
// Here are some examples:

Type.isInt("3") // true
Type.isInt("3.14") // false
Type.isFloat("3") // false
Type.isFloat("3.0") // true
Type.isBoolean("1") // true
Type.isBoolean("2") // false
Type.isBoolean("true") // true
Type.isSqlDate("2020-10-12") // true
```

### Event Listener Pool
`hcore/dist/eventListenerPool.ts` exposes the `EventListenerPool` class which provides a simple way to manage your own custom events.

```ts
const pool = new EventListnerPool<number>();
pool.listen((x: number) => { console.log(x) });
pool.listen((x: number) => {} console.log(x * x) });

pool.emit(3);
// 3
// 9
```