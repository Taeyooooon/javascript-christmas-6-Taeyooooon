import Utils from '../src/utils/Utils.js';

describe('Util.js 테스트', () => {
  describe('deepFreeze 테스트', () => {
    const frozenObj = Utils.deepFreeze({
      test1: 'value1',
      test2: {
        test3: 'value2',
      },
    });

    test('1depth 수정 시 예외처리 ', () => {
      expect(() => {
        frozenObj.prop1 = '수정 시도';
      }).toThrow();
    });

    test('2depth 수정 시 예외처리 ', () => {
      expect(() => {
        frozenObj.prop2.prop3 = '수정 시도';
      }).toThrow();
    });
  });

  describe('numberToKoreanWon 테스트', () => {
    test('숫자를 받으면 한국 원 단위로 변환한다.', () => {
      expect(Utils.numberToKoreanWon(10_000)).toBe('10,000원');
    });
  });

  describe('getDayOfWeek 테스트', () => {
    test('2023년 12월 방문일을 입력받으면 해당 요일을 반환한다.', () => {
      expect(Utils.getDayOfWeek(1)).toBe('금');
      expect(Utils.getDayOfWeek(25)).toBe('월');
      expect(Utils.getDayOfWeek(31)).toBe('일');
    });
  });

  describe('getWeekdayOrWeekend 테스트', () => {
    test('2023년 12월 방문일을 입력받으면 "주말" 또는 "평일" 을 반환한다.', () => {
      // 주말 금,토
      // 평일 금,토 를 제외한 모든 요일
      expect(Utils.getWeekdayOrWeekend(1)).toBe('주말');
      expect(Utils.getWeekdayOrWeekend(30)).toBe('주말');
      expect(Utils.getWeekdayOrWeekend(25)).toBe('평일');
      expect(Utils.getWeekdayOrWeekend(31)).toBe('평일');
    });
  });
});
