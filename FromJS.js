import Map from './Map';
import List from './List';
import { isDataStructure, isPlainObject } from './_methods/utils';

const fromJS = collection => {
  if (!isDataStructure) return collection;
  if (isPlainObject(collection)) return mapIt(collection);
  if (Array.isArray(collection)) return listIt(collection);
  return collection;
};

const mapIt = collection => {
  const map = Map(collection);
  return map.reduce((total, [key, value]) => {
    if (isPlainObject(value)) value = mapIt(value);
    else if (Array.isArray(value)) value = listIt(value);
    const result = total.set(key, value);
    return result;
  }, map);
};

const listIt = collection => {
  const list = List(collection);
  return list.reduce((total, entry, index) => {
    if (Array.isArray(entry)) entry = listIt(entry);
    else if (isPlainObject(entry)) entry = mapIt(entry);
    const result = total.set(index, entry);
    return result;
  }, list);
};

export default fromJS;
