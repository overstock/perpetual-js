import { isList } from '../_methods';
import {
  SIZE, makeRef, setRef, NOT_SET,
} from '../_methods/utils/TrieUtils';
import { freeze } from '../_methods/utils';

class List {
  constructor(value) {
    const empty = emptyList();
    if (value === null || value === undefined) return empty;
    if (isList(value)) return value;
    if (!Array.isArray(value)) {
      throw new TypeError(`Expected Array: ${value}`);
    }
    const { length } = value;
    if (length === 0) return empty;
    if (length > SIZE) throw new SyntaxError(`Array.length needs to be less than: ${SIZE}`);
    if (length > 0 && length < SIZE) {
      return makeList(length, new VNode(value));
    }
  }

  has(index) {
    if (typeof index !== 'number') return;
    if (index < 0 || index > this.size) return false;
    return true;
  }

  get(index, notSetValue) {
    if (typeof index !== 'number') return;
    const { size, tail } = this;
    if (index >= 0 && index < size) {
      return tail.get(index, notSetValue);
    }
    return notSetValue;
  }

  set(index, value) {
    return updateList(this, index, value);
  }

  reduce(fn, t) {
    return this.tail ? this.tail.reduce(fn, t) : NOT_SET;
  }
}

const ListPrototype = List.prototype;

class VNode {
  constructor(array) {
    this.array = freeze(array);
  }

  get(index, notSetValue) {
    const { array } = this;
    if (index >= 0 && index < array.length) {
      return array[index];
    }
    return notSetValue;
  }

  reduce(fn, t) {
    const { array } = this;
    return Array.isArray(array) ? array.reduce(fn, t) : NOT_SET;
  }
}

let EMPTY_LIST;
const emptyList = () => {
  if (!EMPTY_LIST) EMPTY_LIST = makeList(0);
  return EMPTY_LIST;
};

const makeList = (size, tail) => {
  const list = Object.create(ListPrototype);
  list.size = size;
  list.tail = tail;
  list.altered = false;
  return list;
};

const updateList = (list, index, value) => {
  if (index !== index) return list; // eslint-disable-line
  if (index < 0) throw new SyntaxError('Index must be greater than or equal to 0');
  const { size } = list;
  const didAlter = makeRef();
  const newTail = createNewTail(list, index, value, didAlter);
  const newSize = size === newTail.length ? size : newTail.length;
  if (!didAlter.value) return list;
  return makeList(newSize, new VNode(newTail));
};

const createNewTail = (list, index, value, didAlter) => {
  let { tail } = list;
  if (!tail) tail = new VNode([]);
  const current = list.get(index);
  if (current === value) {
    return;
  }
  setRef(didAlter);
  return Object.assign([...tail.array], { [index]: value });
};

export {
  List as default,
  ListPrototype,
  VNode,
  emptyList,
  makeList,
  updateList,
  createNewTail,
};
