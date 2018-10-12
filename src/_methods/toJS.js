import { isPerpetual, isMap, isList } from '../Perpetual';

const toJS = collection => {
  if (!collection || typeof collection !== 'object' || !isPerpetual(collection)) return collection;
  let result;
  if (isMap(collection)) {
    result = reduceMap(collection);
  } else if (isList(collection)) {
    result = reduceList(collection);
  }
  return result;
};

const reduceMap = collection => {
  return collection.reduce((total, [key, value]) => {
    if (isMap(value)) value = reduceMap(value);
    else if (isList(value) || Array.isArray(value)) value = reduceList(value);
    const result = { ...total, [key]: value };
    return result;
  }, {});
};

const reduceList = collection => {
  return collection.reduce((total, value) => {
    if (isList(value) || Array.isArray(value)) value = reduceList(value);
    else if (isMap(value)) value = reduceMap(value);
    const result = [...total, value];
    return result;
  }, []);
};

export { toJS as default, reduceMap, reduceList };
