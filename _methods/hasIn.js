import getIn from './getIn';
import { NOT_SET } from './utils/TrieUtils';

const hasIn = (collection, keyPath) => getIn(collection, keyPath, NOT_SET) !== NOT_SET;

export default hasIn;
