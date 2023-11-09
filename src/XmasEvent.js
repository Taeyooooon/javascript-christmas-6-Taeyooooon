import InputView from './InputView.js';
import OutputView from './OutputView.js';
import { ERROR } from './constant/constant.js';
import Validate from './utils/Validate.js';

class XmasEvent {
  #visitDate;

  async startProcess() {
    OutputView.printGreeting();
    await this.#getVisitDate();
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
}

export default XmasEvent;
