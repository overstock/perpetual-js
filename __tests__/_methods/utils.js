import * as utils from '../../src/_methods/utils';
import Map from '../../src/Map';
import List from '../../src/List';

describe('utils', () => {
  test('arrCopy returns copy of array when passed arr', () => {
    const arr = [1, 2, 3, { x: 'x' }];
    const result = utils.arrCopy(arr);
    expect(result).toEqual(arr);
    expect(result).toHaveLength(4);
  });

  test('Object.freeze', () => {
    const obj = { test: 'test' };
    const result = utils.freeze(obj);
    expect(result).toEqual(obj);
    expect(Object.isFrozen(result)).toBeTruthy();
  });

  test('hasOwnProperty', () => {
    const obj = { test: 'test' };
    const result = utils.hasOwnProperty.call(obj, 'test');
    const falseResult = utils.hasOwnProperty.call(obj, 'unknown');
    expect(result).toBeTruthy();
    expect(falseResult).toBeFalsy();
  });

  describe('isDataStructure', () => {
    const { isDataStructure } = utils;

    test('returns true is value is object', () => {
      expect(isDataStructure({})).toBeTruthy();
    });

    test('returns true if is array', () => {
      expect(isDataStructure([])).toBeTruthy();
    });

    test('return true if is List', () => {
      expect(isDataStructure(List())).toBeTruthy();
    });

    test('returns true if is Map', () => {
      expect(isDataStructure(Map())).toBeTruthy();
    });

    test('returns false if is not a data-structure', () => {
      expect(isDataStructure(654)).toBeFalsy();
      expect(isDataStructure('string')).toBeFalsy();
      expect(isDataStructure(false)).toBeFalsy();
      expect(isDataStructure(true)).toBeFalsy();
      expect(isDataStructure(undefined)).toBeFalsy();
      expect(isDataStructure(null)).toBeFalsy();
    });
  });

  describe('isPlainObject', () => {
    const { isPlainObject } = utils;

    test('returns true if is object', () => {
      expect(isPlainObject({})).toBeTruthy();
    });

    test('returns false if is not object', () => {
      expect(isPlainObject([])).toBeFalsy();
      expect(isPlainObject(Map())).toBeFalsy();
      expect(isPlainObject(List())).toBeFalsy();
      expect(isPlainObject(654)).toBeFalsy();
      expect(isPlainObject('string')).toBeFalsy();
      expect(isPlainObject(false)).toBeFalsy();
      expect(isPlainObject(true)).toBeFalsy();
      expect(isPlainObject(undefined)).toBeFalsy();
      expect(isPlainObject(null)).toBeFalsy();
    });
  });
});
