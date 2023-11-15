import Event from '../src/model/Event.js';
import Menu from '../src/model/Menu.js';

describe('Event 클래스 테스트', () => {
  describe('적용된 이벤트가 하나도 없는 경우', () => {
    let event;

    beforeEach(() => {
      const visitDate = '26';
      const orderedMenu = new Menu('타파스-1,제로콜라-1'); // 총합 만원 아래
      event = new Event(visitDate, orderedMenu);
    });

    test('getEventBenefits 이 빈 배열을 반환한다.', () => {
      const expected = [];
      expect(event.getEventBenefits()).toEqual(expected);
    });

    test('getIsZeroDiscount 가 true를 반환한다. ', () => {
      expect(event.getIsZeroDiscount()).toBe(true);
    });

    test('getTotalDiscountPrice 가 0 을 반환한다. ', () => {
      expect(event.getTotalDiscountPrice()).toBe(0);
    });
  });

  describe('적용된 이벤트가 있는 경우', () => {
    let event;

    beforeEach(() => {
      const visitDate = '3';
      const orderedMenu = new Menu('티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1');
      event = new Event(visitDate, orderedMenu);
    });

    test('getEventBenefits 이벤트 혜택 내역을 반환한다.', () => {
      const expected = [
        { eventName: '크리스마스 디데이 할인', discountValue: 1200 },
        { eventName: '평일 할인', discountValue: 4046 },
        { eventName: '주말 할인', discountValue: 0 },
        { eventName: '특별 할인', discountValue: 1000 },
        { eventName: '증정 이벤트', discountValue: 25000 },
      ];

      expect(event.getEventBenefits()).toEqual(expected);
    });

    test('getIsZeroDiscount 가 false를 반환한다.', () => {
      expect(event.getIsZeroDiscount()).toBe(false);
    });

    test('getTotalDiscountPrice 가 올바른 값을 반환한다.', () => {
      expect(event.getTotalDiscountPrice()).toBe(31246);
    });

    test('getExpectedPrice 가 올바른 값을 반환한다.', () => {
      expect(event.getExpectedPrice()).toBe(135754);
    });

    test('getXmasDdayDiscount 가 올바른 값을 반환한다.', () => {
      expect(event.getXmasDdayDiscount()).toBe(1200);
    });

    test('getWeekdayDiscount 가 올바른 값을 반환한다.', () => {
      expect(event.getWeekdayDiscount()).toBe(4046);
    });

    test('getWeekendDiscount 가 올바른 값을 반환한다.', () => {
      expect(event.getWeekendDiscount()).toBe(0);
    });

    test('getEventBadge 가 올바른 값을 반환한다. ', () => {
      expect(event.getEventBadge()).toBe('산타');
    });

    test('getHasGiveAway 가 true 를 반환한다.', () => {
      expect(event.getHasGiveAway()).toBe(true);
    });
  });

  describe('이벤트 뱃지 테스트', () => {
    const visitDate = '26';
    const orderedMenu = new Menu('타파스-1,제로콜라-1');
    const event = new Event(visitDate, orderedMenu);

    test('산타를 반환한다 ', () => {
      jest.spyOn(event, 'getTotalDiscountPrice').mockReturnValue(20000);
      expect(event.getEventBadge()).toBe('산타');
    });

    test('트리를 반환한다 ', () => {
      jest.spyOn(event, 'getTotalDiscountPrice').mockReturnValue(10000);
      expect(event.getEventBadge()).toBe('트리');
    });

    test('별을 반환한다 ', () => {
      jest.spyOn(event, 'getTotalDiscountPrice').mockReturnValue(5000);
      expect(event.getEventBadge()).toBe('별');
    });

    test('없음을 반환한다 ', () => {
      jest.spyOn(event, 'getTotalDiscountPrice').mockReturnValue(1000);
      expect(event.getEventBadge()).toBe('없음');
    });
  });

  describe('getXmasDdayDiscount 테스트', () => {
    test('26일~ 이후 크리스마스 디데이 이벤트를 적용하지 않는다.', () => {
      const visitDate = '26';
      const orderedMenu = new Menu('타파스-1,제로콜라-1');
      const event = new Event(visitDate, orderedMenu);

      expect(event.getXmasDdayDiscount()).toBe(0);
    });

    test('1~25일까지 크리스마스 디데이 이벤트를 적용한다', () => {
      const visitDate = '1';
      const orderedMenu = new Menu('타파스-1,제로콜라-1');
      const event = new Event(visitDate, orderedMenu);

      expect(event.getXmasDdayDiscount()).toBe(1000);
    });
  });
});
