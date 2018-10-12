const isValueObject = maybeValue =>
  Boolean(
    maybeValue
    && typeof maybeValue.equals === 'function'
    && typeof maybeValue.hashCode === 'function'
  );

const is = (valueA, valueB) => {
  if (!valueA || !valueB) return false;
  // eslint-disable-next-line
  if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) return true;
  if (
    typeof valueA.valueOf === 'function'
    && typeof valueB.valueOf === 'function'
  ) {
    valueA = valueA.valueOf();
    valueB = valueB.valueOf();
    if (!valueA || !valueB) return false;
    if (
      valueA === valueB
      // eslint-disable-next-line
      || (valueA !== valueA && valueB !== valueB)
    ) return true;
  }
  return Boolean(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
};

export { is as default, isValueObject };
