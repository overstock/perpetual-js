import * as methods from '../../src/_methods';
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
});
