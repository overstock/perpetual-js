const arrCopy = arr => {
  const length = Math.max(0, arr.length);
  const newArr = new Array(length);
  for (let i = 0; i < length; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

export default arrCopy;
