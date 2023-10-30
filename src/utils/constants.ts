import getConfig from "next/config";
export const ORDER_ASCEND = "ascend";
export const ORDER_DESCEND = "descend";
const { publicRuntimeConfig } = getConfig();
export const PATH_API: string = publicRuntimeConfig.baseURL;
export const PATH_API_TEST: string = "http://localhost:8000/api/v1";
export const URL_AUTH = "/auth";
export const METHOD = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
};
export const REGEX_ADDRESS =
  /^((?=.*0x)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{42}$/im;
export const REGEX_EMAIL =
  /^[a-zA-Z0-9]{8,}$|^(?=.{8,256}$)[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)?@[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)[.]{1}[a-zA-Z]{2,}$/gm;
export const REGEX_EMAIL_CONTACT =
  /^(?=.{8,256}$)[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)?@[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)[.]{1}[a-zA-Z]{2,}$/gm;
export const TYPE = {
  in: "IN",
  out: "OUT",
};
export const STATUS_TRANSACTION = {
  pending: "pending",
  completed: "completed",
};
export const BLOCK_NUMBER_PENDING = -1;
export const AUTO_LOGOUT = publicRuntimeConfig.autoLogout
  ? Number(publicRuntimeConfig.autoLogout)
  : 15;
export const GAS_FEE = 0;
export const LOGOUT = "log out";
export const AUTH_LOGIN = "/auth/login";
export const ENDPOINT_LOGIN = "authLogin";
export const STATUS_TRANSACTION_LABEL: any = {
  pending: "Pending",
  completed: "Completed",
};
export const REGEX_TITLE = /^.{1,256}$/gm;
export const REGEX_DECIMAL = /^((?!0)\d{1,18}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/gm;
export const MIN_DATE = "2023-06-01";
export const MAX_DATE = "2100-12-31";
export const DMS =
  /^([0-9]{1,3})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]{0,3}){0,3})?["|″]([N|S])([, ])([0-9]{1,3})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]{0,3}){0,3})?["|″]([E|W]$)/;

export const AUTO_REMOVE_WHITESPACE = ["password", "toAddress", "username"];
export const REGEX_PASSWORD_INCLUDES_NUMBER = /[0-9]/;
export const REGEX_PASSWORD_MIN_MAX = /^(?=.{8,256}$)/;
export const REGEX_PASSWORD_INCLUDES_LOWER_CASE = /[a-z]/;
export const REGEX_PASSWORD_INCLUDES_UPPER_CASE = /[A-Z]/;
export const REGEX_PASSWORD_INCLUDES_SPECIAL_CHARACTERS =
  /[~`!@#$%^&*()\-_+={}\[\]\\|:;"'<>,.?]/;
export const REGEX_FULL_WIDTH = /[０-９]/;
export const ROLE_ADMIN = {
  value: 1,
  text: "Admin",
};
export const MAX_LENGTH_DECIMAL = 18;
export const AUTHORIZATION = "Unauthorized";
export const EVENT1 = {
  Mint: {
    color: "!text-[#64B334]",
    bg: "!bg-[#64B334]",
    text: "Mint",
  },
  Transfer: {
    color: "!text-[#A855B6]",
    bg: "!bg-[#A855B6]",
    text: "Transfer",
  },
  URIUpdated: {
    color: "!text-[#1F6FA4]",
    bg: "!bg-[#1F6FA4]",
    text: "Updated",
  },
};
export const EVENT = {
  mint: {
    value: "Mint",
    text: "Mint",
  },
  transfer: {
    value: "Transfer",
    text: "Transfer",
  },
  update: {
    value: "URIUpdated",
    text: "Update",
  },
};
export const EVENT_NO_DISPLAY = "URIUpdated";
export const ADDRESS_ROOT = "0x0000000000000000000000000000000000000000";
export const PROPERTIES_DEFAULT = [
  "average_number_of_leaves",
  "average_tree_height",
  "average_trunk_circumference",
  "co2_absorption",
  "coordinate",
  "number_of_mangroves",
  "planting_date",
  "title",
  "type",
];
export const GAS_LIMIT = "100000000";
export const FIREBASE_CONFIG = {
  apiKey:
    publicRuntimeConfig.firebaseApiKey ||
    "AIzaSyCa1bzCynp5wNu0VIw8hirEZvlYVtBR5Sk",
  authDomain:
    publicRuntimeConfig.firebaseAuthDomain || "pni23064.firebaseapp.com",
  projectId: publicRuntimeConfig.firebaseProjectId || "pni23064",
  storageBucket:
    publicRuntimeConfig.firebaseStorageBucket || "pni23064.appspot.com",
  messagingSenderId:
    publicRuntimeConfig.firebaseMessagingSenderId || "472722819490",
  appId:
    publicRuntimeConfig.firebaseAppId ||
    "1:472722819490:web:46e2eebe7b262a063c4afb",
  measurementId: publicRuntimeConfig.firebaseMeasurementId || "G-X1YP0FQ9B0",
};
export const FIREBASE_VAPI_KEY =
  publicRuntimeConfig.firebaseVapiKey ||
  "BO4EQ0mdH2pmU4aONn-7UwduH5FVg2f-N3yxHy_l_5xnTqow9UI52jQQppzTm7gxaxsjn2X-6CIwrmxuS1F-h9A";
