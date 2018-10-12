import * as utils from '../../src/_methods/utils';
import Map from '../../src/Map';

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

  // describe('is', () => {
  //   test('array equals array', () => {
  //     const obj = { test: 'test' };
  //     const map1 = Map(obj);
  //     const map2 = Map(obj);
  //     expect(utils.is(map1, map2)).toBeTruthy();
  //   });
  // });
});
