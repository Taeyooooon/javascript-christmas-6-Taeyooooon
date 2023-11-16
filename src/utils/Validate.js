import { ERROR, VALID_DATE_RANGE } from '../constant/constant.js';

const Validate = {
  isPositiveInteger(number) {
    const parsedNumber = Number(number);

    return Number.isInteger(parsedNumber) && parsedNumber > 0;
  },

  isEmpty(value) {
    return value === '';
  },

  isInValidDateRange(value) {
    return value < VALID_DATE_RANGE.min || value > VALID_DATE_RANGE.max;
  },

  checkDate(date) {
    if (!Validate.isPositiveInteger(date)) {
      throw new Error(ERROR.visitDate);
    }

    if (Validate.isInValidDateRange(date)) {
      throw new Error(ERROR.visitDate);
    }
  },
};

export default Validate;
