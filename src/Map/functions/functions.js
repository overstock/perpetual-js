const objectToArray = value => {
  if (isArray(value)) return value;
  const keys = Object.keys(value);
  let i = keys.length;
  const entryArray = new Array(i);

  while (i--) entryArray[i] = freeze([keys[i], value[keys[i]]]);

  return freeze(entryArray);
};

const isArray = value => Array.isArray(value);

const isObject = value => {
  if (typeof (value) === 'object') {
    return true;
  }
  return false;
};

const freeze = object => Object.freeze(object);

export {
  objectToArray,
  isArray,
  isObject,
  freeze,
};
