import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from './constant/constant.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },
  printGreeting() {
    OutputView.print(MESSAGE.greeting);
  },
  printMenu() {
    OutputView.print('<주문 메뉴>');
  },
};

export default OutputView;
