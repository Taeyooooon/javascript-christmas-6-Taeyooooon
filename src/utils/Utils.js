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
};

export default Utils;
