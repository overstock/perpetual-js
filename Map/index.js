import Map, { MapPrototype } from './Map';
import {
  getIn,
  hashCode,
  hasIn,
  map,
  merge,
  mergeDeep,
  mergeDeepIn,
  mergeIn,
  remove,
  removeIn,
  setIn,
  spread,
  toJS,
  toMethod,
  update,
  updateIn,
  withMutations,
} from '../_methods';

MapPrototype.getIn = toMethod(getIn);
MapPrototype.hashCode = toMethod(hashCode);
MapPrototype.hasIn = toMethod(hasIn);
MapPrototype.map = toMethod(map);
MapPrototype.merge = toMethod(merge);
MapPrototype.mergeDeep = toMethod(mergeDeep);
MapPrototype.mergeDeepIn = toMethod(mergeDeepIn);
MapPrototype.mergeIn = toMethod(mergeIn);
MapPrototype.delete = toMethod(remove);
MapPrototype.deleteIn = toMethod(removeIn);
MapPrototype.setIn = toMethod(setIn);
MapPrototype.spread = toMethod(spread);
MapPrototype.toJS = toMethod(toJS);
MapPrototype.update = toMethod(update);
MapPrototype.updateIn = toMethod(updateIn);
MapPrototype.withMutations = withMutations;

const Mep = value => new Map(value);

export default Mep;
