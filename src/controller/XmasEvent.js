import InputView from '../InputView.js';
import OutputView from '../OutputView.js';
import { ERROR } from '../constant/constant.js';
import Event from '../model/Event.js';
import Menu from '../model/Menu.js';
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
    OutputView.printHeader(this.#visitDate);
    OutputView.printOrderedMenuList(this.#menu.menuList);
    OutputView.printTotalPriceBeforeDiscount(this.#menu.totalPrice);
    OutputView.printGiveAway(this.#eventResult.hasGiveAway);
    OutputView.printDiscountDetail(this.#eventResult);
    OutputView.printTotalDiscountPrice(this.#eventResult.totalDiscountPrice);
    OutputView.printExpectedPrice(this.#eventResult.expectedPrice);
    OutputView.printEventBadge(this.#eventResult.eventBadge);
  }
}

export default XmasEvent;
