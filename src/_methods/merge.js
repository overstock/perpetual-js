const merge = (collection, ...collections) => {
  const iters = collections.filter(collec => {
    if (collec.size !== 0) return collec;
    return null;
  });
  if (iters.length === 0) return collection;
  if (
    collection.size === 0
    && iters.length === 1
  ) return collection.constructor(iters[0]);
  return collection.withMutations(col => {
    for (let i = 0; i < iters.length; i++) {
      return iters[0].reduce((entries, [key, value]) => {
        return entries.set(key, value);
      }, col);
    }
  });
};

export default merge;
