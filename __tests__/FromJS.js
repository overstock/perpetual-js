import FromJS from '../src/FromJS';
import Map from '../src/Map';
import List from '../src/List';

describe('FromJS', () => {
  describe('object to map', () => {
    const obj = {
      x: 'xyz',
      y: {
        z: 'value',
        x: 'string'
      },
      z: {
        a: {
          b: 'bc',
          c: {
            x: 'y',
            z: 'xyx',
            y: {
              a: 'abc',
              c: {
                d: 'dad',
                m: 'mom',
                g: {
                  x: 'new'
                }
              }
            }
          }
        }
      }
    };
    const fromJSObj = FromJS(obj);

    test('returns map with all values', () => {
      expect(fromJSObj).toMatchSnapshot();
    });
  });

  describe('array to List', () => {
    const arr = [
      1, 2, 3, [
        1, 2, 3, [
          1, 2, 3, [
            1, 2, 3, [
              1, 2, 3, [
                4, 5, 6, [
                  7, 8, 9, [
                    0
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ];
    const fromJSArr = FromJS(arr);

    test('retuns list with all values', () => {
      expect(fromJSArr).toMatchSnapshot();
    });
  });

  describe('array and object to Perpetual', () => {
    const data = [
      1, 2, 3, {
        x: 'xyz',
        y: [
          1, 2, 3, [
            1, 2, 3
          ]
        ],
        z: {
          a: 'abc',
          b: {
            c: [
              1, 2, 3, {
                d: [
                  4, 5, 6, {
                    e: [
                      7, 8, 9, [
                        0
                      ]
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      [4, 5, 6]
    ];
    const fromJSData = FromJS(data);

    test('collection of Map and List containing correct values', () => {
      expect(fromJSData).toMatchSnapshot();
    });
  });
});
