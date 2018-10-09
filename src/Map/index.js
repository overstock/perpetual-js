import toMethod from './toMethod';
import { IS_MAP_SYMBOL } from '../_methods/isMap';
import {
  isMap,
  getIn,
  remove,
  removeIn,
  setIn,
  update,
  updateIn,
} from '../_methods';
import {
  freeze, isObject, objectToArray,
} from './functions/functions';
import { is } from '../Perpetual';
import { arrCopy } from '../_methods/utils';
import { NOT_SET, makeRef, setRef } from '../_methods/utils/TrieUtils';

class Map {
  constructor(value) {
    return value === null || value === undefined
      ? emptyMap()
      : isMap(value)
        ? value
        : createNewMap(value);
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
}

Map.isMap = isMap;

const MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;
MapPrototype.getIn = toMethod(getIn);
MapPrototype.delete = toMethod(remove);
MapPrototype.deleteIn = toMethod(removeIn);
MapPrototype.setIn = toMethod(setIn);
MapPrototype.update = toMethod(update);
MapPrototype.updateIn = toMethod(updateIn);


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
}

let EMPTY_MAP;
const emptyMap = () => {
  if (!EMPTY_MAP) EMPTY_MAP = makeMap(0);
  return EMPTY_MAP;
};

const makeMap = (size, root) => {
  const map = Object.create(MapPrototype);
  map.size = size;
  map.root = root;
  map.altered = false;
  return freeze(map);
};

const createNewMap = value => {
  if (!isObject(value)) {
    throw new Error('expected value of type object or array');
  }

  const entries = objectToArray(value);
  const map = Object.create(MapPrototype);
  map.size = entries.length;
  map.root = new ArrayMapNode(entries);
  map.altered = false;
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
    newSize = map.size + (didChangeSize.value ? (value === NOT_SET ? -1 : 1) : 0);
  }
  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
};

const Mep = value => new Map(value);

export {
  Mep as default, emptyMap, makeMap, createNewMap,
};
