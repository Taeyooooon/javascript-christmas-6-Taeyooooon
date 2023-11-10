import { ERROR, EVENT_RULES, MENU_LIST } from '../constant/constant.js';
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
      this.#validateDuplicateMenu(menuName);

      this.#menus.push(list);
    });
  }

  #validateDuplicateMenu(menuName) {
    if (this.#menus.some(({ name }) => name === menuName)) {
      throw new Error(ERROR.orderDuplicate);
    }
  }

  #validateMenu(menuName) {
    const menuCategory = Object.keys(MENU_LIST).find((category) =>
      MENU_LIST[category].some(({ name }) => name === menuName),
    );

    if (!menuCategory) {
      throw new Error(ERROR.order);
    }
  }

  #validateCount(count) {
    if (!Validate.isPositiveInteger(count)) {
      throw new Error(ERROR.order);
    }

    if (Number(count) > EVENT_RULES.maxOrder) {
      throw new Error(ERROR.order);
    }
  }

  getMenu() {
    return this.#menus;
  }
}

export default Menu;
