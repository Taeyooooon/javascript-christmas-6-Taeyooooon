import { ERROR } from '../src/constant/constant.js';
import Menu from '../src/model/Menu.js';

describe('Menu 클래스 테스트', () => {
  describe('유효성 검사 통과 테스트', () => {
    const input = '해산물파스타-2,레드와인-1,초코케이크-1';
    const menu = new Menu(input);
    const expectedList = [
      { name: '해산물파스타', count: 2, category: 'main', price: 35000 },
      { name: '레드와인', count: 1, category: 'beverage', price: 60000 },
      { name: '초코케이크', count: 1, category: 'dessert', price: 15000 },
    ];
    const expectedTotalPrice = 145000;

    test('메뉴 리스트를 반환한다.', () => {
      expect(menu.menuList).toEqual(expectedList);
    });

    test('메뉴 총 가격을 반환한다.', () => {
      expect(menu.totalPrice).toBe(expectedTotalPrice);
    });
  });

  describe('요효성 검사 실패 테스트', () => {
    const testCases = [
      { menuInput: '존재하지않는메뉴-10', expectedError: ERROR.order },
      { menuInput: '레드와인-10,초코케이크-abc', expectedError: ERROR.order },
      { menuInput: '레드와인-0.1,초코케이크-10', expectedError: ERROR.order },
      { menuInput: '레드와인-1,초코케이크-1,초코케이크-1', expectedError: ERROR.orderDuplicate },
      { menuInput: '레드와인-1,제로콜라-10', expectedError: ERROR.onlyBeverage },
      { menuInput: '레드와인-999,티본스테이크-10', expectedError: ERROR.order },
    ];

    test.each(testCases)(
      '예외 테스트 menuInput: $menuInput, toThrow: $expectedError',
      ({ menuInput, expectedError }) => {
        expect(() => new Menu(menuInput)).toThrow(expectedError);
      },
    );
  });
});
