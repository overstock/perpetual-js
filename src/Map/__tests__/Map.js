import * as Map from '../index';

describe('Map', () => {
  test('emptyMap to return empty Map', () => {
    const map = {
      size: 0,
      root: undefined,
      altered: false,
    };

    expect(Map.emptyMap()).toEqual(map);
  });

  test('makeEmptyMap creates Map with correct size', () => {
    const map = {
      size: 0,
      root: undefined,
      altered: false,
    };

    expect(Map.makeEmptyMap(0)).toEqual(map);
  });

  describe('createNewMap', () => {
    test('if typeof value is not object, throws error', () => {
      expect(Map.createNewMap).toThrow(Error);
    });

    test('return Map if isArray', () => {
      const value = [['test', 'test']];
      expect(Map.createNewMap(value)).toMatchSnapshot();
    });

    test('returns Map if is Object', () => {
      const value = { test: 'test' };
      expect(Map.createNewMap(value)).toMatchSnapshot();
    });
  });

  describe('Mep', () => {
    const value = { test: 'test' };

    test('returns empty map with empty value', () => {
      expect(Map.default()).toMatchSnapshot();
    });

    test('returns new Map with value', () => {
      expect(Map.default(value)).toMatchSnapshot();
    });
  });
});
