import { isMap, IS_MAP_SYMBOL } from './mapFunctions/methods';
import {
  freeze, isObject, objectToArray, createRoot,
} from './mapFunctions/functions';

class Map {
  constructor(value) {
    return value === null || value === undefined
      ? emptyMap()
      : isMap(value)
        ? value
        : createNewMap(value);
  }
}

let EMPTY_MAP;
const emptyMap = () => {
  if (!EMPTY_MAP) EMPTY_MAP = makeEmptyMap(0);
  return EMPTY_MAP;
};

const MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;

const makeEmptyMap = (size, root) => {
  const map = Object.create(MapPrototype);
  map.size = size;
  map.root = root;
  map.altered = false;
  return freeze(map);
};

const createNewMap = value => {
  if (!isObject(value)) {
    console.error('expected value of type object or array');
    return;
  }

  const entries = objectToArray(value);
  const map = Object.create(MapPrototype);
  map.size = entries.length;
  map.root = createRoot(entries);
  map.altered = false;
  return map;
};

const Mep = value => new Map(value);

export {
  Mep as default, emptyMap, makeEmptyMap, createNewMap,
};
