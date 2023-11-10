import cookie from "js-cookie";

export const jsonToString = (value: any) => {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
};
export const stringToJson = (value: string = "") => {
  if (!value) return;
  return JSON.parse(value);
};

const ACCESS_TOKEN_KEY = "accessToken";

export const saveAccessToken = (accessToken: string) => {
  cookie.set(ACCESS_TOKEN_KEY, accessToken, { expires: 180 });
};

export const readAccessToken = () => {
  return cookie.get(ACCESS_TOKEN_KEY);
};


const REFRESH_TOKEN_KEY = "refreshToken";

export const saveRefreshToken = (refreshToken: string) => {
  cookie.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 180 });
};

export const readRefreshToken = () => {
  return cookie.get(REFRESH_TOKEN_KEY);
};

const PROFILE = "profile";
export const saveProfile = (profile: object) => {
  cookie.set(PROFILE, jsonToString(profile), { expires: 180 });
}
export const readProfile = () => {
  return stringToJson(cookie.get(PROFILE) || "");
};

const GOOGLE_TOKEN = "googleToken";

export const saveGoogleToken = (googleToken: string) => {
  cookie.set(GOOGLE_TOKEN, googleToken, { expires: 1 });
};

export const readGoogleToken = () => {
  return cookie.get(GOOGLE_TOKEN);
};