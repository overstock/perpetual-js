import updateIn from './updateIn';

const update = (collection, key, notSetValue, updater) =>
  updateIn(collection, [key], notSetValue, updater);

export default update;
