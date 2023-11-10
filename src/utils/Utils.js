const Utils = {
  deepFreeze(object) {
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === 'object' && object[key] !== null) {
        Utils.deepFreeze(object[key]);
      }
    });

    return Object.freeze(object);
  },
};

export default Utils;
