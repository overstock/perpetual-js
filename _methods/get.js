import { isPerpetual } from '../Perpetual';
import has from './has';

const get = (collection, key, notSetValue) => {
  if (isPerpetual(collection)) return collection.get(key, notSetValue);
  if (!has(collection, key)) return notSetValue;
  if (typeof collection.get === 'function') return collection.get(key);
  return collection[key];
};

export default get;
