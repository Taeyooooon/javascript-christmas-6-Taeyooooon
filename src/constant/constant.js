export const MESSAGE = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
});

export const PROMPT = Object.freeze({
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
});

export const ERROR_PREFIX = '[ERROR]';

export const ERROR = {
  visitDate: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
};

export const VALID_DATE_RANGE = Object.freeze({
  min: 1,
  max: 31,
});
