import * as List from '../../src/List/List';
import { includes } from '../../src/_methods';

describe('List', () => {
  describe('List Class', () => {
    const list = new List.default();
    const list1 = new List.default([1]);
    const list2 = new List.default([1, 2]);
    const list3 = new List.default([1, 2, 3]);

    test('returns new List with correct size', () => {
      expect(list).toBeInstanceOf(List.default);
      expect(list1).toBeInstanceOf(List.default);
      expect(list2).toBeInstanceOf(List.default);
      expect(list3).toBeInstanceOf(List.default);
      expect(list.size).toBe(0);
      expect(list1.size).toBe(1);
      expect(list2.size).toBe(2);
      expect(list3.size).toBe(3);
    });

    test('has correct values', () => {
      expect(list.has(0)).toBeFalsy();
      expect(list1.has(1)).toBeFalsy();
      expect(list2.has(2)).toBeFalsy();
      expect(list3.has(3)).toBeFalsy();
      expect(list1.has(0)).toBeTruthy();
      expect(list2.has(1)).toBeTruthy();
      expect(list3.has(2)).toBeTruthy();
    });

    test('can get correct values', () => {
      expect(list.get(0)).toBeUndefined();
      expect(list1.get(1)).toBeUndefined();
      expect(list2.get(2)).toBeUndefined();
      expect(list3.get(3)).toBeUndefined();
      expect(list1.get(0)).toBe(1);
      expect(list2.get(1)).toBe(2);
      expect(list3.get(2)).toBe(3);
    });

    describe('set', () => {
      const nList = list.set(0, 'value');
      const nList1 = list1.set(0, 'value');
      const nList2 = list2.set(3, 'value');
      const nList3 = list3.set(2, 'value');

      test('returns new list with correct size', () => {
        expect(nList).toBeInstanceOf(List.default);
        expect(nList1).toBeInstanceOf(List.default);
        expect(nList2).toBeInstanceOf(List.default);
        expect(nList3).toBeInstanceOf(List.default);
        expect(nList.size).toBe(1);
        expect(nList1.size).toBe(1);
        expect(nList2.size).toBe(4);
        expect(nList3.size).toBe(3);
      });

      test('sets correct value', () => {
        expect(nList.get(0)).toEqual('value');
        expect(nList1.get(0)).toEqual('value');
        expect(nList1.get(1)).toBeUndefined();
        expect(nList2.get(1)).toEqual(2);
        expect(nList2.get(2)).toBeUndefined();
        expect(nList2.get(3)).toEqual('value');
        expect(nList3.get(0)).toEqual(1);
        expect(nList3.get(1)).toEqual(2);
        expect(nList3.get(2)).toEqual('value');
      });
    });

    describe('reduce', () => {
      const vlist = new List.default([1, 2, 3, 4, 1, 2]);
      const vlist1 = vlist.reduce(
        (total, value) => total.set(total.size, value * 2),
        new List.default()
      );
      const vlist2 = vlist.reduce(
        (total, value) => (includes(total, value) ? total : total.set(total.size, value)),
        new List.default()
      );
      const vlist3 = vlist.reduce(
        (total, value) => ({ ...total, [`name${value}`]: `kevin${value}` }),
        {}
      );

      test('returns new list with correct size', () => {
        expect(vlist).toBeInstanceOf(List.default);
        expect(vlist1).toBeInstanceOf(List.default);
        expect(vlist2).toBeInstanceOf(List.default);
        expect(vlist3).toBeInstanceOf(Object);
        expect(vlist.size).toBe(6);
        expect(vlist1.size).toBe(6);
        expect(vlist2.size).toBe(4);
        expect(Object.keys(vlist3)).toHaveLength(4);
      });

      test('returns correct values', () => {
        expect(vlist1.get(0)).toBe(2);
        expect(vlist1.get(2)).toBe(6);
        expect(vlist1.get(4)).toBe(2);
        expect(vlist2.get(0)).toBe(1);
        expect(vlist2.get(3)).toBe(4);
        expect(vlist2.get(4)).toBeUndefined();
        expect(vlist3.name1).toEqual('kevin1');
        expect(vlist3.name4).toEqual('kevin4');
      });
    });
  });

  describe('VNode', () => {
    const vNode = new List.VNode([1, 2, 3, 4]);
    const vNode1 = new List.VNode(['value']);

    test('gets correct value', () => {
      expect(vNode.get(0)).toBe(1);
      expect(vNode.get(2)).toBe(3);
      expect(vNode.get(3)).toBe(4);
      expect(vNode1.get(0)).toEqual('value');
      expect(vNode1.get(1)).toBeUndefined();
    });

    const vNode2 = vNode.reduce(
      (total, value) => [...total, value * 2],
      []
    );

    test('can reduce a VNode', () => {
      expect(vNode2).toBeInstanceOf(Array);
      expect(vNode2[0]).toBe(2);
      expect(vNode2[2]).toBe(6);
      expect(vNode2[3]).toBe(8);
    });
  });

  describe('makeList', () => {
    const list = List.makeList(0);
    const list1 = List.makeList(5, new List.VNode([1, 2, 3, 4, 5]));
    const list2 = List.makeList(3, new List.VNode(['a', 'b', 'c']));

    test('returns new list with correct size', () => {
      expect(list).toBeInstanceOf(List.default);
      expect(list1).toBeInstanceOf(List.default);
      expect(list2).toBeInstanceOf(List.default);
      expect(list.size).toBe(0);
      expect(list1.size).toBe(5);
      expect(list2.size).toBe(3);
    });

    test('has correct values', () => {
      expect(list.get(0)).toBeUndefined();
      expect(list1.get(0)).toBe(1);
      expect(list1.get(2)).toBe(3);
      expect(list1.get(4)).toBe(5);
      expect(list2.get(0)).toEqual('a');
      expect(list2.get(2)).toEqual('c');
      expect(list2.get(3)).toBeUndefined();
    });
  });

  describe('updateList', () => {
    const list = new List.default([1, 2, 3]);
    const list1 = List.updateList(list, 0, 'value');
    const list2 = List.updateList(list, NaN, 'value');
    const list4 = List.updateList(list, 10, 'value');

    test('throws error if index is less than 0', () => {
      expect(() => List.updateList(list, -1, 'value')).toThrow(SyntaxError);
    });

    test('returns same list if index is NaN', () => {
      expect(list2).toEqual(list);
    });

    test('returns new List with correct size', () => {
      expect(list).toBeInstanceOf(List.default);
      expect(list1).toBeInstanceOf(List.default);
      expect(list4).toBeInstanceOf(List.default);
      expect(list.size).toBe(3);
      expect(list1.size).toBe(3);
      expect(list4.size).toBe(11);
    });

    test('returns correct values', () => {
      expect(list.get(0)).toBe(1);
      expect(list1.get(0)).toEqual('value');
      expect(list4.get(0)).toEqual(1);
      expect(list4.get(3)).toBeUndefined();
      expect(list4.get(7)).toBeUndefined();
      expect(list4.get(10)).toEqual('value');
    });
  });

  describe('createNewTail', () => {
    const list = new List.default([1, 2, 3, 4]);
    const didAlter = { value: false };
    const didAlter1 = { value: false };
    const list1 = List.createNewTail(list, 0, 'value', didAlter);
    const list2 = List.createNewTail(list, 1, 2, didAlter1);

    test('returns new array with correct values', () => {
      expect(list1).toBeInstanceOf(Array);
      expect(list1[0]).toEqual('value');
      expect(didAlter.value).toBeTruthy();
    });

    test('returns undefined if value is the same', () => {
      expect(list2).toBeUndefined();
      expect(didAlter1.value).toBeFalsy();
    });
  });
});
