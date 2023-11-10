import InputView from './InputView.js';
import OutputView from './OutputView.js';
import { ERROR } from './constant/constant.js';
import Menu from './model/Menu.js';
import Validate from './utils/Validate.js';

class XmasEvent {
  #visitDate;
  #menu;

  async startProcess() {
    OutputView.printGreeting();
    await this.#getVisitDate();
    await this.#getMenuList();
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
        this.#menu = new Menu(menus).getMenu();
        break;
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  #printResult() {
    this.#printOrderedMenu();
  }

  #printOrderedMenu() {
    OutputView.print('<주문메뉴>');
    this.#menu.forEach(({ name, count }) => {
      OutputView.print(`${name} ${count}개`);
    });
  }
}

export default XmasEvent;
