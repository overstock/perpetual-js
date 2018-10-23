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

  describe('hasIn', () => {
    describe('List', () => {
      const list = new List([1, 2, 3, [1, 2, 3, [1, 2, 3]]]);

      test('returns true if list has nested index', () => {
        expect(methods.hasIn(list, [0])).toBe(true);
        expect(methods.hasIn(list, [3, 0])).toBe(true);
        expect(methods.hasIn(list, [3, 3, 2])).toBe(true);
      });

      test('returns false if does not have nested index', () => {
        expect(methods.hasIn(list, [4])).toBe(false);
        expect(methods.hasIn(list, [3, 4])).toBe(false);
        expect(methods.hasIn(list, [3, 3, 4])).toBe(false);
      });
    });

    describe('Map', () => {
      const map = new Map({
        x: 'y',
        z: {
          x: 'y',
          z: {
            x: 'y',
            z: 'a'
          }
        }
      });

      test('returns true if map has nested value', () => {
        expect(methods.hasIn(map, ['x'])).toBe(true);
        expect(methods.hasIn(map, ['z', 'x'])).toBe(true);
        expect(methods.hasIn(map, ['z', 'z', 'x'])).toBe(true);
      });

      test('returns false if does not have nested value', () => {
        expect(methods.hasIn(map, ['y'])).toBe(false);
        expect(methods.hasIn(map, ['z', 'y'])).toBe(false);
        expect(methods.hasIn(map, ['z', 'z', 'y'])).toBe(false);
      });
    });
  });

  describe('includes', () => {
    const list = new List([1, 'value', 3, 'apple', 5, 'string']);

    test('returns true if value is included', () => {
      expect(methods.includes(list, 'value')).toBe(true);
      expect(methods.includes(list, 3)).toBe(true);
      expect(methods.includes(list, 'string')).toBe(true);
    });

    test('returns false if value does not exist', () => {
      expect(methods.includes(list, 'none')).toBe(false);
      expect(methods.includes(list, 2)).toBe(false);
      expect(methods.includes(list, 'pear')).toBe(false);
    });
  });

  describe('insert', () => {
    const list = new List([1, 2, 3, 4, 5]);
    const list1 = methods.insert(list, 0, 'value');
    const list2 = methods.insert(list, 2, 'string');
    const list3 = methods.insert(list1, 3, 'apple');

    test('returns new List with inserted value', () => {
      expect(list1).toBeInstanceOf(List);
      expect(list1.get(0)).toEqual('value');
      expect(list2).toBeInstanceOf(List);
      expect(list2.get(0)).toEqual(1);
      expect(list2.get(2)).toEqual('string');
      expect(list3).toBeInstanceOf(List);
      expect(list3.get(0)).toEqual('value');
      expect(list3.get(3)).toEqual('apple');
    });

    test('increases size value correctly', () => {
      expect(list.size).toBe(5);
      expect(list1.size).toBe(6);
      expect(list2.size).toBe(6);
      expect(list3.size).toBe(7);
    });
  });

  describe('merge', () => {
    describe('Map', () => {
      const map1 = new Map({ x: 'x', y: 'y', z: 'a' });
      const map2 = new Map({ x: 'z', y: 'x', a: 'a' });
      const mapObj = new Map({ b: { x: 'x' } });
      const mapArr = new Map({ c: [1, 2, 3] });
      const mapList = new Map({ d: new List([1, 2, 3]) });
      const mapMap = new Map({ e: new Map({ x: 'x' }) });
      Map.prototype.withMutations = methods.withMutations;

      const newMap = methods.merge(map1, map2);
      const mergedMap = methods.merge(map1, map2, mapObj, mapArr, mapList, mapMap);

      test('returns new map with correct size', () => {
        expect(newMap).toBeInstanceOf(Map);
        expect(newMap.size).toBe(4);
      });

      test('should have properties x, y, z, a, b', () => {
        expect(newMap.has('x')).toBe(true);
        expect(newMap.has('y')).toBe(true);
        expect(newMap.has('z')).toBe(true);
        expect(newMap.has('a')).toBe(true);
      });

      test('should have {x: z, y: x, z: a, a: a}', () => {
        expect(newMap.get('x')).toEqual('z');
        expect(newMap.get('y')).toEqual('x');
        expect(newMap.get('z')).toEqual('a');
        expect(newMap.get('a')).toEqual('a');
      });

      test('can merge multiple maps at a time', () => {
        expect(mergedMap).toBeInstanceOf(Map);
        expect(mergedMap.size).toBe(8);
      });

      test('has properties: a, b, c, d, x, y, z', () => {
        expect(mergedMap.has('x')).toBe(true);
        expect(mergedMap.has('y')).toBe(true);
        expect(mergedMap.has('z')).toBe(true);
        expect(mergedMap.has('a')).toBe(true);
        expect(mergedMap.has('b')).toBe(true);
        expect(mergedMap.has('c')).toBe(true);
        expect(mergedMap.has('d')).toBe(true);
        expect(mergedMap.has('e')).toBe(true);
      });

      test('returns correct values', () => {
        expect(mergedMap.get('x')).toEqual('z');
        expect(mergedMap.get('y')).toEqual('x');
        expect(mergedMap.get('z')).toEqual('a');
        expect(mergedMap.get('a')).toEqual('a');
        expect(mergedMap.get('b')).toEqual({ x: 'x' });
        expect(mergedMap.get('c')).toEqual([1, 2, 3]);
        expect(mergedMap.get('d')).toEqual(new List([1, 2, 3]));
        expect(mergedMap.get('e')).toEqual(new Map({ x: 'x' }));
      });

      test('can merge an object', () => {
        const mergedObj = methods.merge(map1, { a: 'x', b: 'y' });
        expect(mergedObj).toBeInstanceOf(Map);
        expect(mergedObj.size).toBe(5);
        expect(mergedObj.has('a')).toBe(true);
        expect(mergedObj.has('b')).toBe(true);
        expect(mergedObj.get('a')).toEqual('x');
        expect(mergedObj.get('b')).toEqual('y');
      });

      test('throws type error if attempted merge with array', () => {
        expect(() => {
          methods.merge(map1, [1, 2, 3, 4]);
        }).toThrow(TypeError);
      });
    });

    describe('List', () => {
      const list1 = new List([1, 2, 3]);
      const list2 = new List([4, 5, 6]);
      const listObj = new List([{ x: 'x' }]);
      const listArr = new List([[1, 2, 3]]);
      const listMap = new List([new Map({ x: 'x' })]);
      const listList = new List([new List([1, 2, 3])]);
      List.prototype.withMutations = methods.withMutations;

      const newList = methods.merge(list1, list2);
      const mergedList = methods.merge(list1, list2, listObj, listArr, listMap, listList);

      test('returns new list with correct size', () => {
        expect(newList).toBeInstanceOf(List);
        expect(newList.size).toBe(6);
      });

      test('has all correct indexes', () => {
        expect(newList.has(0)).toBe(true);
        expect(newList.has(1)).toBe(true);
        expect(newList.has(2)).toBe(true);
        expect(newList.has(3)).toBe(true);
        expect(newList.has(4)).toBe(true);
        expect(newList.has(5)).toBe(true);
      });

      test('returns correct value', () => {
        expect(newList.get(0)).toBe(1);
        expect(newList.get(1)).toBe(2);
        expect(newList.get(2)).toBe(3);
        expect(newList.get(3)).toBe(4);
        expect(newList.get(4)).toBe(5);
        expect(newList.get(5)).toBe(6);
      });

      test('can merge multiple lists at a time', () => {
        expect(mergedList).toBeInstanceOf(List);
        expect(mergedList.size).toBe(10);
      });

      test('has all correct indexes', () => {
        expect(mergedList.has(0)).toBe(true);
        expect(mergedList.has(1)).toBe(true);
        expect(mergedList.has(2)).toBe(true);
        expect(mergedList.has(3)).toBe(true);
        expect(mergedList.has(4)).toBe(true);
        expect(mergedList.has(5)).toBe(true);
        expect(mergedList.has(6)).toBe(true);
        expect(mergedList.has(7)).toBe(true);
        expect(mergedList.has(8)).toBe(true);
        expect(mergedList.has(9)).toBe(true);
      });

      test('returns correct values', () => {
        expect(mergedList.get(0)).toEqual(1);
        expect(mergedList.get(1)).toEqual(2);
        expect(mergedList.get(2)).toEqual(3);
        expect(mergedList.get(3)).toEqual(4);
        expect(mergedList.get(4)).toEqual(5);
        expect(mergedList.get(5)).toEqual(6);
        expect(mergedList.get(6)).toEqual({ x: 'x' });
        expect(mergedList.get(7)).toEqual([1, 2, 3]);
        expect(mergedList.get(8)).toEqual(new Map({ x: 'x' }));
        expect(mergedList.get(9)).toEqual(new List([1, 2, 3]));
      });

      test('can merge array', () => {
        const mergedArr = methods.merge(list1, [11, 12, 13]);
        expect(mergedArr).toBeInstanceOf(List);
        expect(mergedArr.size).toBe(6);
        expect(mergedArr.has(3)).toBe(true);
        expect(mergedArr.has(4)).toBe(true);
        expect(mergedArr.has(5)).toBe(true);
        expect(mergedArr.get(3)).toBe(11);
        expect(mergedArr.get(4)).toBe(12);
        expect(mergedArr.get(5)).toBe(13);
      });

      test('can merge object', () => {
        const mergedObj = methods.merge(list1, { x: 'x', y: 'y' });
        expect(mergedObj).toBeInstanceOf(List);
        expect(mergedObj.size).toBe(4);
        expect(mergedObj.has(3)).toBe(true);
        expect(mergedObj.get(3)).toEqual({ x: 'x', y: 'y' });
      });
    });

    describe('Map and List', () => {
      const map1 = new Map({ x: 'y', z: 'x' });
      const map2 = new Map({ a: 'b', c: 'a' });
      const list1 = new List([1, 2, 3, 4]);
      const list2 = new List([5, 6, 7, 8]);

      const merge1 = methods.merge(list1, map1);
      const merge2 = methods.merge(list2, map2);
      const merge3 = methods.merge(list1, map2, list2, map1);

      test('cannot merge list onto map', () => {
        expect(() => methods.merge(map1, list1)).toThrow(TypeError);
        expect(() => methods.merge(map2, list2)).toThrow(TypeError);
      });

      test('Returns new List with correct size', () => {
        expect(merge1).toBeInstanceOf(List);
        expect(merge2).toBeInstanceOf(List);
        expect(merge3).toBeInstanceOf(List);
        expect(merge1.size).toBe(6);
        expect(merge2.size).toBe(6);
        expect(merge3.size).toBe(12);
      });

      test('merged Lists return correct values', () => {
        expect(merge3.get(0)).toEqual(1);
        expect(merge3.get(4)).toEqual(['a', 'b']);
        expect(merge3.get(6)).toEqual(5);
        expect(merge3.get(11)).toEqual(['z', 'x']);
      });
    });
  });

  describe('mergeDeep', () => {
    const one = new Map({ a: new Map({ x: 10, y: 10 }), b: new Map({ x: 20, y: 50 }) });
    const two = new Map({ a: new Map({ x: 2 }), b: new Map({ y: 5 }), c: new Map({ z: 3 }) });
    Map.prototype.merge = methods.toMethod(methods.merge);
    const merged = methods.mergeDeep(one, two);

    test('merged returns new map with correct size', () => {
      expect(merged).toBeInstanceOf(Map);
      expect(merged.size).toBe(3);
    });

    test('values of two override values of one', () => {
      expect(methods.getIn(merged, ['a', 'x'])).toEqual(2);
      expect(methods.getIn(merged, ['b', 'y'])).toEqual(5);
      expect(methods.getIn(merged, ['c', 'z'])).toEqual(3);
    });

    test('values in one that are not in two remain the same', () => {
      expect(methods.getIn(merged, ['a', 'y'])).toEqual(10);
      expect(methods.getIn(merged, ['b', 'x'])).toEqual(20);
    });

    const three = new Map({ a: { y: 44, z: 10 }, b: new Map({ x: new Map({ a: 420 }) }), c: new Map({ z: 3 }) });
    const mergedTwo = methods.mergeDeep(one, three);

    test('mergedTwo returns new map with correct size', () => {
      expect(mergedTwo).toBeInstanceOf(Map);
      expect(mergedTwo.size).toBe(3);
    });

    test('values of three override values of one', () => {
      expect(methods.getIn(mergedTwo, ['a', 'y'])).toEqual(44);
      expect(methods.getIn(mergedTwo, ['a', 'z'])).toEqual(10);
      expect(methods.getIn(mergedTwo, ['b', 'x', 'a'])).toEqual(420);
      expect(methods.getIn(mergedTwo, ['c', 'z'])).toEqual(3);
    });

    test('values in one that are not in two remain the same', () => {
      expect(methods.getIn(mergedTwo, ['a', 'x'])).toEqual(10);
      expect(methods.getIn(mergedTwo, ['b', 'y'])).toEqual(50);
    });
  });

  describe('mergeDeepIn', () => {
    describe('List', () => {
      const list1 = new List([1, 2, { x: [3, { y: [4, { z: 'value' }] }] }]);
      const list2 = new List([1, { z: 'string' }]);
      const merged = methods.mergeDeepIn(list1, [2, 'x', 1, 'y'], list2);

      test('merged returns new List with correct size', () => {
        expect(merged).toBeInstanceOf(List);
        expect(merged.size).toBe(3);
      });

      test('merges correct values', () => {
        expect(methods.getIn(merged, [2, 'x', 1, 'y'])).toEqual([4, { z: 'value' }, 1, { z: 'string' }]);
      });
    });

    describe('Map', () => {
      const map1 = new Map({ x: [1, 2, new Map({ y: [{ z: 'value' }] })], b: 'b' });
      const map2 = new Map({ a: { abc: 'abc' } });
      const merged = methods.mergeDeepIn(map1, ['x', 2, 'y'], map2);

      test('returns new Map with correct size', () => {
        expect(merged).toBeInstanceOf(Map);
        expect(merged.size).toBe(2);
      });

      test('merges correct values', () => {
        expect(methods.getIn(merged, ['x', 2, 'y'])).toEqual([{ z: 'value' }, ['a', { abc: 'abc' }]]);
      });
    });
  });

  describe('mergeIn', () => {
    describe('List', () => {
      const list1 = new List([1, 2, { x: [3, { y: [4, { z: 'value' }] }] }]);
      const list2 = new List([1, { z: 'string' }]);
      const merged = methods.mergeIn(list1, [2, 'x', 1, 'y'], list2);

      test('merged returns new List with correct size', () => {
        expect(merged).toBeInstanceOf(List);
        expect(merged.size).toBe(3);
      });

      test('merges correct values', () => {
        expect(methods.getIn(merged, [2, 'x', 1, 'y'])).toEqual([4, { z: 'value' }, 1, { z: 'string' }]);
      });
    });

    describe('Map', () => {
      const map1 = new Map({ x: [1, 2, new Map({ y: [{ z: 'value' }] })], b: 'b' });
      const map2 = new Map({ a: { abc: 'abc' } });
      const merged = methods.mergeIn(map1, ['x', 2, 'y'], map2);

      test('returns new Map with correct size', () => {
        expect(merged).toBeInstanceOf(Map);
        expect(merged.size).toBe(2);
      });

      test('merges correct values', () => {
        expect(methods.getIn(merged, ['x', 2, 'y'])).toEqual([{ z: 'value' }, ['a', { abc: 'abc' }]]);
      });
    });
  });

  describe('pop', () => {
    const list = new List([1, 2, 3, 4, 5]);
    const list1 = methods.pop(list);
    const list2 = methods.pop(list1);
    const list3 = methods.pop(list2);
    const list4 = methods.pop(list3);

    test('returns new List with correct size', () => {
      expect(list1).toBeInstanceOf(List);
      expect(list2).toBeInstanceOf(List);
      expect(list3).toBeInstanceOf(List);
      expect(list4).toBeInstanceOf(List);
      expect(list1.size).toBe(4);
      expect(list2.size).toBe(3);
      expect(list3.size).toBe(2);
      expect(list4.size).toBe(1);
    });

    test('each list has correct values', () => {
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
      expect(list.get(3)).toBe(4);
      expect(list.get(4)).toBe(5);
      expect(list1.get(4)).toBe(undefined);
      expect(list2.get(3)).toBe(undefined);
      expect(list3.get(2)).toBe(undefined);
      expect(list4.get(1)).toBe(undefined);
    });
  });

  describe('push', () => {
    const list = new List([0]);
    const list1 = methods.push(list, 1);
    const list2 = methods.push(list1, 2);

    test('returns a new List with correct size', () => {
      expect(list1).toBeInstanceOf(List);
      expect(list2).toBeInstanceOf(List);
      expect(list1.size).toBe(2);
      expect(list2.size).toBe(3);
    });

    test('lists has correct values', () => {
      expect(list.get(0)).toBe(0);
      expect(list1.get(1)).toBe(1);
      expect(list2.get(2)).toBe(2);
    });
  });

  describe('remove Map', () => {
    const map = new Map({ x: 'x', y: 'y', z: 'z' });
    const map1 = methods.remove(map, 'x');
    const map2 = methods.remove(map, 'y');
    const map3 = methods.remove(map, 'z');

    test('returns new map with correct size', () => {
      expect(map1).toBeInstanceOf(Map);
      expect(map2).toBeInstanceOf(Map);
      expect(map3).toBeInstanceOf(Map);
      expect(map1.size).toBe(2);
      expect(map2.size).toBe(2);
      expect(map3.size).toBe(2);
    });

    test('removes correct values', () => {
      expect(map1.get('x')).toBe(undefined);
      expect(map2.get('y')).toBe(undefined);
      expect(map3.get('z')).toBe(undefined);
    });
  });

  describe('removeIn', () => {
    describe('List', () => {
      const list = new List([1, 2, 3, { x: [3, 4, 5] }]);
      const list1 = methods.removeIn(list, [3, 'x', 2]);
      const list2 = methods.removeIn(list, [3, 'x', 0]);

      test('returns new List with correct size', () => {
        expect(list1).toBeInstanceOf(List);
        expect(list1.size).toBe(4);
        expect(list2).toBeInstanceOf(List);
        expect(list2.size).toBe(4);
      });

      test('removed correct value', () => {
        expect(methods.getIn(list, [3, 'x', 2])).toBe(5);
        expect(methods.getIn(list, [3, 'x', 1])).toBe(4);
        expect(methods.getIn(list, [3, 'x', 0])).toBe(3);
        expect(methods.getIn(list1, [3, 'x', 2])).toBe(undefined);
        expect(methods.getIn(list2, [3, 'x', 2])).toBe(undefined);
        expect(methods.getIn(list2, [3, 'x', 1])).toBe(5);
        expect(methods.getIn(list2, [3, 'x', 0])).toBe(4);
      });
    });

    describe('Map', () => {
      const map = new Map({ x: { y: new Map({ z: 'value', a: 'string' }) } });
      const map1 = methods.removeIn(map, ['x', 'y', 'z']);
      const map2 = methods.removeIn(map, ['x', 'y', 'a']);

      test('returns new Map with correct size', () => {
        expect(map1).toBeInstanceOf(Map);
        expect(map2).toBeInstanceOf(Map);
        expect(map1.size).toBe(1);
        expect(map2.size).toBe(1);
      });

      test('removed correct values', () => {
        expect(methods.getIn(map, ['x', 'y', 'z'])).toEqual('value');
        expect(methods.getIn(map, ['x', 'y', 'a'])).toEqual('string');
        expect(methods.getIn(map1, ['x', 'y', 'z'])).toBe(undefined);
        expect(methods.getIn(map2, ['x', 'y', 'a'])).toBe(undefined);
      });
    });

    describe('mixed Map and List', () => {
      const list = new List([1, new Map({ x: new List([new Map({ z: 'value', y: 'string' })]) })]);
      const list1 = methods.removeIn(list, [1, 'x', 0, 'z']);
      const list2 = methods.removeIn(list, [1, 'x', 0, 'y']);

      test('returns new List with correct size', () => {
        expect(list1).toBeInstanceOf(List);
        expect(list1.size).toBe(2);
        expect(list2).toBeInstanceOf(List);
        expect(list2.size).toBe(2);
      });

      test('removed correct value', () => {
        expect(methods.getIn(list, [1, 'x', 0, 'z'])).toEqual('value');
        expect(methods.getIn(list, [1, 'x', 0, 'y'])).toEqual('string');
        expect(methods.getIn(list1, [1, 'x', 0, 'z'])).toBe(undefined);
        expect(methods.getIn(list2, [1, 'x', 0, 'y'])).toBe(undefined);
      });
    });
  });

  describe('set', () => {
    describe('List', () => {
      const list = new List();
      const list1 = methods.set(list, 0, 'value');
      const list2 = methods.set(list, 0, new Map({ x: 'x' }));
      const list3 = methods.set(list, 2, 100);

      test('returns new List with correct size', () => {
        expect(list).toBeInstanceOf(List);
        expect(list1).toBeInstanceOf(List);
        expect(list2).toBeInstanceOf(List);
        expect(list3).toBeInstanceOf(List);
        expect(list.size).toBe(0);
        expect(list1.size).toBe(1);
        expect(list2.size).toBe(1);
        expect(list3.size).toBe(3);
      });

      test('set correct values', () => {
        expect(list.get(0)).toBe(undefined);
        expect(list1.get(0)).toEqual('value');
        expect(list2.get(0)).toEqual(new Map({ x: 'x' }));
        expect(list3.get(0)).toBe(undefined);
        expect(list3.get(1)).toBe(undefined);
        expect(list3.get(2)).toBe(100);
      });
    });

    describe('Map', () => {
      const map = new Map();
      const map1 = methods.set(map, 'x', 'value');
      const map2 = methods.set(map, 'y', new List([1]));
      const map3 = methods.set(map, 'z', new Map({ x: 'y' }));
    });
  });
});
