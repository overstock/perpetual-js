import * as Map from '../../src/Map/Map';
import { NOT_SET } from '../../src/_methods/utils/TrieUtils';

describe('Map', () => {
  describe('default', () => {
    const map = new Map.default({ x: 'x' });
    const map1 = new Map.default({ x: 'x', y: 'y' });

    test('returns new map with correct size', () => {
      expect(map).toBeInstanceOf(Map.default);
      expect(map1).toBeInstanceOf(Map.default);
      expect(map.size).toBe(1);
      expect(map1.size).toBe(2);
    });

    test('get', () => {
      expect(map.get('x')).toEqual('x');
      expect(map.get('y')).toBeUndefined();
      expect(map1.get('x')).toEqual('x');
      expect(map1.get('y')).toEqual('y');
    });

    test('has', () => {
      expect(map.has('x')).toBeTruthy();
      expect(map.has('y')).toBeFalsy();
      expect(map1.has('x')).toBeTruthy();
      expect(map1.has('y')).toBeTruthy();
    });

    describe('set', () => {
      const nMap = map.set('z', 'z');
      const nMap1 = map1.set('z', 'z');

      test('returns new Map with updated size', () => {
        expect(nMap).toBeInstanceOf(Map.default);
        expect(nMap1).toBeInstanceOf(Map.default);
        expect(nMap.size).toBe(2);
        expect(nMap1.size).toBe(3);
      });

      test('sets correct values', () => {
        expect(nMap.get('z')).toEqual('z');
        expect(nMap.get('x')).toEqual('x');
        expect(nMap.get('y')).toBeUndefined();
        expect(nMap1.get('x')).toEqual('x');
        expect(nMap1.get('y')).toEqual('y');
        expect(nMap1.get('z')).toEqual('z');
      });
    });

    describe('remove', () => {
      const rMap = map.remove('x');
      const rMap1 = map1.remove('x');
      const rMap2 = map.remove('y');

      test('returns new Map with updated size', () => {
        expect(rMap).toBeInstanceOf(Map.default);
        expect(rMap1).toBeInstanceOf(Map.default);
        expect(rMap2).toBeInstanceOf(Map.default);
        expect(rMap.size).toBe(0);
        expect(rMap1.size).toBe(1);
        expect(rMap2.size).toBe(1);
      });

      test('removes correct value', () => {
        expect(rMap.get('x')).toBeUndefined();
        expect(rMap1.get('x')).toBeUndefined();
        expect(rMap2.get('y')).toBeUndefined();
      });
    });

    describe('reduce', () => {
      const reduced = map.reduce(
        (total, [key, value]) => total.set(key, value + value),
        new Map.default()
      );
      const reduced1 = map1.reduce(
        (total, [key, value]) => ({ ...total, [key]: value }),
        {}
      );

      test('returns new value', () => {
        expect(reduced).toBeInstanceOf(Map.default);
        expect(reduced1).toBeInstanceOf(Object);
      });

      test('new values are correct', () => {
        expect(reduced.get('x')).toEqual('xx');
        expect(reduced1.x).toEqual('x');
        expect(reduced1.y).toEqual('y');
      });
    });
  });

  describe('ArrayMapNode', () => {
    const mapNode = new Map.ArrayMapNode([['x', 'xyz']]);

    test('retuns this.entries and is frozen', () => {
      expect(mapNode).toBeInstanceOf(Map.ArrayMapNode);
      expect(mapNode.entries).toBeInstanceOf(Array);
      expect(Object.isFrozen(mapNode.entries)).toBeTruthy();
    });

    test('get returns the correct value', () => {
      expect(mapNode.get('x')).toEqual('xyz');
    });

    describe('update', () => {
      const mapNode1 = mapNode.update('y', 'yz', { value: true });
      const mapNode2 = mapNode.update('y', NOT_SET, { value: true });

      test('update returns new map with correct size', () => {
        expect(mapNode1).toBeInstanceOf(Map.ArrayMapNode);
        expect(mapNode1.entries).toHaveLength(2);
        expect(mapNode2).toBeInstanceOf(Map.ArrayMapNode);
        expect(mapNode2.entries).toHaveLength(1);
      });

      test('returns correct value', () => {
        expect(mapNode1.get('y')).toEqual('yz');
        expect(mapNode2.get('y')).toBeUndefined();
      });
    });
  });

  describe('emptyMap', () => {
    const map = Map.emptyMap();
    const map1 = Map.emptyMap();

    test('returns new Empty Map with size of 0', () => {
      expect(map).toBeInstanceOf(Map.default);
      expect(map1).toBeInstanceOf(Map.default);
      expect(map.size).toBe(0);
      expect(map1.size).toBe(0);
    });
  });

  describe('makeMap', () => {
    const map = Map.makeMap(2, new Map.ArrayMapNode([['x', 'x'], ['y', 'y']]));
    const map1 = Map.makeMap(1, new Map.ArrayMapNode([['x', 'y']]));

    test('creates new Map with correct size', () => {
      expect(map).toBeInstanceOf(Map.default);
      expect(map1).toBeInstanceOf(Map.default);
      expect(map.size).toBe(2);
      expect(map1.size).toBe(1);
    });

    test('returns correct value', () => {
      expect(map.get('x')).toEqual('x');
      expect(map.get('y')).toEqual('y');
      expect(map1.get('x')).toEqual('y');
    });
  });

  describe('createNewMap', () => {
    const map = Map.createNewMap({ x: 'xyz' });

    test('throws error if value is not of type object', () => {
      expect(() => { Map.createNewMap('string'); }).toThrow(Error);
    });

    test('returns new Map with correct size', () => {
      expect(map).toBeInstanceOf(Map.default);
      expect(map.size).toBe(1);
    });

    test('returns correct value', () => {
      expect(map.get('x')).toEqual('xyz');
    });
  });

  describe('updateMap', () => {
    const map = Map.createNewMap({ x: 'xyz', y: 'yz', z: 'zyx' });
    const map1 = Map.updateMap(map, 'x', 'value');
    const map2 = Map.updateMap(map, 'a', 'abc');
    const map3 = Map.updateMap(map, 'z', NOT_SET);

    test('returns new Map with correct size', () => {
      expect(map).toBeInstanceOf(Map.default);
      expect(map1).toBeInstanceOf(Map.default);
      expect(map2).toBeInstanceOf(Map.default);
      expect(map3).toBeInstanceOf(Map.default);
      expect(map.size).toBe(3);
      expect(map1.size).toBe(3);
      expect(map2.size).toBe(4);
      expect(map3.size).toBe(2);
    });

    test('returns correct values', () => {
      expect(map.get('z')).toEqual('zyx');
      expect(map.get('x')).toEqual('xyz');
      expect(map1.get('x')).toEqual('value');
      expect(map2.get('a')).toEqual('abc');
      expect(map3.get('z')).toBeUndefined();
    });
  });
});
