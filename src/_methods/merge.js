import { isList, isMap } from '../Perpetual';
import { isPlainObject, objectToArray } from './utils';

const merge = (collection, ...collections) => {
  const iters = collections.filter(collec => {
    if (collec.size !== 0) return collec;
    return null;
  });
  if (iters.length === 0) return collection;
  if (
    collection.size === 0
    && iters.length === 1
  ) return collection.constructor(iters[0]);
  return collection.withMutations(col => {
    let newMap = col;
    for (let i = 0; i < iters.length; i++) {
      if (Array.isArray(iters[i]) && isMap(col)) {
        throw new TypeError('Cannot merge type Array with class Map');
      }
      if (isMap(iters[i])) newMap = mergeMap(iters[i], newMap);
      if (isList(iters[i]) || Array.isArray(iters[i])) newMap = mergeList(iters[i], newMap);
      if (isPlainObject(iters[i])) newMap = mergeMap(objectToArray(iters[i]), newMap);
    }
    return newMap;
  });
};

const mergeMap = (collection, initialValue) => {
  return collection.reduce((entries, [key, value]) => {
    return entries.set(key, value);
  }, initialValue);
};

const mergeList = (collection, initialValue) => {
  return collection.reduce((entries, value) => {
    return entries.set(entries.size, value);
  }, initialValue);
};

export default merge;
