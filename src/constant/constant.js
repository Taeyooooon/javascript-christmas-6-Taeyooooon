import Utils from '../utils/Utils.js';

export const MESSAGE = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
});

export const PROMPT = Object.freeze({
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menu: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const ERROR_PREFIX = '[ERROR]';

export const ERROR = Object.freeze({
  visitDate: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  order: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  orderDuplicate: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  onlyBeverage: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
});

export const VALID_DATE_RANGE = Object.freeze({
  min: 1,
  max: 31,
});

export const EVENT_RULES = Utils.deepFreeze({
  maxOrder: 20,
  specialDay: ['3', '10', '17', '24', '25', '31'],
  xmasDiscountStartPrice: 1_000,
  xmasDiscountPerDay: 100,
  weekdayDiscount: 2_023,
  weekendDiscount: 2_023,
  specialDiscount: 1_000,
  giveAwayRequiredPrice: 120_000,
  giveAwayPrice: 25_000,
  minPriceForEvent: 10_000,
});

export const EVENT_BADGE = Object.freeze({
  santa: 20_000,
  tree: 10_000,
  star: 5_000,
});

export const MENU_LIST = Utils.deepFreeze({
  appetizer: [
    { name: '양송이수프', price: 6_000 },
    { name: '타파스', price: 5_500 },
    { name: '시저샐러드', price: 8_000 },
  ],
  main: [
    { name: '티본스테이크', price: 55_000 },
    { name: '바비큐립', price: 54_000 },
    { name: '해산물파스타', price: 35_000 },
    { name: '크리스마스파스타', price: 25_000 },
  ],
  dessert: [
    { name: '초코케이크', price: 15_000 },
    { name: '아이스크림', price: 5_000 },
  ],
  beverage: [
    { name: '제로콜라', price: 3_000 },
    { name: '레드와인', price: 60_000 },
    { name: '샴페인', price: 25_000 },
  ],
});

export const SYMBOL = Object.freeze({
  menuDivider: ',',
  menuNameAndCountDivider: '-',
});
