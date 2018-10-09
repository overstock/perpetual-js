function toMethod(func, ...args) {
  return func(this, ...args);
}

export default toMethod;
