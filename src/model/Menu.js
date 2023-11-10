import { EVENT_RULES, MENU_LIST } from '../constant/constant.js';
import Validate from '../utils/Validate.js';

class Menu {
  #menus = [];
  #totalCount = 0;

  constructor(menus) {
    this.#validate(menus);
    this.#setMenus(menus);
  }

  #validate(menus) {
    const eachMenuAndCount = menus.split(',');
    eachMenuAndCount.forEach((each) => this.#validateEach(each));
  }

  #validateEach(menu) {
    const [menuName, count] = menu.split('-');
    this.#validateMenu(menuName);
    this.#validateCount(count);
  }

  #getCategory(menuName) {
    const menuCategory = Object.keys(MENU_LIST).find((category) =>
      MENU_LIST[category].some(({ name }) => name === menuName),
    );

    return menuCategory;
  }

  #setMenus(menus) {
    const menuList = menus.split(',').map((each) => each.split('-'));
    menuList.forEach(([menuName, count]) => {
      const list = { name: menuName, count, category: this.#getCategory(menuName) };
      this.#menus.push(list);
    });
  }

  #validateMenu(menuName) {
    const menuCategory = Object.keys(MENU_LIST).find((category) =>
      MENU_LIST[category].some(({ name }) => name === menuName),
    );

    if (!menuCategory) {
      throw new Error(`[ERROR] 잘못된 메뉴명: "${menuName}"`);
    }
  }

  #validateCount(count) {
    if (!Validate.isPositiveInteger(count)) {
      throw new Error('[ERROR] 숫자만 입력');
    }

    if (Number(count) > EVENT_RULES.maxOrder) {
      throw new Error('[ERROR] 최대 20개까지 주문가능');
    }
  }
}

export default Menu;
