import List, { ListPrototype } from './List';
import {
  clear,
  deLete,
  getIn,
  hashCode,
  includes,
  insert,
  map,
  merge,
  mergeDeepIn,
  mergeIn,
  pop,
  push,
  removeIn,
  setIn,
  shift,
  splice,
  spread,
  toJS,
  toMethod,
  unshift,
  update,
  updateIn,
  withMutations,
} from '../_methods';

ListPrototype.clear = clear;
ListPrototype.concat = toMethod(merge);
ListPrototype.delete = toMethod(deLete);
ListPrototype.deleteIn = toMethod(removeIn);
ListPrototype.getIn = toMethod(getIn);
ListPrototype.hashCode = toMethod(hashCode);
ListPrototype.includes = toMethod(includes);
ListPrototype.insert = toMethod(insert);
ListPrototype.map = toMethod(map);
ListPrototype.merge = toMethod(merge);
ListPrototype.mergeDeepIn = toMethod(mergeDeepIn);
ListPrototype.mergeIn = toMethod(mergeIn);
ListPrototype.pop = toMethod(pop);
ListPrototype.push = toMethod(push);
ListPrototype.setIn = toMethod(setIn);
ListPrototype.shift = toMethod(shift);
ListPrototype.splice = toMethod(splice);
ListPrototype.spread = toMethod(spread);
ListPrototype.toJS = toMethod(toJS);
ListPrototype.unshift = toMethod(unshift);
ListPrototype.update = toMethod(update);
ListPrototype.updateIn = toMethod(updateIn);
ListPrototype.withMutations = withMutations;

const Lest = value => new List(value);

export { Lest as default };
