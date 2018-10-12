import { isPerpetual } from './Perpetual';

const is = (valueA, valueB) => {
  if (!valueA || !valueB) return false;
  // eslint-disable-next-line
  if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) return true;
  if (isPerpetual(valueA) && isPerpetual(valueB)) return valueA.hashCode() === valueB.hashCode();
  return Boolean(valueA === valueB);
};

export default is;
