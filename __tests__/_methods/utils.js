import * as utils from '../../_methods/utils';
import * as trieUtils from '../../_methods/utils/TrieUtils';
import Map from '../../Map';
import List from '../../List';

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

  describe('objectToArray', () => {
    const { objectToArray } = utils;
    const obj = {
      x: 'x',
      y: 'y',
      z: 'z',
    };

    test('returns array of arrays with key value pairs', () => {
      const arr = [['x', 'x'], ['y', 'y'], ['z', 'z']];
      const wrongArr = [['x', 'y'], ['y', 'z'], ['z', 'x']];

      expect(objectToArray(obj)).toEqual(arr);
      expect(objectToArray(obj)).not.toEqual(wrongArr);
    });

    test('returns array if passed array', () => {
      const arr = ['value', 'difValue'];
      expect(objectToArray(arr)).toBe(arr);
    });

    test('returns frozen arr', () => {
      expect(Object.isFrozen(objectToArray(obj))).toBeTruthy();
    });
  });

  test('quoteString returns value as string', () => {
    const { quoteString } = utils;
    const isString = expect.any(String);

    expect(quoteString({ x: 'x' })).toEqual(isString);
    expect(quoteString(['value'])).toEqual(isString);
    expect(quoteString(7890)).toEqual(isString);
    expect(quoteString('value')).toEqual(isString);
    expect(quoteString(null)).toEqual(isString);
    expect(quoteString(undefined)).toEqual(isString);
  });

  describe('shallowCopy', () => {
    const { shallowCopy } = utils;

    test('returns copy of object', () => {
      const obj = { test: 'test' };
      expect(shallowCopy(obj)).toEqual(obj);
      expect(shallowCopy(obj)).not.toBe(obj);
    });

    test('returns copy of array', () => {
      const arr = ['x', 'y', 'z'];
      expect(shallowCopy(arr)).toEqual(arr);
      expect(shallowCopy(arr)).not.toBe(arr);
    });
  });

  describe('TrieUtils', () => {
    test('NOT_SET should be empty object', () => {
      expect(trieUtils.NOT_SET).toEqual({});
      expect(Object.keys(trieUtils.NOT_SET)).toHaveLength(0);
    });

    test('Shift should be 5', () => {
      expect(trieUtils.SHIFT).toEqual(5);
    });

    test('SIZE should be 32', () => {
      expect(trieUtils.SIZE).toEqual(32);
    });

    const ref = trieUtils.makeRef();
    test('makeRef should return { value: false }', () => {
      expect(ref).toEqual({ value: false });
      expect(ref.value).toBe(false);
    });

    test('setRef should change ref.value to true', () => {
      expect(ref.value).toBe(false);
      trieUtils.setRef(ref);
      expect(ref).toEqual({ value: true });
      expect(ref.value).toBe(true);
    });
  });
});
