import { isPerpetual } from '../Perpetual';
import { isDataStructure, hasOwnProperty } from './utils';

const has = (collection, key) =>
  (isPerpetual(collection)
    ? collection.has(key)
    : isDataStructure(collection) && hasOwnProperty.call(collection, key));

export default has;
