import { isPerpetual, isMap } from '../Perpetual';

const spread = (collection, ...args) => {
  if (!collection || typeof collection !== 'object' || !isPerpetual(collection)) {
    return;
  }
  const initial = isMap(collection) ? {} : [];
  return args.reduce((total, arg, index) => {
    const key = alt => (Array.isArray(total) ? index : alt);
    return Object.assign(
      initial,
      total,
      Array.isArray(arg)
        ? { [key(arg[0])]: collection.getIn(arg) }
        : { [key(arg)]: collection.getIn([arg]) },
    );
  }, initial);
};

export default spread;
