import mergeDeep from './mergeDeep';
import updateIn from './updateIn';
import { emptyMap } from '../Map/Map';

const mergeIn = (collection, keypath, ...iters) =>
  updateIn(collection, keypath, emptyMap(), col => mergeDeep(col, ...iters));

export default mergeIn;
