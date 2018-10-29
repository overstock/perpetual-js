# perpetual-js
A light weight version of Immutable.js.
This library comes in at 8kb minified and 3kb minified + gzipped.

Because of efforts to keep bundle size small not all methods are included in Perpetual. Just the essential ones.

## Installation
Install `perpetual-js` using npm or yarn.
```
npm install perpetual-js
yarn add perpetual-js
```

## Usage

Perpetual comes with two different immutable collections: Map and List.
`Map`: is a collection of key value pairs.
`List`: is a collection of values.

### Example
* Can import multiple different ways.

```jsx
import { Map, List } from 'perpetual-js'
import Map from 'perpetual-js/Map'
import List from 'perpetual-js/List'

const map = Map({ value: 'value' })
const list = List([1, 2, 3, 4])
```

## Map
*** get()**

Returns the value associated with the provided key, or notSetValue if the Collection does not contain this key.
```typescript
get<NSV>(key: K, notSetValue: NSV): V | NSV
get(key: K): V | undefined
```


*** getIn()**

Returns the value found by following a path of keys or indices through nested Collections.
```typescript
getIn(searchKeyPath: Iterable<array>, notSetValue?: any): any
```


*** hashCode()**

The hashCode() function is an important part of how Perpetual determines if two values are equivalent and is used to determine how to store those values.
```typescript
hashCode(): number
```


*** has()**

True if a key exists within this `Collection`.
```typescript
has(key: K): boolean
```


*** hasIn()**

True if the result of following a path of keys or indices through nested Collections results in a set value.
```typescript
hasIn(searchKeyPath: Iterable<array>): boolean
```


*** merge()**

Returns a new Map resulting from merging the provided Collections (or JS objects) into this Map. In other words, this takes each entry of each collection and sets it on this Map.
```typescript
merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map<K | KC, V | VC>
merge<C>(...collections: Array<{[key: string]: C}>): Map<K | string, V | C>
```


*** mergeDeep()**

Like merge(), but when two Collections conflict, it merges them as well, recursing deeply through the nested data.
```typescript
mergeDeep(...collections: Array<Iterable<[K, V]> | {[key: string]: V}>): this
```


*** mergeDeepIn()**

A combination of updateIn and mergeDeep, returning a new Map, but performing the deep merge at a point arrived at by following the keyPath.
```typescript
mergeDeepIn(keyPath: Iterable<array>, ...collections: Array<any>): this
```


*** mergeIn()**

A combination of updateIn and merge, returning a new Map, but performing the merge at a point arrived at by following the keyPath.
```typescript
mergeIn(keyPath: Iterable<array>, ...collections: Array<any>): this
```


*** set()**

Returns a new Map also containing the new key, value pair. If an equivalent key already exists in this Map, it will be replaced.
```typescript
set(key: K, value: V): this
```


*** setIn()**

Returns a new Map having set `value` at this `keyPath`. If any keys in `keyPath` do not exist, a new immutable Map will be created at that key.
```typescript
setIn(keyPath: Iterable<array>, value: any): this
```


*** delete()**

Returns a new Map which exludes this `key`.
```typescript
delete(key: K): this
```
alias: remove()


*** deleteIn()**

Returns a new Map having removed the value at this keyPath. If any keys in keyPath do not exist, no change will occur.
```typescript
deleteIn(keyPath: Iterable<array>): this
```


*** reduce()**

Returns a new Map with values passed through a `reduce` function.
```typescript
reduce<R>(
reducer: (reduction: R, value: [K, V], key: number, iter: this) => R,
initialReduction: R,
context?: any
): R
reduce<R>(
reducer: (reduction: T | R, value: [K, V], key: number, iter: this) => R
): R
```


*** toJS()**

Deeply converts this Keyed collection to equivalent native JavaScript Object.
```typescript
toJS(): Object
```


*** update()**

Returns a new Map having updated the value at this key with the return value of calling updater with the existing value.
```typescript
update(key: K, notSetValue: V, updater: (value: V) => V): this
update(key: K, updater: (value: V) => V): this
update<R>(updater: (value: this) => R): R
```


*** updateIn()**

Returns a new Map having applied the updater to the entry found at the keyPath.
```typescript
updateIn(
keyPath: Iterable<array>,
notSetValue: any,
updater: (value: any) => any
): this
updateIn(keyPath: Iterable<array>, updater: (value: any) => any): this
```


*** withMutations()**

Every time you call one of the above functions, a new immutable Map is created. If a pure function calls a number of these to produce a final return value, then a penalty on performance and memory has been paid by creating all of the intermediate immutable Maps.
```typescript
withMutations(mutator: (mutable: this) => any): this
```



## List
*** clear()**

Returns a new List with 0 size and no values in constant time.
```typescript
clear(): List<T>
```


*** concat()**

Returns a new List with other values or collections concatenated to this one.
```typescript
concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): List<T | C>
```
alias: merge


*** delete()**

Returns a new List which excludes this `index` and with a size 1 less than this List. Values at indices above `index` are shifted down by 1 to fill the position.
```typescript
delete(index: number): List<T>
```


*** deleteIn()**

Returns a new List having removed the value at this keyPath. If any keys in keyPath do not exist, no change will occur.
```typescript
deleteIn(keyPath: Iterable<any>): this
```


*** get()**

Returns the value associated with the provided index, or notSetValue if the index is beyond the bounds of the Collection.
```typescript
get<NSV>(index: number, notSetValue: NSV): T | NSV
get(index: number): T | undefined
```


*** getIn()**

Returns the value found by following a path of keys or indices through nested Collections.
```typescript
getIn(searchKeyPath: Iterable<any>, notSetValue?: any): any
```


*** has()**

True if a key exists within this Collection.
```typescript
has(key: number): boolean
```


*** hashCode()**

The hashCode() function is an important part of how Perpetual determines if two values are equivalent and is used to determine how to store those values.
```typescript
hashCode(): number
```


*** includes()**

True if a value exists within this Collection, using Immutable.is to determine equality
```typescript
includes(value: T): boolean
```


*** insert()**

Returns a new List with `value` at `index` with a size 1 more than this List. Values at indices above `index` are shifted over by 1.
```typescript
insert(index: number, value: T): List<T>
```


*** mergeDeepIn()**

A combination of updateIn and mergeDeep, returning a new Map, but performing the deep merge at a point arrived at by following the keyPath.
```typescript
mergeDeepIn(keyPath: Iterable<array>, ...collections: Array<any>): this
```


*** mergeIn()**

A combination of updateIn and merge, returning a new Map, but performing the merge at a point arrived at by following the keyPath.
```typescript
mergeIn(keyPath: Iterable<array>, ...collections: Array<any>): this
```


*** pop()**

Returns a new List with a size ones less than this List, excluding the last index in this List.
```typescript
pop(): List<T>
```


*** push()**

Returns a new List with the provided values appended, starting at this List's size.
```typescript
push(...values: Array<T>): List<T>
```


*** set()**

Returns a new List which includes `value` at `index`. If `index` already exists in this List, it will be replaced.
```typescript
set(index: number, value: T): List<T>
```


*** setIn()**

Returns a new List having set value at this `keyPath`. If any keys in `keyPath` do not exist, a new immutable Map will be created at that key.
```typescript
setIn(keyPath: Iterable<any>, value: any): this
```


*** shift()**

Returns a new List with a size ones less than this List, excluding the first index in this List, shifting all other values to a lower index.
```typescript
shift(): List<T>
```


*** splice()**

Splice returns a new indexed Collection by replacing a region of this Collection with new values. If values are not provided, it only skips the region to be removed.
```typescript
splice(index: number, removeNum: number, ...values: Array<T>): this
```


*** reduce()**

Reduces the Collection to a value by calling the reducer for every entry in the Collection and passing along the reduced value.
```typescript
reduce<R>(
reducer: (reduction: R, value: T, key: number, iter: this) => R,
initialReduction: R,
context?: any
): R
reduce<R>(
reducer: (reduction: T | R, value: T, key: number, iter: this) => R
): R
```


*** toJS()**

Deeply converts this Indexed collection to equivalent native JavaScript Array.
```typescript
toJS(): Array<any>
```


*** unshift()**

Returns a new List with the provided values prepended, shifting other values ahead to higher indices.
```typescript
unshift(...values: Array<T>): List<T>
```


*** update()**

Returns a new List with an updated value at `index` with the return value of calling updater with the existing value, or `notSetValue` if `index` was not set. If called with a single argument, updater is called with the List itself.
```typescript
update(index: number, notSetValue: T, updater: (value: T) => T): this
update(index: number, updater: (value: T) => T): this
update<R>(updater: (value: this) => R): R
```


*** updateIn()**

Returns a new Map having applied the updater to the entry found at the keyPath.
```typescript
updateIn(
keyPath: Iterable<array>,
notSetValue: any,
updater: (value: any) => any
): this
updateIn(keyPath: Iterable<array>, updater: (value: any) => any): this
```


*** withMutations()**

Every time you call one of the above functions, a new immutable List is created. If a pure function calls a number of these to produce a final return value, then a penalty on performance and memory has been paid by creating all of the intermediate immutable Lists.
```typescript
withMutations(mutator: (mutable: this) => any): this
```
