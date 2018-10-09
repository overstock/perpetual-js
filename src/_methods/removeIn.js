import updateIn from './updateIn';
import { NOT_SET } from './utils/TrieUtils';

const removeIn = (collection, keyPath) => updateIn(collection, keyPath, () => NOT_SET);

export default removeIn;
