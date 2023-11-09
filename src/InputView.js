import { Console } from '@woowacourse/mission-utils';
import { PROMPT } from './constant/constant.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(PROMPT.visitDate);

    return input;
  },
};

export default InputView;
