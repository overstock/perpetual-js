import Map from '../../src/Map';

describe('Map index', () => {
  const map = Map();

  test('Map has all correct prototype properties', () => {
    expect(map.getIn).toBeTruthy();
    expect(map.hashCode).toBeTruthy();
    expect(map.hasIn).toBeTruthy();
    expect(map.merge).toBeTruthy();
    expect(map.mergeDeep).toBeTruthy();
    expect(map.mergeDeepIn).toBeTruthy();
    expect(map.mergeIn).toBeTruthy();
    expect(map.delete).toBeTruthy();
    expect(map.deleteIn).toBeTruthy();
    expect(map.setIn).toBeTruthy();
    expect(map.toJS).toBeTruthy();
    expect(map.update).toBeTruthy();
    expect(map.updateIn).toBeTruthy();
    expect(map.withMutations).toBeTruthy();
  });
});
