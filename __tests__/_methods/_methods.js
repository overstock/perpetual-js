import * as methods from '../../_methods';
import * as hashCode from '../../_methods/hashCode';
import List from '../../List/List';
import Map from '../../Map/Map';

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
      expect(list.tail).toBeUndefined();
      expect(list._hashCode).toBeUndefined();
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
      expect(four.get(4)).toBeUndefined();
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
        expect(methods.get(list, 5)).toBeUndefined();
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
        expect(methods.get(map, 'z')).toBeUndefined();
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
        expect(methods.getIn(list, [0, 4])).toBeUndefined();
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
        expect(methods.getIn(map, ['y', 5, 'w'])).toBeUndefined();
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
        expect(methods.getIn(mapList, ['map', 'b', 3])).toBeUndefined();
        expect(methods.getIn(mapList, ['list', 4, 'list'], 'value')).toBe(
          'value',
        );
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
        expect(map._hashCode).toBeUndefined();
        expect(list._hashCode).toBeUndefined();
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
            z: 'a',
          },
        },
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
    const list1 = new List([]);

    test('returns true if value is included', () => {
      expect(methods.includes(list, 'value')).toBe(true);
      expect(methods.includes(list, 3)).toBe(true);
      expect(methods.includes(list, 'string')).toBe(true);
    });

    test('returns false if list is empty', () => {
      expect(methods.includes(list1, 'value')).toBe(false);
      expect(methods.includes(list1, 1)).toBe(false);
      expect(methods.includes(list1, true)).toBe(false);
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

  describe('map', () => {
    describe('Map', () => {
      const map = new Map({ x: 1, z: 'z', a: 5 });
      const map1 = methods.map(map, x => x + x);
      const map2 = methods.map(map, (x, y) => y + x);
      const map3 = methods.map(map, (x, y) => x == y);

      test('returns new map with correct size', () => {
        expect(map).toBeInstanceOf(Map);
        expect(map1).toBeInstanceOf(Map);
        expect(map2).toBeInstanceOf(Map);
        expect(map3).toBeInstanceOf(Map);
        expect(map.size).toBe(3);
        expect(map1.size).toBe(3);
        expect(map2.size).toBe(3);
        expect(map3.size).toBe(3);
      });

      test('adds value to itself map1', () => {
        expect(map1.get('x')).toBe(2);
        expect(map1.get('z')).toEqual('zz');
        expect(map1.get('a')).toBe(10);
      });

      test('adds value to key, map2', () => {
        expect(map2.get('x')).toEqual('x1');
        expect(map2.get('z')).toEqual('zz');
        expect(map2.get('a')).toEqual('a5');
      });

      test('returns true if value equals key', () => {
        expect(map3.get('x')).toBeFalsy();
        expect(map3.get('z')).toBeTruthy();
        expect(map3.get('a')).toBeFalsy();
      });
    });

    describe('List', () => {
      const list = new List([0, 2, 2, 4, 4]);
      const list1 = methods.map(list, x => x + x);
      const list2 = methods.map(list, (x, y) => x + y);
      const list3 = methods.map(list, (x, y) => x == y);

      test('returns new list with correct size', () => {
        expect(list).toBeInstanceOf(List);
        expect(list1).toBeInstanceOf(List);
        expect(list2).toBeInstanceOf(List);
        expect(list3).toBeInstanceOf(List);
        expect(list.size).toBe(5);
        expect(list1.size).toBe(5);
        expect(list2.size).toBe(5);
        expect(list3.size).toBe(5);
      });

      test('adds value to itself list1', () => {
        expect(list1.get(0)).toBe(0);
        expect(list1.get(1)).toBe(4);
        expect(list1.get(2)).toBe(4);
        expect(list1.get(3)).toBe(8);
        expect(list1.get(4)).toBe(8);
      });

      test('adds key to value list2', () => {
        expect(list2.get(0)).toBe(0);
        expect(list2.get(1)).toBe(3);
        expect(list2.get(2)).toBe(4);
        expect(list2.get(3)).toBe(7);
        expect(list2.get(4)).toBe(8);
      });

      test('returns true if index equals value', () => {
        expect(list3.get(0)).toBeTruthy();
        expect(list3.get(1)).toBeFalsy();
        expect(list3.get(2)).toBeTruthy();
        expect(list3.get(3)).toBeFalsy();
        expect(list3.get(4)).toBeTruthy();
      });
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
      const mergedMap = methods.merge(
        map1,
        map2,
        mapObj,
        mapArr,
        mapList,
        mapMap,
      );

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
      const mergedList = methods.merge(
        list1,
        list2,
        listObj,
        listArr,
        listMap,
        listList,
      );

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
    const one = new Map({
      a: new Map({ x: 10, y: 10 }),
      b: new Map({ x: 20, y: 50 }),
    });
    const two = new Map({
      a: new Map({ x: 2 }),
      b: new Map({ y: 5 }),
      c: new Map({ z: 3 }),
    });
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

    const three = new Map({
      a: { y: 44, z: 10 },
      b: new Map({ x: new Map({ a: 420 }) }),
      c: new Map({ z: 3 }),
    });
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
        expect(methods.getIn(merged, [2, 'x', 1, 'y'])).toEqual([
          4,
          { z: 'value' },
          1,
          { z: 'string' },
        ]);
      });
    });

    describe('Map', () => {
      const map1 = new Map({
        x: [1, 2, new Map({ y: [{ z: 'value' }] })],
        b: 'b',
      });
      const map2 = new Map({ a: { abc: 'abc' } });
      const merged = methods.mergeDeepIn(map1, ['x', 2, 'y'], map2);

      test('returns new Map with correct size', () => {
        expect(merged).toBeInstanceOf(Map);
        expect(merged.size).toBe(2);
      });

      test('merges correct values', () => {
        expect(methods.getIn(merged, ['x', 2, 'y'])).toEqual([
          { z: 'value' },
          ['a', { abc: 'abc' }],
        ]);
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
        expect(methods.getIn(merged, [2, 'x', 1, 'y'])).toEqual([
          4,
          { z: 'value' },
          1,
          { z: 'string' },
        ]);
      });
    });

    describe('Map', () => {
      const map1 = new Map({
        x: [1, 2, new Map({ y: [{ z: 'value' }] })],
        b: 'b',
      });
      const map2 = new Map({ a: { abc: 'abc' } });
      const merged = methods.mergeIn(map1, ['x', 2, 'y'], map2);

      test('returns new Map with correct size', () => {
        expect(merged).toBeInstanceOf(Map);
        expect(merged.size).toBe(2);
      });

      test('merges correct values', () => {
        expect(methods.getIn(merged, ['x', 2, 'y'])).toEqual([
          { z: 'value' },
          ['a', { abc: 'abc' }],
        ]);
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
      expect(list1.get(4)).toBeUndefined();
      expect(list2.get(3)).toBeUndefined();
      expect(list3.get(2)).toBeUndefined();
      expect(list4.get(1)).toBeUndefined();
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
      expect(map1.get('x')).toBeUndefined();
      expect(map2.get('y')).toBeUndefined();
      expect(map3.get('z')).toBeUndefined();
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
        expect(methods.getIn(list1, [3, 'x', 2])).toBeUndefined();
        expect(methods.getIn(list2, [3, 'x', 2])).toBeUndefined();
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
        expect(methods.getIn(map1, ['x', 'y', 'z'])).toBeUndefined();
        expect(methods.getIn(map2, ['x', 'y', 'a'])).toBeUndefined();
      });
    });

    describe('mixed Map and List', () => {
      const list = new List([
        1,
        new Map({ x: new List([new Map({ z: 'value', y: 'string' })]) }),
      ]);
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
        expect(methods.getIn(list1, [1, 'x', 0, 'z'])).toBeUndefined();
        expect(methods.getIn(list2, [1, 'x', 0, 'y'])).toBeUndefined();
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
        expect(list.get(0)).toBeUndefined();
        expect(list1.get(0)).toEqual('value');
        expect(list2.get(0)).toEqual(new Map({ x: 'x' }));
        expect(list3.get(0)).toBeUndefined();
        expect(list3.get(1)).toBeUndefined();
        expect(list3.get(2)).toBe(100);
      });
    });

    describe('Map', () => {
      const map = new Map();
      const map1 = methods.set(map, 'x', 'value');
      const map2 = methods.set(map, 'y', new List([1]));
      const map3 = methods.set(map2, 'z', new Map({ x: 'y' }));

      test('returns new Map with correct size', () => {
        expect(map).toBeInstanceOf(Map);
        expect(map1).toBeInstanceOf(Map);
        expect(map2).toBeInstanceOf(Map);
        expect(map3).toBeInstanceOf(Map);
        expect(map.size).toBe(0);
        expect(map1.size).toBe(1);
        expect(map2.size).toBe(1);
        expect(map3.size).toBe(2);
      });

      test('sets correct values', () => {
        expect(map.get('x')).toBeUndefined();
        expect(map1.get('x')).toEqual('value');
        expect(map2.get('x')).toBeUndefined();
        expect(map2.get('y')).toEqual(new List([1]));
        expect(map3.get('x')).toBeUndefined();
        expect(map3.get('y')).toEqual(new List([1]));
        expect(map3.get('z')).toEqual(new Map({ x: 'y' }));
      });
    });

    describe('objects and arrays', () => {
      const obj = {};
      const obj1 = methods.set(obj, 'x', 'value');
      const obj2 = methods.set(obj, 'y', new List([1]));
      const obj3 = methods.set(obj2, 'z', new Map({ x: 'y' }));
      const arr = [];
      const arr1 = methods.set(arr, 0, 'key');
      const arr2 = methods.set(arr, 0, new List([1]));
      const arr3 = methods.set(arr2, 1, new Map({ x: 'y' }));

      test('returns new collection with correct size', () => {
        expect(obj).toBeInstanceOf(Object);
        expect(obj1).toBeInstanceOf(Object);
        expect(obj2).toBeInstanceOf(Object);
        expect(obj3).toBeInstanceOf(Object);
        expect(arr).toBeInstanceOf(Array);
        expect(arr1).toBeInstanceOf(Array);
        expect(arr2).toBeInstanceOf(Array);
        expect(arr3).toBeInstanceOf(Array);
        expect(Object.keys(obj)).toHaveLength(0);
        expect(Object.keys(obj1)).toHaveLength(1);
        expect(Object.keys(obj2)).toHaveLength(1);
        expect(Object.keys(obj3)).toHaveLength(2);
        expect(arr).toHaveLength(0);
        expect(arr1).toHaveLength(1);
        expect(arr2).toHaveLength(1);
        expect(arr3).toHaveLength(2);
      });

      test('has correct values', () => {
        expect(obj.x).toBeUndefined();
        expect(obj1.x).toEqual('value');
        expect(obj2.y).toEqual(new List([1]));
        expect(obj3.y).toEqual(new List([1]));
        expect(obj3.z).toEqual(new Map({ x: 'y' }));
        expect(arr[0]).toBeUndefined();
        expect(arr1[0]).toEqual('key');
        expect(arr2[0]).toEqual(new List([1]));
        expect(arr3[0]).toEqual(new List([1]));
        expect(arr3[1]).toEqual(new Map({ x: 'y' }));
      });
    });
  });

  describe('setIn', () => {
    describe('Map', () => {
      const map = new Map({ x: {} });
      const map1 = methods.setIn(map, ['x', 'y'], 'value');
      const map2 = methods.setIn(map, ['y', 'x'], new List([1]));
      const map3 = methods.setIn(map2, ['y', 'z', 'a'], new Map({ x: 'y' }));

      test('returns new Map with correct size', () => {
        expect(map).toBeInstanceOf(Map);
        expect(map1).toBeInstanceOf(Map);
        expect(map2).toBeInstanceOf(Map);
        expect(map3).toBeInstanceOf(Map);
        expect(map.size).toBe(1);
        expect(map1.size).toBe(1);
        expect(map2.size).toBe(2);
        expect(map3.size).toBe(2);
      });

      test('sets correct values', () => {
        expect(methods.getIn(map, ['x', 'y'])).toBeUndefined();
        expect(methods.getIn(map1, ['x', 'y'])).toEqual('value');
        expect(methods.getIn(map2, ['y', 'x'])).toEqual(new List([1]));
        expect(methods.getIn(map3, ['y', 'x'])).toEqual(new List([1]));
        expect(methods.getIn(map3, ['y', 'z', 'a'])).toEqual(
          new Map({ x: 'y' }),
        );
      });
    });

    describe('List', () => {
      const list = new List([{}]);
      const list1 = methods.setIn(list, [0, 'x', 0], 'value');
      const list2 = methods.setIn(list, [0, 'x'], new List([1]));
      const list3 = methods.setIn(list2, [1, 'y'], new Map({ x: 'y' }));

      test('returns new List with correct size', () => {
        expect(list).toBeInstanceOf(List);
        expect(list1).toBeInstanceOf(List);
        expect(list2).toBeInstanceOf(List);
        expect(list3).toBeInstanceOf(List);
        expect(list.size).toBe(1);
        expect(list1.size).toBe(1);
        expect(list2.size).toBe(1);
        expect(list3.size).toBe(2);
      });

      test('sets correct values', () => {
        expect(methods.getIn(list, [0, 'x', 0])).toBeUndefined();
        expect(methods.getIn(list1, [0, 'x', 0])).toEqual('value');
        expect(methods.getIn(list2, [0, 'x'])).toEqual(new List([1]));
        expect(methods.getIn(list3, [0, 'x'])).toEqual(new List([1]));
        expect(methods.getIn(list3, [1, 'y'])).toEqual(new Map({ x: 'y' }));
      });
    });

    describe('objects and arrays', () => {
      const obj = {};
      const obj1 = methods.setIn(obj, ['x', 'y'], 'value');
      const obj2 = methods.setIn(obj, ['y', 'x'], new List([1]));
      const obj3 = methods.setIn(obj2, ['z', 'x'], new Map({ x: 'y' }));
      const arr = [];
      const arr1 = methods.setIn(arr, [0, 'y'], 'key');
      const arr2 = methods.setIn(arr, [0, 0], new List([1]));
      const arr3 = methods.setIn(arr2, [1, 0], new Map({ x: 'y' }));

      test('returns new collection, with correct size', () => {
        expect(obj).toBeInstanceOf(Object);
        expect(obj1).toBeInstanceOf(Object);
        expect(obj2).toBeInstanceOf(Object);
        expect(obj3).toBeInstanceOf(Object);
        expect(arr).toBeInstanceOf(Array);
        expect(arr1).toBeInstanceOf(Array);
        expect(arr2).toBeInstanceOf(Array);
        expect(arr3).toBeInstanceOf(Array);
        expect(Object.keys(obj)).toHaveLength(0);
        expect(Object.keys(obj1)).toHaveLength(1);
        expect(Object.keys(obj2)).toHaveLength(1);
        expect(Object.keys(obj3)).toHaveLength(2);
        expect(arr).toHaveLength(0);
        expect(arr1).toHaveLength(1);
        expect(arr2).toHaveLength(1);
        expect(arr3).toHaveLength(2);
      });

      test('sets correct value', () => {
        expect(methods.getIn(obj, ['x', 'y'])).toBeUndefined();
        expect(methods.getIn(obj1, ['x', 'y'])).toEqual('value');
        expect(methods.getIn(obj2, ['y', 'x'])).toEqual(new List([1]));
        expect(methods.getIn(obj3, ['y', 'x'])).toEqual(new List([1]));
        expect(methods.getIn(obj3, ['z', 'x'])).toEqual(new Map({ x: 'y' }));
        expect(methods.getIn(arr, [0, 'y'])).toBeUndefined();
        expect(methods.getIn(arr1, [0, 'y'])).toEqual('key');
        expect(methods.getIn(arr2, [0, 0])).toEqual(new List([1]));
        expect(methods.getIn(arr3, [0, 0])).toEqual(new List([1]));
        expect(methods.getIn(arr3, [1, 0])).toEqual(new Map({ x: 'y' }));
      });
    });
  });

  describe('shift', () => {
    const list = new List([0, 1, 2, 3, 4, 5]);
    const list1 = methods.shift(list);
    const list2 = methods.shift(list1);
    const list3 = methods.shift(list2);
    const list4 = methods.shift(list3);
    const list5 = methods.shift(list4);
    const list6 = methods.shift(list5);

    test('returns new List with correct size', () => {
      expect(list).toBeInstanceOf(List);
      expect(list1).toBeInstanceOf(List);
      expect(list2).toBeInstanceOf(List);
      expect(list3).toBeInstanceOf(List);
      expect(list4).toBeInstanceOf(List);
      expect(list5).toBeInstanceOf(List);
      expect(list6).toBeInstanceOf(List);
      expect(list.size).toBe(6);
      expect(list1.size).toBe(5);
      expect(list2.size).toBe(4);
      expect(list3.size).toBe(3);
      expect(list4.size).toBe(2);
      expect(list5.size).toBe(1);
      expect(list6.size).toBe(0);
    });
  });

  describe('splice', () => {
    const list = new List([
      1,
      2,
      { x: 'y' },
      [1],
      new Map({ x: 'y' }),
      new List([1, 2]),
    ]);
    // inserting
    const list1 = methods.splice(
      list,
      0 /* index */,
      0 /* deleteCount */,
      'value',
    );
    const list2 = methods.splice(list, 7, 0, 'value', 'string');
    // deleting
    const list3 = methods.splice(list, 0, 1, 'value');
    const list4 = methods.splice(list, 0, 2, 'value');

    test('returns new List with correct size', () => {
      expect(list).toBeInstanceOf(List);
      expect(list1).toBeInstanceOf(List);
      expect(list2).toBeInstanceOf(List);
      expect(list3).toBeInstanceOf(List);
      expect(list4).toBeInstanceOf(List);
      expect(list.size).toBe(6);
      expect(list1.size).toBe(7);
      expect(list2.size).toBe(8);
      expect(list3.size).toBe(6);
      expect(list4.size).toBe(5);
    });

    test('returns correct values', () => {
      expect(list.get(0)).toBe(1);
      expect(list1.get(0)).toEqual('value');
      expect(list1.get(1)).toEqual(1);
      expect(list2.get(6)).toEqual('value');
      expect(list2.get(7)).toEqual('string');
      expect(list3.get(0)).toEqual('value');
      expect(list3.get(1)).toEqual(2);
      expect(list4.get(0)).toEqual('value');
      expect(list4.get(1)).toEqual({ x: 'y' });
    });
  });

  describe('toJS', () => {
    describe('Map', () => {
      const map = new Map({
        x: 'x',
        y: new Map({ abc: 'abc' }),
        z: new Map({
          cba: new Map({ xyz: new Map({ xy: 'xy' }) }),
          qwerty: new Map({ ytrewq: 'ytrewq' }),
        }),
      });

      const toJSMap = methods.toJS(map);

      const obj = {
        x: 'x',
        y: { abc: 'abc' },
        z: {
          cba: { xyz: { xy: 'xy' } },
          qwerty: { ytrewq: 'ytrewq' },
        },
      };

      test('returns object with all correct properties', () => {
        expect(map).toBeInstanceOf(Map);
        expect(toJSMap).not.toBeInstanceOf(Map);
        expect(map).not.toEqual(obj);
        expect(toJSMap).toEqual(obj);
        expect(toJSMap).toMatchSnapshot();
      });
    });

    describe('List', () => {
      const list = new List([
        1,
        2,
        new List([1, 2, new List([1, 2]), new List([1, new List([1]), 3])]),
      ]);

      const toJSList = methods.toJS(list);

      const arr = [1, 2, [1, 2, [1, 2], [1, [1], 3]]];

      test('returns arr with all correct properties', () => {
        expect(list).toBeInstanceOf(List);
        expect(toJSList).not.toBeInstanceOf(List);
        expect(list).not.toEqual(arr);
        expect(toJSList).toEqual(arr);
        expect(toJSList).toMatchSnapshot();
      });
    });

    describe('List and Map', () => {
      const collection = new Map({
        x: new List([
          1,
          2,
          3,
          new Map({
            y: new Map({
              z: new List([new Map({ x: 'value' })]),
              a: new Map({ z: new List([1, 2, 3]) }),
            }),
          }),
          4,
          5,
          new List([
            1,
            2,
            new List([4, 5, new Map(), new List([1, 2, new Map({ x: 'x' })])]),
          ]),
        ]),
        y: new Map({
          z: new List([2, new Map({ q: new List() })]),
        }),
      });

      const toJSCollection = methods.toJS(collection);

      const jsCol = {
        x: [
          1,
          2,
          3,
          {
            y: {
              z: [{ x: 'value' }],
              a: { z: [1, 2, 3] },
            },
          },
          4,
          5,
          [1, 2, [4, 5, {}, [1, 2, { x: 'x' }]]],
        ],
        y: {
          z: [2, { q: [] }],
        },
      };

      test('returns obj with correct properties', () => {
        expect(collection).toBeInstanceOf(Map);
        expect(toJSCollection).not.toBeInstanceOf(Map);
        expect(collection).not.toEqual(jsCol);
        expect(toJSCollection).toEqual(jsCol);
        expect(toJSCollection).toMatchSnapshot();
      });
    });
  });

  describe('toMethod', () => {
    const func = (...args) => args;
    const func1 = bool => !bool;
    const func2 = (num1, num2) => num1 + num2;
    const func3 = arr => arr.filter();

    test('returns function that accepts args', () => {
      expect(methods.toMethod(func)).toBeInstanceOf(Function);
      expect(methods.toMethod(func1)).toBeInstanceOf(Function);
      expect(methods.toMethod(func2)).toBeInstanceOf(Function);
      expect(methods.toMethod(func3)).toBeInstanceOf(Function);
    });
  });

  describe('unshift', () => {
    const list = new List([1, 2, 3, 4, 5]);
    const list1 = methods.unshift(list, 'value');
    const list2 = methods.unshift(list, 'value', 'string');
    const list3 = methods.unshift(list2, 'new Value');

    test('returns new List with correct size', () => {
      expect(list).toBeInstanceOf(List);
      expect(list1).toBeInstanceOf(List);
      expect(list2).toBeInstanceOf(List);
      expect(list3).toBeInstanceOf(List);
      expect(list.size).toBe(5);
      expect(list1.size).toBe(6);
      expect(list2.size).toBe(7);
      expect(list3.size).toBe(8);
    });

    test('unshifts correct values', () => {
      expect(list.get(0)).toEqual(1);
      expect(list1.get(0)).toEqual('value');
      expect(list1.get(1)).toEqual(1);
      expect(list2.get(0)).toEqual('value');
      expect(list2.get(1)).toEqual('string');
      expect(list2.get(2)).toEqual(1);
      expect(list3.get(0)).toEqual('new Value');
      expect(list3.get(1)).toEqual('value');
      expect(list3.get(2)).toEqual('string');
      expect(list3.get(3)).toEqual(1);
    });
  });

  describe('update', () => {
    describe('Map', () => {
      const map = new Map({ x: 'y', z: 'x' });
      // 2 arguments performs updater on entire map
      const map1 = methods.update(map, m => {
        const value = m.get('x');
        return m.set('s', value);
      });
      // 3 arguments performs updater only on key
      const map2 = methods.update(map, 'x', key => key + key);
      const map3 = methods.update(map, 'y', () => 'z');
      // 4 arguments uses not set value
      const map4 = methods.update(map, 'y', 'value', key => `new ${key}`);

      test('returns new Map with correct size', () => {
        expect(map).toBeInstanceOf(Map);
        expect(map1).toBeInstanceOf(Map);
        expect(map2).toBeInstanceOf(Map);
        expect(map3).toBeInstanceOf(Map);
        expect(map4).toBeInstanceOf(Map);
        expect(map.size).toBe(2);
        expect(map1.size).toBe(3);
        expect(map2.size).toBe(2);
        expect(map3.size).toBe(3);
        expect(map4.size).toBe(3);
      });

      test('2 arguments updates entire map', () => {
        expect(map.get('s')).toBeUndefined();
        expect(map1.get('s')).toEqual('y');
      });

      test('3 arguments updated only key', () => {
        expect(map.get('x')).toEqual('y');
        expect(map.get('y')).toBeUndefined();
        expect(map2.get('x')).toEqual('yy');
        expect(map3.get('y')).toEqual('z');
      });

      test('4 arguments uses notSetValue', () => {
        expect(map.get('y')).toBeUndefined();
        expect(map4.get('y')).toEqual('new value');
      });
    });

    describe('List', () => {
      const list = new List(['pear', 'plum', 'apple', 'peach']);
      // 2 arguments performs updater on entire map
      const list1 = methods.update(list, m => {
        const value = m.get(0);
        return m.set(4, value);
      });
      // 3 arguments performs updater only on key
      const list2 = methods.update(list, 0, key => key + key);
      const list3 = methods.update(list, 4, () => 'z');
      // 4 arguments uses not set value
      const list4 = methods.update(list, 4, 'value', key => `new ${key}`);

      test('returns new List with correct sizes', () => {
        expect(list).toBeInstanceOf(List);
        expect(list1).toBeInstanceOf(List);
        expect(list2).toBeInstanceOf(List);
        expect(list3).toBeInstanceOf(List);
        expect(list4).toBeInstanceOf(List);
        expect(list.size).toBe(4);
        expect(list1.size).toBe(5);
        expect(list2.size).toBe(4);
        expect(list3.size).toBe(5);
        expect(list4.size).toBe(5);
      });

      test('2 arguments updates entire map', () => {
        expect(list.get(4)).toBeUndefined();
        expect(list1.get(4)).toEqual('pear');
      });

      test('3 arguments updated only key', () => {
        expect(list.get(4)).toBeUndefined();
        expect(list.get(0)).toEqual('pear');
        expect(list2.get(0)).toEqual('pearpear');
        expect(list3.get(4)).toEqual('z');
      });

      test('4 arguments uses notSetValue', () => {
        expect(list.get(4)).toBeUndefined();
        expect(list4.get(4)).toEqual('new value');
      });
    });
  });

  describe('updateIn', () => {
    describe('Map', () => {
      const map = new Map({
        x: new Map({ y: new List([1, 2, new Map({ z: 'x' })]) }),
      });
      // 3 arguments 3rd is updater
      const map1 = methods.updateIn(map, ['x', 'y'], val =>
        methods.push(val, 12),);
      const map2 = methods.updateIn(map, ['x', 'y', 2, 'z'], val => val + val);
      // 4 arguments 3rd is notSetValue, 4th is updater
      const map3 = methods.updateIn(map, ['y'], 'value', val => `new ${val}`);

      test('returns new Map with correct size', () => {
        expect(map).toBeInstanceOf(Map);
        expect(map1).toBeInstanceOf(Map);
        expect(map2).toBeInstanceOf(Map);
        expect(map3).toBeInstanceOf(Map);
        expect(map.size).toBe(1);
        expect(map1.size).toBe(1);
        expect(map2.size).toBe(1);
        expect(map3.size).toBe(2);
      });

      test('3 arguments 3rd is updater', () => {
        expect(methods.getIn(map, ['x', 'y', 3])).toBeUndefined();
        expect(methods.getIn(map1, ['x', 'y', 3])).toBe(12);
        expect(methods.getIn(map, ['x', 'y', 2, 'z'])).toEqual('x');
        expect(methods.getIn(map2, ['x', 'y', 2, 'z'])).toEqual('xx');
      });

      test('4 args 3rd is notSet, 4th is updater', () => {
        expect(map.get('y')).toBeUndefined();
        expect(map3.get('y')).toEqual('new value');
      });
    });

    describe('List', () => {
      const list = new List([
        1,
        new Map({ y: new List([1, 2, new List([0, 1])]) }),
      ]);
      // 3 arguments 3rd is updater
      const list1 = methods.updateIn(list, [1, 'y'], val =>
        methods.push(val, 12),);
      const list2 = methods.updateIn(list, [1, 'y', 2, 1], val => val + val);
      // 4 arguments 3rd is notSetValue, 4th is updater
      const list3 = methods.updateIn(list, [2], 'value', val => `new ${val}`);

      test('returns new List with correct size', () => {
        expect(list).toBeInstanceOf(List);
        expect(list1).toBeInstanceOf(List);
        expect(list2).toBeInstanceOf(List);
        expect(list3).toBeInstanceOf(List);
        expect(list.size).toBe(2);
        expect(list1.size).toBe(2);
        expect(list2.size).toBe(2);
        expect(list3.size).toBe(3);
      });

      test('3 arguments 3rd is updater', () => {
        expect(methods.getIn(list, [1, 'y', 3])).toBeUndefined();
        expect(methods.getIn(list1, [1, 'y', 3])).toBe(12);
        expect(methods.getIn(list, [1, 'y', 2, 1])).toEqual(1);
        expect(methods.getIn(list2, [1, 'y', 2, 1])).toEqual(2);
      });

      test('4 args 3rd is notSet, 4th is updater', () => {
        expect(list.get(2)).toBeUndefined();
        expect(list3.get(2)).toEqual('new value');
      });
    });
  });
});
