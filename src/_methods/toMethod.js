function toMethod(func) {
  return function method(...args) {
    return func(this, ...args);
  };
}

export default toMethod;
