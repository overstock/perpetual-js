import updateIn from './updateIn';

const update = (collection, key, notSetValue, updater) =>
  (typeof key === 'function'
    ? key(collection)
    : updateIn(collection, [key], notSetValue, updater));

export default update;
