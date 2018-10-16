import * as methods from '../../src/_methods';
import * as hashCode from '../../src/_methods/hashCode';
import List from '../../src/List/List';
import Map from '../../src/Map/Map';

describe('_methods', () => {
  describe('clear', () => {
    const list = methods.clear();
    test('returns empty List', () => {
      expect(list).toBeInstanceOf(List);
      expect(list).toMatchSnapshot();
    });

    test('all properties of list are empty', () => {
      expect(list.altered).toBe(false);
      expect(list.size).toBe(0);
      expect(list.tail).toBe(undefined);
      expect(list._hashCode).toBe(undefined);
    });
  });

  describe('delete', () => {
    const list = new List([1, 2, 3, 4, 5]);

    test('returns new instance of list', () => {
      const newList = methods.deLete(list, 0);
      expect(newList).toBeInstanceOf(List);
      expect(newList).not.toBe(list);
    });

    const zero = methods.deLete(list, 0);
    const one = methods.deLete(list, 1);
    const two = methods.deLete(list, 2);
    const three = methods.deLete(list, 3);
    const four = methods.deLete(list, 4);

    test('removes correct index', () => {
      expect(zero.get(0)).toBe(2);
      expect(one.get(1)).toBe(3);
      expect(two.get(2)).toBe(4);
      expect(three.get(3)).toBe(5);
      expect(four.get(4)).toBe(undefined);
    });

    test('adjust list size correctly', () => {
      expect(list.size).toBe(5);
      expect(zero.size).toBe(4);
      expect(one.size).toBe(4);
      expect(two.size).toBe(4);
      expect(three.size).toBe(4);
      expect(four.size).toBe(4);
    });
  });

  describe('get', () => {
    describe('List', () => {
      const list = new List([1, 2, 3, 4, 5]);

      test('get returns correct value', () => {
        expect(methods.get(list, 0)).toBe(1);
        expect(methods.get(list, 1)).toBe(2);
        expect(methods.get(list, 2)).toBe(3);
        expect(methods.get(list, 3)).toBe(4);
        expect(methods.get(list, 4)).toBe(5);
      });

      test('returns notSetValue if value does not exist', () => {
        expect(methods.get(list, 5)).toBe(undefined);
        expect(methods.get(list, 5, 'value')).toBe('value');
      });

      test('if is array returns value at index', () => {
        expect(methods.get([1, 2, 3, 4], 0)).toBe(1);
      });
    });

    describe('Map', () => {
      const map = new Map({ x: 'z', y: 'a' });

      test('get returns correct value', () => {
        expect(methods.get(map, 'x')).toBe('z');
        expect(methods.get(map, 'y')).toBe('a');
      });

      test('returns notSetValue if value does not exist', () => {
        expect(methods.get(map, 'z')).toBe(undefined);
        expect(methods.get(map, 'z', 'value')).toBe('value');
      });

      test('if object returns value at key', () => {
        expect(methods.get({ abc: 'abc' }, 'abc')).toBe('abc');
      });
    });
  });

  describe('getIn', () => {
    describe('List', () => {
      const list = new List([1, 2, 3, [1, 2, { x: 'x', y: [1, 2] }]]);

      test('returns correct nested value', () => {
        expect(methods.getIn(list, [3, 2, 'y'])).toEqual([1, 2]);
        expect(methods.getIn(list, [3, 0])).toEqual(1);
        expect(methods.getIn(list, [3, 2, 'x'])).toEqual('x');
      });

      test('returns notSetValue if value does not exist', () => {
        expect(methods.getIn(list, [0, 4])).toBe(undefined);
        expect(methods.getIn(list, [3, 2, 'z'], 'value')).toBe('value');
      });
    });

    describe('Map', () => {
      const map = new Map({ x: 'b', y: [1, 2, 3, { z: 'a' }] });

      test('returns correct nested value', () => {
        expect(methods.getIn(map, ['y', 3, 'z'])).toEqual('a');
        expect(methods.getIn(map, ['y', 2])).toEqual(3);
        expect(methods.getIn(map, ['x'])).toEqual('b');
      });

      test('returns notSetValue if value does not exist', () => {
        expect(methods.getIn(map, ['y', 5, 'w'])).toBe(undefined);
        expect(methods.getIn(map, ['x', 3, 'z'], 'value')).toBe('value');
      });
    });

    describe('Map and List', () => {
      const map1 = new Map({ x: 'y', z: 'a' });
      const list1 = new List([1, 2, 3, map1]);
      const list2 = new List([5, 6, 7, 8]);
      const map2 = new Map({ a: 'b', c: list2 });
      const mapList = new Map({ map: map2, list: list1 });

      test('returns correct nested value', () => {
        expect(methods.getIn(mapList, ['map', 'c', 2])).toEqual(7);
        expect(methods.getIn(mapList, ['list', 3, 'z'])).toEqual('a');
        expect(methods.getIn(mapList, ['list', 3])).toEqual(map1);
      });

      test('returns notSetValue if value does not exist', () => {
        expect(methods.getIn(mapList, ['map', 'b', 3])).toBe(undefined);
        expect(methods.getIn(mapList, ['list', 4, 'list'], 'value')).toBe('value');
      });
    });
  });

  describe('has', () => {
    describe('List', () => {
      const list = new List([1, 2, { a: 'b' }, 4]);

      test('returns true if has index', () => {
        expect(methods.has(list, 2)).toBe(true);
        expect(methods.has(list, 0)).toBe(true);
      });

      test('returns false if does not have index', () => {
        expect(methods.has(list, 4)).toBe(false);
        expect(methods.has(list, 7)).toBe(false);
      });
    });

    describe('Map', () => {
      const map = new Map({ a: 'b', c: 'd', e: {} });

      test('returns true if has value', () => {
        expect(methods.has(map, 'e')).toBe(true);
        expect(methods.has(map, 'a')).toBe(true);
      });

      test('returns false if does not have value', () => {
        expect(methods.has(map, 'x')).toBe(false);
        expect(methods.has(map, 'z')).toBe(false);
      });
    });
  });

  describe('hashCode', () => {
    describe('hashCode default', () => {
      const map = new Map({ x: 'y' });
      const list = new List([1, 2, 3]);

      test('hashCode adds _hashCode to Map or List', () => {
        expect(map._hashCode).toBe(undefined);
        expect(list._hashCode).toBe(undefined);
        hashCode.default(map);
        hashCode.default(list);
        expect(map._hashCode).toEqual(expect.any(Number));
        expect(list._hashCode).toEqual(expect.any(Number));
      });

      test('hashCode returns a number', () => {
        expect(hashCode.default(map)).toEqual(expect.any(Number));
        expect(hashCode.default(list)).toEqual(expect.any(Number));
      });
    });

    describe('getHash', () => {
      const map = new Map({ x: 'x' });
      const hash = hashCode.getHash(map);

      test('getHash returns a hash value', () => {
        expect(hash).toEqual(expect.any(Number));
        expect(hash).toBeGreaterThan(1000);
      });

      test('returns same number everytime', () => {
        expect(hashCode.getHash(map)).toEqual(hash);
      });
    });

    describe('hashMap and hashList', () => {
      const list1 = new List([9, 8, 7, new Map({ y: 'z' })]);
      const map = new Map({ x: 'y', z: [1, 2, { x: 'y' }], a: list1 });
      const list = new List([3, 2, 6, map]);
      const hashMap = hashCode.hashMap(map);
      const hashList = hashCode.hashList(list);

      test('hashMap can recursively hash all value in map', () => {
        expect(hashMap).toEqual(expect.any(Number));
        expect(hashMap).toBeGreaterThan(1000);
      });

      test('hashList can recursively hash all value in list', () => {
        expect(hashList).toEqual(expect.any(Number));
        expect(hashList).toBeGreaterThan(1000);
      });
    });

    describe('hash', () => {
      const values = ['value', 'apple', 'string', 'value'];

      test('returns a string', () => {
        expect(hashCode.hash(values[0])).toEqual(expect.any(String));
      });

      test('returns number as a string', () => {
        const hash = Number(hashCode.hash(values[1]));
        expect(hash).toEqual(expect.any(Number));
        expect(hash).toBeGreaterThan(1000);
      });

      test('returns same hash for same value', () => {
        const hash1 = hashCode.hash(values[0]);
        const hash2 = hashCode.hash(values[3]);
        expect(hash1).toEqual(hash2);
      });

      test('returns different hashes for different values', () => {
        const hash1 = hashCode.hash(values[0]);
        const hash2 = hashCode.hash(values[2]);
        expect(hash1).not.toEqual(hash2);
      });
    });
  });
});
