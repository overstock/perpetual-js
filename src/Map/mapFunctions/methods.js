const IS_MAP_SYMBOL = '@@__PERPETUAL_MAP__@@';

const isMap = maybeMap =>
  Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);

export { IS_MAP_SYMBOL, isMap };
