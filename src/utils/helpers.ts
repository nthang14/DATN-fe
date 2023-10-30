import {
  STATUS_TRANSACTION,
  BLOCK_NUMBER_PENDING,
  REGEX_PASSWORD_INCLUDES_SPECIAL_CHARACTERS,
  REGEX_EMAIL,
  REGEX_PASSWORD_INCLUDES_NUMBER,
  REGEX_PASSWORD_MIN_MAX,
  REGEX_PASSWORD_INCLUDES_LOWER_CASE,
  REGEX_PASSWORD_INCLUDES_UPPER_CASE,
  REGEX_FULL_WIDTH,
} from "~/utils/constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
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

export const statusTransaction = (blockHash: string, blockNumber: number) => {
  return !blockHash && blockNumber === BLOCK_NUMBER_PENDING
    ? STATUS_TRANSACTION.pending
    : STATUS_TRANSACTION.completed;
};

export const formatDate = (date: Date, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return "";
  return dayjs(date).tz("Asia/Tokyo").format(format);
};

export const numberWithCommas = (x: any, defaultValue = "") => {
  if (x !== 0 && !Boolean(x)) return defaultValue;
  return x.toString().replace(/(\d)(?=(\d{3})+\b)/g, "$1,");
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
export const limitedCharacter = (value: string, length: number) => {
  return value.substring(0, length) + "...";
};
export const validateDecimal = (value: any, error: string) => {
  let decimalBefore: number = 0;
  let decimalAfter: number = 0;
  if (Number(value) < 0) return error;
  const indexDot = value.indexOf(".");
  if (indexDot > -1) {
    decimalBefore = value.substr(0, indexDot).length;
    decimalAfter = value.substr(indexDot + 1, value.length).length;
  } else {
    decimalBefore = value.length;
  }
  if (indexDot > -1 && decimalBefore <= 15 && decimalAfter <= 2) return true;
  if (indexDot === -1 && decimalBefore <= 18) return true;
  return error;
};

export const formatAddress = (address: string) => {
  if (!address) return "";
  return address.substring(0, 14) + "..." + address.substring(28, 42);
};

export const convertDSMToDD = (dsm: string) => {
  const dmsArray = dsm.split(/[^\d\w\.]+/);
  const [degrees, minutes, seconds, direction] = dmsArray;
  let deg: number = parseFloat(
    (Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600).toFixed(6)
  );
  if (direction === "S" || direction === "W") {
    deg = deg * -1;
  }
  return deg;
};
export const getLocation = (location: string) => {
  let  dmsArr: any[] = []
 
  dmsArr = location.includes(",") ? location.split(",") :location.split(" ")
  return {
    latitude: convertDSMToDD(dmsArr[0]),
    longitude: convertDSMToDD(dmsArr[1])
  }
}

export const checkCoordinates = (coordinate: any) => {
  const decimalDegree = getLocation(coordinate)
  const {latitude, longitude} = decimalDegree
  const isLatitude = latitude >= -90 && latitude <= 90
  const isLongitude = longitude >= -180 && longitude <= 180

  return isLatitude && isLongitude
}
