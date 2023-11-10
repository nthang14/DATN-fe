import {
  REGEX_PASSWORD_INCLUDES_SPECIAL_CHARACTERS,
  REGEX_PASSWORD_INCLUDES_NUMBER,
  REGEX_PASSWORD_MIN_MAX,
  REGEX_PASSWORD_INCLUDES_LOWER_CASE,
  REGEX_PASSWORD_INCLUDES_UPPER_CASE,
  REGEX_FULL_WIDTH,
} from "~/utils/constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import randomColor from "randomcolor";
dayjs.extend(utc);
dayjs.extend(timezone);

export const joinArray = (arr: any[], key?: string) => {
  if (!key) return arr.join(", ");
  return arr.map((obj) => obj[key]).join(", ");
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const formatDate = (date: Date, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return "";
  return dayjs(date).tz("Asia/Tokyo").format(format);
};

export const validatePassword = (password: string, error: string) => {
  if (REGEX_FULL_WIDTH.test(password)) return error;
  if (REGEX_PASSWORD_MIN_MAX.test(password)) {
    let count: number = 0;
    count = REGEX_PASSWORD_INCLUDES_NUMBER.test(password) ? count + 1 : count;
    count = REGEX_PASSWORD_INCLUDES_LOWER_CASE.test(password)
      ? count + 1
      : count;
    count = REGEX_PASSWORD_INCLUDES_UPPER_CASE.test(password)
      ? count + 1
      : count;
    count = REGEX_PASSWORD_INCLUDES_SPECIAL_CHARACTERS.test(password)
      ? count + 1
      : count;
    if (count >= 3) return true;
  }
  return error;
};

export const convertByte = (size: number) => {
  if (!size && isNaN(size)) return "";
  let sizeKB = 0,
    sizeMB = 0;
  sizeKB = parseFloat(Math.ceil(size / 1024).toFixed(2));
  sizeMB = parseFloat(Math.ceil(sizeKB / 1024).toFixed(2));
  if (size < 1024) return size + "b";
  if (sizeKB < 1024) return sizeKB + "kB";
  if (sizeMB < 1024) return sizeMB + "MB";
};

export const getColor = () => {
  const color = randomColor(
    {
      luminosity: 'bright',
      format: 'random'
   }
  );
  return `text-[${color}]`;
};
