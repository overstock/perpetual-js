const NOT_SET = {};
const SHIFT = 5;
const SIZE = 1 << SHIFT; // eslint-disable-line

const makeRef = () => ({ value: false });
const setRef = ref => {
  if (ref) {
    ref.value = true;
  }
};

export {
  NOT_SET,
  SHIFT,
  SIZE,
  makeRef,
  setRef
};
