const quoteString = value => {
  try {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  } catch (err) {
    return JSON.stringify(value);
  }
};

export default quoteString;
