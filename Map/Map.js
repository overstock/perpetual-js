import { isMap } from '../Perpetual';
import is from '../is';
import { NOT_SET, setRef, makeRef } from '../_methods/utils/TrieUtils';
import { IS_MAP_SYMBOL } from '../Perpetual/isMap';
import {
  arrCopy,
  freeze,
  isPlainObject,
  objectToArray,
} from '../_methods/utils';

class Map {
  constructor(value) {
    if (value === null || value === undefined) return emptyMap();
    if (isMap(value)) return value;
    return createNewMap(value);
  }

  get(key, notSetValue) {
    return this.root ? this.root.get(key, notSetValue) : notSetValue;
  }

  has(searchKey) {
    return this.get(searchKey, NOT_SET) !== NOT_SET;
  }

  set(key, value) {
    return updateMap(this, key, value);
  }

  remove(key) {
    return updateMap(this, key, NOT_SET);
  }

  reduce(fn, t) {
    return this.root ? this.root.reduce(fn, t) : NOT_SET;
  }
}

Map.isMap = isMap;

const MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;

class ArrayMapNode {
  constructor(entries) {
    this.entries = freeze(entries);
  }

  get(key, notSetValue) {
    const { entries } = this;
    for (let i = 0; i < entries.length; i++) {
      if (is(key, entries[i][0])) return entries[i][1];
    }
    return notSetValue;
  }

  update(key, value, didChangeSize) {
    const { entries } = this;
    const { length } = entries;
    const removed = value === NOT_SET;
    let idx = 0;

    for (; idx < length; idx++) {
      if (is(key, entries[idx][0])) break;
    }
    const exists = idx < length;

    if (exists ? entries[idx][1] === value : removed) return this;
    if (removed || !exists) setRef(didChangeSize);
    if (removed && entries.length === 1) return; // undefined

    const newEntries = arrCopy(entries);

    if (exists) {
      if (removed) {
        if (idx === length - 1) newEntries.pop();
        else newEntries[idx] = newEntries.pop();
      } else newEntries[idx] = [key, value];
    } else newEntries.push([key, value]);

    return new ArrayMapNode(newEntries);
  }

  reduce(fn, t) {
    const { entries } = this;
    return Array.isArray(entries) ? entries.reduce(fn, t) : NOT_SET;
  }
}

let EMPTY_MAP;
const emptyMap = () => {
  if (!EMPTY_MAP) EMPTY_MAP = makeMap(0);
  return EMPTY_MAP;
};

const makeMap = (size, root, hashCode) => {
  const map = Object.create(MapPrototype);
  map.size = size;
  map.root = root;
  map.altered = false;
  map._hashCode = hashCode;
  return freeze(map);
};

const createNewMap = value => {
  if (!isPlainObject(value)) {
    throw new Error('expected value of type object');
  }

  const entries = objectToArray(value);
  const map = Object.create(MapPrototype);
  map.size = entries.length;
  map.root = new ArrayMapNode(entries);
  map.altered = false;
  map._hashCode = undefined;
  return map;
};

const updateMap = (map, key, value) => {
  let newRoot;
  let newSize;
  if (!map.root) {
    if (value === NOT_SET) return map;
    newSize = 1;
    newRoot = new ArrayMapNode([[key, value]]);
  } else {
    const didChangeSize = makeRef();
    newRoot = map.root.update(key, value, didChangeSize);
    let changedBy;
    if (didChangeSize.value) {
      if (value === NOT_SET) changedBy = -1;
      else changedBy = 1;
    } else changedBy = 0;
    newSize = map.size + changedBy;
  }
  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
};

export {
  Map as default,
  MapPrototype,
  ArrayMapNode,
  emptyMap,
  makeMap,
  createNewMap,
  updateMap,
};
