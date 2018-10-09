const isPlainObject = value => (
  value
  && ((value.constructor && value.constructor.name === 'Object')
    || value.constructor === undefined)
);

export default isPlainObject;
