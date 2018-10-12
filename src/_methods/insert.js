import splice from './splice';

const insert = (list, index, value) => splice(list, index, 0, value);

export default insert;
