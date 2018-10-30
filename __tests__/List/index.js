import List from '../../List';

describe('index', () => {
  const list = List();

  test('returns new list with all correct prototypes', () => {
    expect(list.clear).toBeTruthy();
    expect(list.concat).toBeTruthy();
    expect(list.delete).toBeTruthy();
    expect(list.deleteIn).toBeTruthy();
    expect(list.get).toBeTruthy();
    expect(list.getIn).toBeTruthy();
    expect(list.hashCode).toBeTruthy();
    expect(list.includes).toBeTruthy();
    expect(list.insert).toBeTruthy();
    expect(list.merge).toBeTruthy();
    expect(list.mergeDeepIn).toBeTruthy();
    expect(list.mergeIn).toBeTruthy();
    expect(list.pop).toBeTruthy();
    expect(list.push).toBeTruthy();
    expect(list.set).toBeTruthy();
    expect(list.setIn).toBeTruthy();
    expect(list.shift).toBeTruthy();
    expect(list.splice).toBeTruthy();
    expect(list.toJS).toBeTruthy();
    expect(list.unshift).toBeTruthy();
    expect(list.update).toBeTruthy();
    expect(list.updateIn).toBeTruthy();
    expect(list.withMutations).toBeTruthy();
  });
});
