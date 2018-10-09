import get from './get';

const getIn = (collection, keyPath, notSetValue) => {
  let i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], {}/* NOT_SET */);
    if (collection === {}/* NOT_SET */) return notSetValue;
  }
  return collection;
};

export default getIn;
