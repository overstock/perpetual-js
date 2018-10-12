const IS_LIST_SYMBOL = '@@__PERPETUAL_LIST__@@';

const isList = maybeMap => Boolean(maybeMap && maybeMap[IS_LIST_SYMBOL]);

export { IS_LIST_SYMBOL, isList as default };
