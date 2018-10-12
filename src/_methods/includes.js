const includes = (list, value) => {
  const { tail: { array } } = list;
  return array.indexOf(value) !== -1;
};

export default includes;
