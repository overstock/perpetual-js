import { isPerpetual } from '../Perpetual';
import { hasOwnProperty, isDataStructure, shallowCopy } from './utils';

const remove = (collection, key) => {
  if (!isDataStructure(collection)) {
    throw new TypeError(`Cannot update non-data-structure value: ${collection}`);
  }
  if (isPerpetual(collection)) {
    if (!collection.remove) {
      throw new TypeError(`Cannot update perpetual value without .remove() method: ${collection}`);
    }
    return collection.remove(key);
  }
  if (!hasOwnProperty.call(collection, key)) return collection;
  const collectionCopy = shallowCopy(collection);
  if (Array.isArray(collectionCopy)) collectionCopy.splice(key, 1);
  else delete collectionCopy[key];
  return collectionCopy;
};

export default remove;
