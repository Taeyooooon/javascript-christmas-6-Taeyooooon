import { Console } from '@woowacourse/mission-utils';
import { PROMPT } from './constant/constant.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(PROMPT.visitDate);

    return input;
  },

  async readMenu() {
    const input = await Console.readLineAsync(PROMPT.menu);

    return input;
  },
};

export default InputView;
