import { isPerpetual, isMap, isList } from '../Perpetual';

const map = (collection, mapper) => {
  if (
    !collection
    || typeof collection !== 'object'
    || !isPerpetual(collection)
  ) {
    return;
  }
  if (isMap(collection)) return mapMap(collection, mapper);
  if (isList(collection)) return mapList(collection, mapper);
};

const mapMap = (collection, mapper) => {
  return collection.reduce((total, [key, value]) => {
    return total.set(key, mapper(value, key, total));
  }, new collection.constructor());
};

const mapList = (collection, mapper) => {
  return collection.reduce((total, value, index) => {
    return total.set(index, mapper(value, index, total));
  }, new collection.constructor());
};

export default map;
