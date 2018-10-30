import { makeRef, setRef } from './utils/TrieUtils';
import { makeList, VNode } from '../List/List';

const splice = (list, index, deleteCount, ...values) => {
  if (index < 0) throw new SyntaxError('Index must be greater than or equal to 0');
  const { tail: { array } } = list;
  deleteCount = Math.max(deleteCount, 0);
  const deleteIndex = index + deleteCount;
  const didAlter = makeRef();
  const newTail = [...array.slice(0, index), ...values, ...array.slice(deleteIndex, array.length)];
  didChange(array, newTail, didAlter);
  if (!didAlter.value) return list;
  const newSize = newTail.length;
  return makeList(newSize, new VNode(newTail));
};

const didChange = (original, current, didAlter) => {
  if (original.toString() !== current.toString()) setRef(didAlter);
};

export { splice as default, didChange };
