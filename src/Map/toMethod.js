function toMethod(func) {
  return function (...args) {
    return func(this, ...args);
  };
}

export default toMethod;
