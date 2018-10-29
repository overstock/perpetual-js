import { isPerpetual } from '../Perpetual';
import { hasOwnProperty, isDataStructure, shallowCopy } from './utils';

const set = (collection, key, value) => {
  if (!isDataStructure(collection)) {
    throw new TypeError(`Cannot update non-data-structure value: ${collection}`);
  }
  if (isPerpetual(collection)) {
    if (!collection.set) {
      throw new TypeError(`Cannot update perpetual value without .set() method: ${collection}`);
    }
    return collection.set(key, value);
  }
  if (hasOwnProperty.call(collection, key) && value === collection[key]) {
    return collection;
  }
  const collectionCopy = shallowCopy(collection);
  collectionCopy[key] = value;
  return collectionCopy;
};

export default set;
