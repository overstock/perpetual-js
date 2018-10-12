import { isPerpetual } from '../Perpetual';
import { isDataStructure, quoteString } from './utils';
import { NOT_SET } from './utils/TrieUtils';
import { emptyMap } from '../Map/Map';
import get from './get';
import remove from './remove';
import set from './set';

const updateIn = (collection, keyPath, notSetValue, updater) => {
  if (!updater) {
    updater = notSetValue;
    notSetValue = undefined;
  }
  const updatedValue = updateInDeeply(
    isPerpetual(collection),
    collection,
    keyPath,
    0/* index */,
    notSetValue,
    updater
  );
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
};

const updateInDeeply = (inPerpetual, collection, keyPath, index, notSetValue, updater) => {
  const wasNotSet = collection === NOT_SET;
  if (index === keyPath.length) {
    const existingValue = wasNotSet ? notSetValue : collection;
    const newValue = updater(existingValue);
    return newValue === existingValue ? collection : newValue;
  }
  if (!wasNotSet && !isDataStructure(collection)) {
    throw new TypeError(`Cannot update within non-data-structure value in path [${keyPath.slice(0, index).map(quoteString)}]: ${collection}`);
  }
  const key = keyPath[index];
  const nextExisting = wasNotSet ? NOT_SET : get(collection, key, NOT_SET);
  const isInPerpetual = nextExisting === NOT_SET ? inPerpetual : isPerpetual(nextExisting);
  const nextUpdated = updateInDeeply(
    isInPerpetual,
    nextExisting,
    keyPath,
    index + 1,
    notSetValue,
    updater
  );

  if (nextUpdated === nextExisting) return collection;
  if (nextUpdated === NOT_SET) return remove(collection, key);
  return set(
    wasNotSet ? (inPerpetual ? emptyMap() : {}) : collection,
    key,
    nextUpdated
  );
};

export default updateIn;
