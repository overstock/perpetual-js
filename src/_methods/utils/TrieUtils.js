const NOT_SET = {};

const makeRef = () => ({ value: false });
const setRef = ref => {
  if (ref) {
    ref.value = true;
  }
};

export { NOT_SET, makeRef, setRef };
