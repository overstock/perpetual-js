import splice from './splice';

const push = (list, ...values) => splice(list, list.size, 0, ...values);

export default push;
