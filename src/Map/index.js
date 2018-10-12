import Map, { MapPrototype } from './Map';
import {
  getIn,
  hasIn,
  remove,
  removeIn,
  setIn,
  toMethod,
  update,
  updateIn,
  withMutations,
  merge,
  mergeDeep,
  mergeIn,
  mergeDeepIn,
} from '../_methods';

MapPrototype.getIn = toMethod(getIn);
MapPrototype.hasIn = toMethod(hasIn);
MapPrototype.delete = toMethod(remove);
MapPrototype.deleteIn = toMethod(removeIn);
MapPrototype.setIn = toMethod(setIn);
MapPrototype.update = toMethod(update);
MapPrototype.updateIn = toMethod(updateIn);
MapPrototype.merge = toMethod(merge);
MapPrototype.mergeDeep = toMethod(mergeDeep);
MapPrototype.mergeDeepIn = toMethod(mergeDeepIn);
MapPrototype.mergeIn = toMethod(mergeIn);
MapPrototype.withMutations = withMutations;

const Mep = value => new Map(value);

export default Mep;
