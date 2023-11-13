import { EVENT_RULES } from '../constant/constant.js';
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
    if (this.#orderedMenu.totalPrice < EVENT_RULES.minPriceForEvent) return;

    this.#eventBenefits = [
      { eventName: '크리스마스 디데이 할인', discountValue: this.xmasDdayDiscount },
      { eventName: '평일 할인', discountValue: this.weekdayDiscount },
      { eventName: '주말 할인', discountValue: this.weekendDiscount },
      { eventName: '특별 할인', discountValue: this.#specialDiscount },
      { eventName: '증정 이벤트', discountValue: this.hasGiveAway ? EVENT_RULES.giveAwayPrice : 0 },
    ];
  }

  get eventBenefits() {
    return this.#eventBenefits;
  }

  get isZeroDiscount() {
    return this.#eventBenefits.every(({ discountValue }) => discountValue === 0);
  }

  get totalDiscountPrice() {
    return this.#eventBenefits.reduce((total, { discountValue }) => total + discountValue, 0);
  }

  get expectedPrice() {
    const totalOrderPrice = this.#orderedMenu.totalPrice;
    const totalDiscount = this.totalDiscountPrice;

    const giveAwayDiscount =
      this.#eventBenefits.find(({ eventName }) => eventName === '증정 이벤트')?.discountValue || 0;

    return totalOrderPrice - (totalDiscount - giveAwayDiscount);
  }

  get xmasDdayDiscount() {
    if (this.#visitDate > 25) return 0;

    return EVENT_RULES.xmasDiscountStartPrice + (this.#visitDate - 1) * EVENT_RULES.xmasDiscountPerDay;
  }

  get weekdayDiscount() {
    if (Utils.getWeekdayOrWeekend(this.#visitDate) !== '평일') {
      return 0;
    }

    const dessertMenus = this.#orderedMenu.menuList.filter(({ category }) => category === 'dessert');
    const dessertDiscount = dessertMenus.reduce((total, { count }) => total + count * EVENT_RULES.weekdayDiscount, 0);

    return dessertDiscount;
  }

  get weekendDiscount() {
    if (Utils.getWeekdayOrWeekend(this.#visitDate) !== '주말') {
      return 0;
    }

    const mainMenus = this.#orderedMenu.menuList.filter(({ category }) => category === 'main');
    const mainDiscount = mainMenus.length * EVENT_RULES.weekendDiscount;

    return mainDiscount;
  }

  get eventBadge() {
    if (this.totalDiscountPrice >= 20000) {
      return '산타';
    }
    if (this.totalDiscountPrice >= 10000) {
      return '트리';
    }
    if (this.totalDiscountPrice >= 5000) {
      return '별';
    }
    return '없음';
  }

  get #specialDiscount() {
    if (EVENT_RULES.specialDay.includes(this.#visitDate)) {
      return EVENT_RULES.specialDiscount;
    }

    return 0;
  }

  get hasGiveAway() {
    return this.#orderedMenu.totalPrice > EVENT_RULES.giveAwayRequiredPrice;
  }
}

export default Event;
