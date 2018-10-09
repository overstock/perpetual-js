import * as functions from '../functions';

describe('functions', () => {
  describe('isObject', () => {
    test('if is object returns true', () => {
      const value = { test: 'test' };
      expect(functions.isObject(value)).toBeTruthy();
    });

    test('if is Array returns true', () => {
      const value = [['test', 'test']];
      expect(functions.isObject(value)).toBeTruthy();
    });

    test('if is string returns false', () => {
      const value = 'test';
      expect(functions.isObject(value)).toBeFalsy();
    });

    test('if value is function returns false', () => {
      const value = () => {};
      expect(functions.isObject(value)).toBeFalsy();
    });
  });

  describe('isArray', () => {
    test('returns true if is Array', () => {
      const value = [['test', 'test']];
      expect(functions.isArray(value)).toBeTruthy();
    });

    test('returns false if not an array', () => {
      const value = { test: 'test' };
      expect(functions.isArray(value)).toBeFalsy();
    });
  });

  test('frozen object should not change', () => {
    const object = { test: 'test' };
    const frozenObject = functions.freeze(object);
    expect(frozenObject).toEqual(object);
  });

  describe('objectToArray', () => {
    const array = [['test', 'testing']];

    test('returns an array when passed an array', () => {
      expect(functions.objectToArray(array)).toEqual(array);
    });

    test('returns array when passed object', () => {
      const obj = { test: 'testing' };
      expect(functions.objectToArray(obj)).toEqual(array);
    });
  });
});
