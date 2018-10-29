import { isPerpetual } from '../../Perpetual';
import isPlainObject from './isPlainObject';

const isDataStructure = value => (
  typeof value === 'object'
  && (isPerpetual(value) || Array.isArray(value) || isPlainObject(value))
);

export default isDataStructure;
