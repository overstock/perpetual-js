import splice from './splice';

const pop = list => splice(list, list.size - 1, 1);

export default pop;
