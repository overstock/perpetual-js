import updateIn from './updateIn';
import { NOT_SET } from './utils/TrieUtils';

const setIn = (collection, keyPath, value) => updateIn(collection, keyPath, NOT_SET, () => value);

export default setIn;
