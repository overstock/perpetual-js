import Map from '../Map';
import { isPerpetual } from '../Perpetual';
import { isDataStructure } from './utils';

const mergeDeep = (collection, ...sources) => {
  if (!isDataStructure(collection)) {
    throw new TypeError(`Cannot merge into non-data-structure value: ${collection}`);
  }
  let merged;
  if (!isPerpetual(collection)) merged = Map(collection);
  sources.forEach(source => {
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
  });
  return merged;
};

export default mergeDeep;
