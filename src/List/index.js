import List, { ListPrototype } from './List';
import {
  clear,
  deLete,
  getIn,
  includes,
  insert,
  merge,
  mergeDeepIn,
  mergeIn,
  pop,
  push,
  setIn,
  shift,
  splice,
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
ListPrototype.getIn = toMethod(getIn);
ListPrototype.includes = toMethod(includes);
ListPrototype.insert = toMethod(insert);
ListPrototype.merge = toMethod(merge);
ListPrototype.mergeDeepIn = toMethod(mergeDeepIn);
ListPrototype.mergeIn = toMethod(mergeIn);
ListPrototype.pop = toMethod(pop);
ListPrototype.push = toMethod(push);
ListPrototype.setIn = toMethod(setIn);
ListPrototype.shift = toMethod(shift);
ListPrototype.splice = toMethod(splice);
ListPrototype.toJS = toMethod(toJS);
ListPrototype.unshift = toMethod(unshift);
ListPrototype.update = toMethod(update);
ListPrototype.updateIn = toMethod(updateIn);
ListPrototype.withMutations = toMethod(withMutations);

const Lest = value => new List(value);

export {
  Lest as default,
};
