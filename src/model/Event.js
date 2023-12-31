import { EVENT_BADGE, EVENT_RULES } from '../constant/constant.js';
import Utils from '../utils/Utils.js';

class Event {
  #visitDate;
  #orderedMenu;
  #eventBenefits = [];

  constructor(visitDate, orderedMenu) {
    this.#visitDate = visitDate;
    this.#orderedMenu = orderedMenu;
    this.#setEventBenefits();
  }

  #setEventBenefits() {
    if (this.#orderedMenu.getTotalPrice() < EVENT_RULES.minPriceForEvent) return;

    this.#eventBenefits = [
      { eventName: '크리스마스 디데이 할인', discountValue: this.getXmasDdayDiscount() },
      { eventName: '평일 할인', discountValue: this.getWeekdayDiscount() },
      { eventName: '주말 할인', discountValue: this.getWeekendDiscount() },
      { eventName: '특별 할인', discountValue: this.#getSpecialDiscount() },
      { eventName: '증정 이벤트', discountValue: this.getHasGiveAway() ? EVENT_RULES.giveAwayPrice : 0 },
    ];
  }

  getEventBenefits() {
    return this.#eventBenefits;
  }

  getIsZeroDiscount() {
    return this.#eventBenefits.every(({ discountValue }) => discountValue === 0);
  }

  getTotalDiscountPrice() {
    return this.#eventBenefits.reduce((total, { discountValue }) => total + discountValue, 0);
  }

  getExpectedPrice() {
    const totalOrderPrice = this.#orderedMenu.getTotalPrice();
    const totalDiscount = this.getTotalDiscountPrice();

    const giveAwayDiscount =
      this.#eventBenefits.find(({ eventName }) => eventName === '증정 이벤트')?.discountValue || 0;

    return totalOrderPrice - (totalDiscount - giveAwayDiscount);
  }

  getXmasDdayDiscount() {
    if (this.#visitDate > 25) return 0;

    return EVENT_RULES.xmasDiscountStartPrice + (this.#visitDate - 1) * EVENT_RULES.xmasDiscountPerDay;
  }

  getWeekdayDiscount() {
    if (Utils.getWeekdayOrWeekend(this.#visitDate) !== '평일') {
      return 0;
    }

    const dessertMenus = this.#orderedMenu.getMenuList().filter(({ category }) => category === 'dessert');
    const dessertDiscount = dessertMenus.reduce((total, { count }) => total + count * EVENT_RULES.weekdayDiscount, 0);

    return dessertDiscount;
  }

  getWeekendDiscount() {
    if (Utils.getWeekdayOrWeekend(this.#visitDate) !== '주말') {
      return 0;
    }

    const mainMenus = this.#orderedMenu.getMenuList().filter(({ category }) => category === 'main');
    const mainDiscount = mainMenus.length * EVENT_RULES.weekendDiscount;

    return mainDiscount;
  }

  getEventBadge() {
    if (this.getTotalDiscountPrice() >= EVENT_BADGE.santa) {
      return '산타';
    }
    if (this.getTotalDiscountPrice() >= EVENT_BADGE.tree) {
      return '트리';
    }
    if (this.getTotalDiscountPrice() >= EVENT_BADGE.star) {
      return '별';
    }
    return '없음';
  }

  #getSpecialDiscount() {
    if (EVENT_RULES.specialDay.includes(this.#visitDate)) {
      return EVENT_RULES.specialDiscount;
    }

    return 0;
  }

  getHasGiveAway() {
    return this.#orderedMenu.getTotalPrice() > EVENT_RULES.giveAwayRequiredPrice;
  }
}

export default Event;
