const includes = (list, value) => {
  const { tail } = list;
  return tail ? tail.array.indexOf(value) !== -1 : false;
};

export default includes;
