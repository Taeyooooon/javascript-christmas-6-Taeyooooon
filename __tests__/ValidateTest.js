import { ERROR } from '../src/constant/constant.js';
import Validate from '../src/utils/Validate.js';

describe('Validate.js 테스트', () => {
  const testCases = [
    { value: -3, expected: false },
    { value: 0, expected: false },
    { value: 'abc', expected: false },
    { value: 1.5, expected: false },
    { value: 5, expected: true },
  ];

  test.each(testCases)('isPositiveInteger($value) 테스트, expected: $expected', ({ value, expected }) => {
    expect(Validate.isPositiveInteger(value)).toBe(expected);
  });

  test('isEmpty 테스트', () => {
    expect(Validate.isEmpty('')).toBe(true);
    expect(Validate.isEmpty('abc')).toBe(false);
  });

  test('isInvalidDateRange 테스트', () => {
    expect(Validate.isInValidDateRange(99)).toBe(true);
    expect(Validate.isInValidDateRange(25)).toBe(false);
  });

  test('checkDate 테스트', () => {
    expect(() => Validate.checkDate(-1)).toThrow(ERROR.visitDate);
    expect(() => Validate.checkDate('abc')).toThrow(ERROR.visitDate);
    expect(() => Validate.checkDate(0.1)).toThrow(ERROR.visitDate);
    expect(() => Validate.checkDate(99)).toThrow(ERROR.visitDate);
    expect(() => Validate.checkDate(5)).not.toThrowError(ERROR.visitDate);
  });
});
