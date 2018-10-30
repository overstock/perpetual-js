import is from '../is';
import Map from '../Map';
import List from '../List';

describe('is', () => {
  test('if one or more values is missing or falsy returns false', () => {
    expect(is(null)).toBeFalsy();
    expect(is(undefined)).toBeFalsy();
    expect(is('', null)).toBeFalsy();
    expect(is(undefined, null)).toBeFalsy();
    expect(is(NaN, null)).toBeFalsy();
  });

  describe('normal values', () => {
    const str = 'string';
    const str1 = 'string';
    const str2 = 'sring';

    test('2 string with same properties returns true', () => {
      expect(is(str, str1)).toBeTruthy();
    });

    test('if values are not equal returns false', () => {
      expect(is(str, str2)).toBeFalsy();
    });
  });

  describe('Perpetual values', () => {
    describe('Map', () => {
      const map = Map({ x: 'x', y: 'y', z: 'z' });
      const map1 = Map({ x: 'x', y: 'y', z: 'z' });
      const map2 = Map({ x: 's', y: 'y', z: 'z' });

      test('maps with same values returns true', () => {
        expect(is(map, map1)).toBeTruthy();
      });

      test('maps with different values returns false', () => {
        expect(is(map, map2)).toBeFalsy();
        expect(is(map1, map2)).toBeFalsy();
      });
    });

    describe('List', () => {
      const list = List([1, 2, 3, 4, [0]]);
      const list1 = List([1, 2, 3, 4, [0]]);
      const list2 = List([1, 2, 3, 4, [2]]);

      test('lists with same values returns true', () => {
        expect(is(list, list1)).toBeTruthy();
      });

      test('lists with different values return false', () => {
        expect(is(list, list2)).toBeFalsy();
        expect(is(list1, list2)).toBeFalsy();
      });
    });
  });
});
