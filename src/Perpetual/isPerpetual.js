import isMap from './isMap';
import isList from './isList';

const isPerpetual = maybePerpetual =>
  Boolean(maybePerpetual && (isMap(maybePerpetual) || isList(maybePerpetual)));

export default isPerpetual;
