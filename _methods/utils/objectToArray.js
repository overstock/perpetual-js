import freeze from './freeze';

const objectToArray = value => {
  if (Array.isArray(value)) return value;
  const keys = Object.keys(value);
  let i = keys.length;
  const entryArray = new Array(i);

  while (i--) entryArray[i] = freeze([keys[i], value[keys[i]]]);

  return freeze(entryArray);
};

export default objectToArray;
