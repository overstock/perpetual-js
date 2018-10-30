import arrCopy from './arrCopy';
import hasOwnProperty from './hasOwnProperty';

const shallowCopy = from => {
  if (Array.isArray(from)) {
    return arrCopy(from);
  }
  const to = {};
  // eslint-disable-next-line
  for (const key in from) {
    if (hasOwnProperty.call(from, key)) {
      to[key] = from[key];
    }
  }
  return to;
};

export default shallowCopy;
