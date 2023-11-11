import InputView from '../InputView.js';
import OutputView from '../OutputView.js';
import { ERROR } from '../constant/constant.js';
import Event from '../model/Event.js';
import Menu from '../model/Menu.js';
import Utils from '../utils/Utils.js';
import Validate from '../utils/Validate.js';

class XmasEvent {
  #visitDate;
  #menu;
  #eventResult;

  async startProcess() {
    OutputView.printGreeting();
    await this.#getVisitDate();
    await this.#getMenuList();
    this.#setEventResult();
    this.#printResult();
  }

  async #getVisitDate() {
    while (true) {
      const date = await InputView.readDate();
      try {
        this.#validateDate(date);
        this.#visitDate = date;
        break;
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  #validateDate(date) {
    if (!Validate.isPositiveInteger(date)) {
      throw new Error(ERROR.visitDate);
    }

    if (Validate.isInValidDateRange(date)) {
      throw new Error(ERROR.visitDate);
    }
  }

  async #getMenuList() {
    while (true) {
      const menus = await InputView.readMenu();
      try {
        this.#menu = new Menu(menus);
        break;
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  #setEventResult() {
    this.#eventResult = new Event(this.#visitDate, this.#menu);
  }

  #printResult() {
    this.#printHeader();
    this.#printOrderedMenu();
    this.#printTotalPriceBeforeDiscount();
    this.#printGiveAway();
    this.#printDiscountDetail();
  }

  #printHeader() {
    OutputView.print('12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!');
  }

  #printOrderedMenu() {
    OutputView.print('\n<주문메뉴>');
    this.#menu.getMenu().forEach(({ name, count }) => {
      OutputView.print(`${name} ${count}개`);
    });
  }

  #printTotalPriceBeforeDiscount() {
    OutputView.print('\n<할인 전 총주문 금액>');
    OutputView.print(Utils.numberToKoreanWon(this.#menu.getTotalPrice()));
  }

  #printGiveAway() {
    OutputView.print('\n<증정 메뉴>');
    OutputView.print(this.#eventResult.hasGiveAway() ? '샴페인 1개' : '없음');
  }

  #printDiscountDetail() {
    OutputView.print('\n<혜택 내역>');
    this.#eventResult.getEventBenefits().forEach(({ eventName, discountValue }) => {
      if (discountValue) {
        OutputView.print(`${eventName}: -${Utils.numberToKoreanWon(discountValue)}`);
      }
    });
  }
}

export default XmasEvent;
