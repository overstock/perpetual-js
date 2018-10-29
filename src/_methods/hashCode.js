import { isPerpetual, isMap, isList } from '../Perpetual';
import { objectToArray, isPlainObject } from './utils';

const hashCode = collection => {
  if (!collection._hashCode) collection._hashCode = getHash(collection);
  return collection._hashCode;
};

const getHash = collection => {
  if (!isPerpetual(collection)) return;
  if (isMap(collection)) return hashMap(collection);
  if (isList(collection)) return hashList(collection);
  return hash(collection);
};

const hashMap = collection => {
  return collection.reduce((total, [key, value]) => {
    if (isMap(value)) value = hashMap(value);
    if (isList(value)) value = hashList(value);
    if (isPlainObject(value)) value = hashMap(objectToArray(value));
    if (Array.isArray(value)) value = hashList(value);
    total += hash(key) + hash(value);
    return Number(hash(total));
  }, '');
};

const hashList = collection => {
  return collection.reduce((total, value) => {
    if (isMap(value)) value = hashMap(value);
    if (isList(value)) value = hashList(value);
    if (isPlainObject(value)) value = hashMap(objectToArray(value));
    if (Array.isArray(value)) value = hashList(value);
    total += hash(value);
    return Number(hash(total));
  }, '');
};

// modified hash function from https://gist.github.com/iperelivskiy/4110988
const hash = value => {
  value = String(value);
  let a = 1;
  let c = 0;
  let o;
  if (value) {
    a = 0;
    for (let h = value.length - 1; h >= 0; h--) {
      o = value.charCodeAt(h);
      a = (a << 6 & 268435455) + o + (o << 14);
      c = a & 266338304;
      a = c !== 0 ? a ^ c >> 21 : a;
    }
  }
  return String(a);
};

export {
  hashCode as default,
  getHash,
  hashMap,
  hashList,
  hash
};
