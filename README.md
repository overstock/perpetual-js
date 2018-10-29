# perpetual-js
A light weight version of Immutable.js.
This library comes in at 8kb minified and 3kb minified + gzipped.

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

### Map
**get()**
Returns the value associated with the provided key, or notSetValue if the Collection does not contain this key.
```typescript
get<NSV>(key: K, notSetValue: NSV): V | NSV
get(key: K): V | undefined
```

*getIn()
Returns the value found by following a path of keys or indices through nested Collections.
```typescript
getIn(searchKeyPath: Iterable<array>, notSetValue?: any): any
```

*hashCode()
The hashCode() function is an important part of how Perpetual determines if two values are equivalent and is used to determine how to store those values.
```typescript
hashCode(): number
```

*has()
True if a key exists within this `Collection`.
```typescript
has(key: K): boolean
```

*hasIn()
True if the result of following a path of keys or indices through nested Collections results in a set value.
```typescript
hasIn(searchKeyPath: Iterable<array>): boolean
```

*merge()
Returns a new Map resulting from merging the provided Collections (or JS objects) into this Map. In other words, this takes each entry of each collection and sets it on this Map.
```typescript
merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map<K | KC, V | VC>
merge<C>(...collections: Array<{[key: string]: C}>): Map<K | string, V | C>
```

*mergeDeep()
Like merge(), but when two Collections conflict, it merges them as well, recursing deeply through the nested data.
```typescript
mergeDeep(...collections: Array<Iterable<[K, V]> | {[key: string]: V}>): this
```

*mergeDeepIn()
A combination of updateIn and mergeDeep, returning a new Map, but performing the deep merge at a point arrived at by following the keyPath.
```typescript
mergeDeepIn(keyPath: Iterable<array>, ...collections: Array<any>): this
```

*mergeIn()
A combination of updateIn and merge, returning a new Map, but performing the merge at a point arrived at by following the keyPath.
```typescript
mergeIn(keyPath: Iterable<array>, ...collections: Array<any>): this
```

*set()
Returns a new Map also containing the new key, value pair. If an equivalent key already exists in this Map, it will be replaced.
```typescript
set(key: K, value: V): this
```

*setIn()
Returns a new Map having set `value` at this `keyPath`. If any keys in `keyPath` do not exist, a new immutable Map will be created at that key.
```typescript
setIn(keyPath: Iterable<array>, value: any): this
```

*delete()
Returns a new Map which exludes this `key`.
```typescript
delete(key: K): this
```
alias: remove()

*deleteIn()
Returns a new Map having removed the value at this keyPath. If any keys in keyPath do not exist, no change will occur.
```typescript
deleteIn(keyPath: Iterable<array>): this
```

*reduce()
Returns a new Map with values passed through a `reduce` function.
```typescript
reduce<M>(reduceFunction: (accumulator: A, entry: [K, V]) => M): Map<K, M>
```

*toJS()
Deeply converts this Keyed collection to equivalent native JavaScript Object.
```typescript
toJS(): Object
```

*update()
Returns a new Map having updated the value at this key with the return value of calling updater with the existing value.
```typescript
update(key: K, notSetValue: V, updater: (value: V) => V): this
update(key: K, updater: (value: V) => V): this
update<R>(updater: (value: this) => R): R
```

*updateIn()
Returns a new Map having applied the updater to the entry found at the keyPath.
```typescript
updateIn(
keyPath: Iterable<array>,
notSetValue: any,
updater: (value: any) => any
): this
updateIn(keyPath: Iterable<array>, updater: (value: any) => any): this
```
