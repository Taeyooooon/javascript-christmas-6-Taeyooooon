import { VALID_DATE_RANGE } from '../constant/constant.js';

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
};

export default Validate;
