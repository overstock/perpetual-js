import * as Map from '../Map';

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
    test('if typeof is not object returns undefined', () => {
      const value = () => {};
      expect(Map.createNewMap(value)).toEqual(undefined);
    });

    test('return Map if isArray', () => {
      const value = [['test', 'test']];
      expect(Map.createNewMap(value)).toMatchSnapshot();
    });
  });
});
