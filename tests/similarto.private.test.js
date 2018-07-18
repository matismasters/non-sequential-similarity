const publicSubjectModule = require('../src/similarto');
const subjectModule = publicSubjectModule.private;

const runSimpleTest = (
  subjectModule,
  methodName,
  paramsAndExpectedResults,
  expectationMethod
) => {
  describe(`#${methodName}`, () => {
    const testMethod = (param, expectedResult) => {
      test(
        `when ${JSON.stringify(param)}
        should return ${JSON.stringify(expectedResult)}`,
        expectationMethod(subjectModule, methodName, param, expectedResult)
      );
    };

    paramsAndExpectedResults.forEach((pair) => {
      testMethod(pair.param, pair.expectedResult);
    });
  });
};

const simpleExpectation = (subjectModule, methodName, param, expectedResult) =>
  () => expect(subjectModule[methodName](param)).toEqual(expectedResult);

const simpleExpectationWithMultipleParams =
  (subjectModule, methodName, param, expectedResult) =>
    () => expect(subjectModule[methodName](...param)).toEqual(expectedResult);

describe('Similarity.private', () => {
  runSimpleTest(subjectModule, 'arrayToDuplicatesCountHash', [
      { param: 'aba', expectedResult: { a: 2, b: 1 } },
      { param: '', expectedResult: {} },
      { param: 'aaabbbaaa', expectedResult: { a: 6, b: 3 } },
      { param: '@@@!!!###', expectedResult: { '@': 3, '!': 3, '#': 3 } },
      { param: 'aá', expectedResult: { a: 1, 'á': 1 } },
    ], (subjectModule, methodName, param, expectedResult) => () => {
      expect(
        subjectModule.arrayToDuplicatesCountHash(
          subjectModule.stringToCharsArray(param)
        )
      ).toEqual(expectedResult);
    }
  );

  runSimpleTest(subjectModule, 'isUndefined', [
      { param: undefined, expectedResult: true },
      { param: '', expectedResult: false },
      { param: null, expectedResult: false },
      { param: 1, expectedResult: false },
    ], simpleExpectation
  );

  runSimpleTest(subjectModule, 'isNull', [
      { param: null, expectedResult: true },
      { param: undefined, expectedResult: false },
      { param: '', expectedResult: false },
      { param: 1, expectedResult: false },
    ], simpleExpectation
  );

  runSimpleTest(subjectModule, 'isPresent', [
      { param: null, expectedResult: false },
      { param: undefined, expectedResult: false },
      { param: '', expectedResult: true },
      { param: 1, expectedResult: true },
    ], simpleExpectation
  );

  runSimpleTest(subjectModule, 'stringToCharsArray', [
      { param: 'asdf', expectedResult: ['a', 's', 'd', 'f'] },
      { param: '', expectedResult: [] },
      { param: 123, expectedResult: ['1', '2', '3'] },
    ], simpleExpectation
  );

  runSimpleTest(subjectModule, 'stringifyObject', [
      { param: 'asdf', expectedResult: 'asdf' },
      { param: 123, expectedResult: '123' },
    ], simpleExpectation
  );

  runSimpleTest(subjectModule, 'hashesToKeysArray', [
      { param: [{ a: 1, b: 1 }, { c: 1 }], expectedResult: ['a', 'b', 'c'] },
      { param: [{ a: 1, b: 1 }], expectedResult: ['a', 'b'] },
      { param: [{}], expectedResult: [] },
    ], simpleExpectation
  );

  runSimpleTest(subjectModule, 'isCollision', [
      { param: [{ a: 1 }, { a: 1 }, 'a'], expectedResult: true },
      { param: [{ a: 1 }, { a: 1 }, 'a'], expectedResult: true },
      { param: [{ a: 1 }, { a: 1 }, 'a'], expectedResult: true },
      { param: [{ a: 1 }, { b: 1 }, 'a'], expectedResult: false },
      { param: [{ b: 1 }, { a: 1 }, 'a'], expectedResult: false },
      { param: [{ b: 1 }, {}, 'a'], expectedResult: false },
      { param: [{}, { a: 1 }, 'a'], expectedResult: false },
    ], simpleExpectationWithMultipleParams
  );

  runSimpleTest(subjectModule, 'substractAbsolute', [
      { param: [2, 1], expectedResult: 1 },
      { param: [1, 2], expectedResult: 1 },
      { param: [0, 0], expectedResult: 0 },
    ], simpleExpectationWithMultipleParams
  );

  runSimpleTest(subjectModule, 'mergeDuplicatesCountSubstracting', [
      { param: [{ a: 2, b: 2 }, { a: 1, c: 2 }], expectedResult: { a: 1, b: 2, c: 2 } },
      { param: [{ a: 2 }, { a: 2 }], expectedResult: { a: 0 } },
      { param: [{ a: 2 }, {}], expectedResult: { a: 2 } },
      { param: [{}, { a: 1 }], expectedResult: { a: 1 } },
    ], simpleExpectationWithMultipleParams
  );

  runSimpleTest(subjectModule, 'sumHashValues', [
      { param: { a: 2, c: 5 }, expectedResult: 7 },
      { param: { a: 2, b: -2 }, expectedResult: 0 },
      { param: { a: 2 }, expectedResult: 2 },
      { param: {}, expectedResult: 0 },
    ], simpleExpectation
  );
});

describe('Similarity.public', () => {
  runSimpleTest(publicSubjectModule, 'similarityRate', [
      { param: ['abba', 'abba'], expectedResult: 0 },
      { param: ['abba', 'abbe'], expectedResult: 2 / 3 },
      { param: ['abba', 'ccde'], expectedResult: 1.6 },
      { param: ['$1000', '1000'], expectedResult: 1 / 3 },
      { param: ['Rosario', 'Rosaro'], expectedResult: 1 / 6 },
    ], simpleExpectationWithMultipleParams
  );

});
