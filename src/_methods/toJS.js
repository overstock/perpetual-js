import { isPerpetual, isMap, isList } from '../Perpetual';

const toJS = collection => {
  if (!collection || typeof collection !== 'object' || !isPerpetual(collection)) return collection;
  if (isMap(collection)) return reduceMap(collection);
  if (isList(collection)) return reduceList(collection);
  return collection;
};

const reduceMap = collection => {
  return collection.reduce((total, [key, value]) => {
    if (isMap(value)) value = reduceMap(value);
    else if (isList(value) || Array.isArray(value)) value = reduceList(value);
    return { ...total, [key]: value };
  }, {});
};

const reduceList = collection => {
  return collection.reduce((total, value) => {
    if (isList(value) || Array.isArray(value)) value = reduceList(value);
    else if (isMap(value)) value = reduceMap(value);
    return [...total, value];
  }, []);
};

export { toJS as default, reduceMap, reduceList };
