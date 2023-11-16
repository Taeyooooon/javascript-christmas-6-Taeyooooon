import { ERROR, EVENT_RULES, MENU_LIST, SYMBOL } from '../constant/constant.js';
import Validate from '../utils/Validate.js';

class Menu {
  #menuList = [];

  constructor(menus) {
    this.#validate(menus);
    this.#setMenus(menus);
    this.#validateIsOnlyBeverage();
    this.#validateTotalCount();
  }

  #validate(menus) {
    const eachMenuAndCount = menus.split(SYMBOL.menuDivider);
    eachMenuAndCount.forEach((each) => this.#validateEach(each));
  }

  #validateEach(menu) {
    const [menuName, count] = menu.split(SYMBOL.menuNameAndCountDivider);
    this.#validateMenu(menuName);
    this.#validateCount(count);
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

  #setMenus(menus) {
    menus.split(SYMBOL.menuDivider).forEach((eachMenu) => {
      const [menuName, count] = eachMenu.split(SYMBOL.menuNameAndCountDivider);
      
      const list = {
        name: menuName,
        count: Number(count),
        category: this.#getMenuCategory(menuName),
        price: this.#getMenuPrice(menuName),
      };

      this.#validateDuplicateMenu(menuName);
      this.#menuList.push(list);
    });
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
      .find(({ name }) => name === menuName);

    return menu.price;
  }

  #validateDuplicateMenu(menuName) {
    if (this.#menuList.some(({ name }) => name === menuName)) {
      throw new Error(ERROR.orderDuplicate);
    }
  }

  #validateIsOnlyBeverage() {
    const isOnlyBeverage = this.#menuList.every(({ category }) => category === 'beverage');
    if (isOnlyBeverage) {
      throw new Error(ERROR.onlyBeverage);
    }
  }

  #validateTotalCount() {
    const totalCount = this.#menuList.reduce((total, { count }) => total + count, 0);

    if (totalCount > 20) {
      throw new Error(ERROR.order);
    }
  }

  getTotalPrice() {
    return this.#menuList.reduce((total, { count, price }) => total + price * count, 0);
  }

  getMenuList() {
    return this.#menuList;
  }
}

export default Menu;
