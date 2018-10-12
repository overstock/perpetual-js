import List, { ListPrototype } from './List';
import { IS_LIST_SYMBOL } from '../_methods/isList';
import { toMethod } from '../Perpetual';
import {
  clear,
  deLete,
  getIn,
  includes,
  insert,
  isList,
  merge,
  mergeDeepIn,
  mergeIn,
  pop,
  push,
  setIn,
  shift,
  splice,
  unshift,
  update,
  updateIn,
  withMutations,
} from '../_methods';

List.isList = isList;

ListPrototype[IS_LIST_SYMBOL] = true;
ListPrototype.splice = toMethod(splice);
ListPrototype.delete = toMethod(deLete);
ListPrototype.includes = toMethod(includes);
ListPrototype.insert = toMethod(insert);
ListPrototype.clear = clear;
ListPrototype.push = toMethod(push);
ListPrototype.pop = toMethod(pop);
ListPrototype.unshift = toMethod(unshift);
ListPrototype.shift = toMethod(shift);
ListPrototype.setIn = toMethod(setIn);
ListPrototype.update = toMethod(update);
ListPrototype.updateIn = toMethod(updateIn);
ListPrototype.getIn = toMethod(getIn);
ListPrototype.mergeDeepIn = toMethod(mergeDeepIn);
ListPrototype.mergeIn = toMethod(mergeIn);
ListPrototype.merge = toMethod(merge);
ListPrototype.concat = toMethod(merge);
ListPrototype.withMutations = toMethod(withMutations);

const Lest = value => new List(value);

export {
  Lest as default,
};
