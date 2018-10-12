import Map from '../Map/Map';
import { isDataStructure } from './utils';

let merged;
const mergeDeep = (collection, ...sources) => {
  if (!isDataStructure(collection)) {
    throw new TypeError(`Cannot merge into non-data-structure value: ${collection}`);
  }
  const isArray = Array.isArray(collection);
  const mergedFunc = isArray ? mergeList : mergeMap;
  merged = isArray ? collection : new Map(collection);
  sources.forEach(mergedFunc);
  return merged;
};

const mergeMap = source => {
  merged.constructor(source).reduce((entries, [key, value]) => {
    const hasVal = merged.has(key);
    if (!hasVal) {
      merged = merged.set(key, value);
    } else {
      const firstValue = merged.get(key);
      const secondValue = entries.get(key);
      const mergedValue = firstValue.merge(secondValue);
      merged = merged.set(key, mergedValue);
    }
    return entries;
  }, merged.constructor(source));
};

const mergeList = source => {
  source.reduce((entries, entry) => {
    merged.push(entry);
    return entries;
  }, source);
};

export { mergeDeep as default, mergeMap, mergeList };
