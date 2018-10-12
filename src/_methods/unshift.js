import splice from './splice';

const unshift = (list, ...values) => splice(list, 0, 0, ...values);

export default unshift;
