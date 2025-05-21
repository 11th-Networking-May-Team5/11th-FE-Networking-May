/**
 * - 주어진 날짜가 낮인지 여부를 확인하는 함수
 * @param date {Date} - 날짜 객체
 * @returns {boolean} - 낮인지 여부
 */
export const isDayTime = (date: Date): boolean => {
  const hour = date.getHours();
  return hour >= 6 && hour < 18;
};
