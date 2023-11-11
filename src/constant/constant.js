import Utils from '../utils/Utils.js';

export const MESSAGE = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
});

export const PROMPT = Object.freeze({
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menu: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const ERROR_PREFIX = '[ERROR]';

export const ERROR = {
  visitDate: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  order: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
};

export const VALID_DATE_RANGE = Object.freeze({
  min: 1,
  max: 31,
});

export const EVENT_RULES = Utils.deepFreeze({
  maxOrder: 20,
  specialDay: ['3', '10', '17', '24', '25', '31'],
  xmasDiscountStartPrice: 1000,
  xmasDiscountPerDay: 100,
  weekdayDiscount: 2023,
  weekendDiscount: 2023,
  specialDiscount: 1000,
  giveAwayRequiredPrice: 120000,
  giveAwayPrice: 25000,
});

export const MENU_LIST = Utils.deepFreeze({
  appetizer: [
    { name: '양송이수프', price: 6000 },
    { name: '타파스', price: 5500 },
    { name: '시저샐러드', price: 8000 },
  ],
  main: [
    { name: '티본스테이크', price: 55000 },
    { name: '바비큐립', price: 54000 },
    { name: '해산물파스타', price: 35000 },
    { name: '크리스마스파스타', price: 25000 },
  ],
  dessert: [
    { name: '초코케이크', price: 15000 },
    { name: '아이스크림', price: 5000 },
  ],
  beverage: [
    { name: '제로콜라', price: 3000 },
    { name: '레드와인', price: 60000 },
    { name: '샴페인', price: 25000 },
  ],
});
