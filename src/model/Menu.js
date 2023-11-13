import { ERROR, EVENT_RULES, MENU_LIST } from '../constant/constant.js';
import Validate from '../utils/Validate.js';

class Menu {
  #menuList = [];
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

  get totalPrice() {
    return this.#menuList.reduce((total, { count, price }) => total + price * count, 0);
  }

  #getMenuCategory(menuName) {
    const menuCategory = Object.keys(MENU_LIST).find((category) =>
      MENU_LIST[category].some(({ name }) => name === menuName),
    );

    return menuCategory;
  }

  #getMenuPrice(menuName) {
    const menu = Object.values(MENU_LIST)
      .flat()
      .find((item) => item.name === menuName);

    return menu.price;
  }

  #setMenus(menus) {
    const menuList = menus.split(',').map((each) => each.split('-'));
    menuList.forEach(([menuName, count]) => {
      const list = {
        name: menuName,
        count,
        category: this.#getMenuCategory(menuName),
        price: this.#getMenuPrice(menuName),
      };
      this.#validateDuplicateMenu(menuName);

      this.#menuList.push(list);
    });
  }

  #validateDuplicateMenu(menuName) {
    if (this.#menuList.some(({ name }) => name === menuName)) {
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

  get menuList() {
    return this.#menuList;
  }
}

export default Menu;
