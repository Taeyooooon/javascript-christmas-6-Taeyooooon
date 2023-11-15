import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/constant.js';
import Utils from '../utils/Utils.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  printGreeting() {
    OutputView.print(MESSAGE.greeting);
  },

  printHeader(visitDate) {
    OutputView.print(`12월 ${visitDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },

  printOrderedMenuList(menuList) {
    OutputView.print('\n<주문 메뉴>');
    menuList.forEach(({ name, count }) => {
      OutputView.print(`${name} ${count}개`);
    });
  },

  printTotalPriceBeforeDiscount(totalPrice) {
    OutputView.print('\n<할인 전 총주문 금액>');
    OutputView.print(Utils.numberToKoreanWon(totalPrice));
  },

  printGiveAway(hasGiveAway) {
    OutputView.print('\n<증정 메뉴>');
    OutputView.print(hasGiveAway ? '샴페인 1개' : '없음');
  },

  printDiscountDetail(eventResult) {
    OutputView.print('\n<혜택 내역>');
    if (eventResult.getIsZeroDiscount()) {
      OutputView.print('없음');
      return;
    }

    eventResult.getEventBenefits().forEach(({ eventName, discountValue }) => {
      if (discountValue) {
        OutputView.print(`${eventName}: -${Utils.numberToKoreanWon(discountValue)}`);
      }
    });
  },

  printTotalDiscountPrice(totalDiscountPrice) {
    OutputView.print('\n<총혜택 금액>');
    OutputView.print(`${totalDiscountPrice ? `-${Utils.numberToKoreanWon(totalDiscountPrice)}` : '없음'}`);
  },

  printExpectedPrice(expectedPrice) {
    OutputView.print('\n<할인 후 예상 결제 금액>');
    OutputView.print(Utils.numberToKoreanWon(expectedPrice));
  },

  printEventBadge(eventBadge) {
    OutputView.print('\n<12월 이벤트 배지>');
    OutputView.print(eventBadge);
  },
};

export default OutputView;
