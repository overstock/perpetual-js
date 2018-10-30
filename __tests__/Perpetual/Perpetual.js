import * as Perpetual from '../../Perpetual';
import List from '../../List';
import Map from '../../Map';

describe('Perpetual', () => {
  const str = 'xyz';
  const obj = { x: str };
  const arr = [1, 2, 3, 4];
  const list = List(arr);
  const map = Map(obj);

  describe('isList', () => {
    test('if is list returns true', () => {
      expect(Perpetual.isList(list)).toBeTruthy();
    });

    test('if it is not a list returns false', () => {
      expect(Perpetual.isList(str)).toBeFalsy();
      expect(Perpetual.isList(obj)).toBeFalsy();
      expect(Perpetual.isList(arr)).toBeFalsy();
      expect(Perpetual.isList(map)).toBeFalsy();
    });
  });

  describe('isMap', () => {
    test('if is map returns true', () => {
      expect(Perpetual.isMap(map)).toBeTruthy();
    });

    test('if is not a map returns false', () => {
      expect(Perpetual.isMap(str)).toBeFalsy();
      expect(Perpetual.isMap(obj)).toBeFalsy();
      expect(Perpetual.isMap(arr)).toBeFalsy();
      expect(Perpetual.isMap(list)).toBeFalsy();
    });
  });

  describe('isPerpetual', () => {
    test('if is list or map returns true', () => {
      expect(Perpetual.isPerpetual(list)).toBeTruthy();
      expect(Perpetual.isPerpetual(map)).toBeTruthy();
    });

    test('if it is not a list or map returns false', () => {
      expect(Perpetual.isPerpetual(str)).toBeFalsy();
      expect(Perpetual.isPerpetual(obj)).toBeFalsy();
      expect(Perpetual.isPerpetual(arr)).toBeFalsy();
    });
  });
});
