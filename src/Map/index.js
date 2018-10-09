import { IS_MAP_SYMBOL } from '../_methods/isMap';
import { isMap } from '../_methods';
import {
  freeze, isObject, objectToArray,
} from './functions/functions';
import { is } from '../Perpetual';

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
}

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
}

let EMPTY_MAP;
const emptyMap = () => {
  if (!EMPTY_MAP) EMPTY_MAP = makeEmptyMap(0);
  return EMPTY_MAP;
};

const makeEmptyMap = (size, root) => {
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

Map.isMap = isMap;

const MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;

const Mep = value => new Map(value);

export {
  Mep as default, emptyMap, makeEmptyMap, createNewMap,
};
