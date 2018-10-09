import { isMap } from '../_methods';

const isPerpetual = maybePerpetual =>
  Boolean(maybePerpetual && (isMap(maybePerpetual) || isList(maybePerpetual)));

export default isPerpetual;
