const Utils = {
  deepFreeze(object) {
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === 'object' && object[key] !== null) {
        Utils.deepFreeze(object[key]);
      }
    });

    return Object.freeze(object);
  },

  numberToKoreanWon(number) {
    return `${number.toLocaleString('ko-KR')}원`;
  },

  getDayOfWeek(day, month = 12, year = 2023) {
    const date = new Date(year, month - 1, day);
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return dayOfWeek;
  },

  /**
   * @returns '주말' | '평일'
   */
  getWeekdayOrWeekend(day, month = 12, year = 2023) {
    const dayOfWeek = Utils.getDayOfWeek(day, month, year);
    if (dayOfWeek === '금' || dayOfWeek === '토') {
      return '주말';
    }
    return '평일';
  },
};

export default Utils;
