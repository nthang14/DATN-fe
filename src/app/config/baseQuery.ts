import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import axios from "axios";
import {
  readAccessToken, saveAccessToken
} from "~/utils/storage";
import { METHOD } from "~/utils/constants";
import { PATH_API } from "~/utils/constants";
import { setLoading, setProgress } from "~/app/slices/commonSlice";
import { store } from "~/app/store";
const mutex = new Mutex();
const instance = axios.create({
  baseURL: PATH_API,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config: any) => {
    const accessToken = readAccessToken();
    config.headers["authorization"] = `Bearer ${accessToken}`;
    if (!config.headers.hasOwnProperty("Content-Type")) {
      config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    config.onUploadProgress = (progressEvent: any) => {
      store.dispatch(setProgress(0));
      let percentComplete: number = progressEvent.loaded / progressEvent.total;
      percentComplete = percentComplete * 100;
      store.dispatch(setProgress(percentComplete));
    };
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    console.log(error)
    if (
      error?.response &&
      error?.response?.status === 498
    ) {
    }
    if (
      error?.response &&
      error?.response?.status === 401
    ) {
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
        saveAccessToken('')
      }
    }
    return error.response;
  }
);

const callApi = async (args: any) => {
  const header = args.headers || {};
  const method = args.method.toLowerCase();
  if (!window.navigator.onLine) {
    window.location.reload();
  }
  switch (method) {
    case METHOD.post:
      return await instance.post(`${PATH_API}${args.url}`, args.body, {
        headers: { ...header },
      });
    case METHOD.put:
      return await instance.put(`${PATH_API}${args.url}`, args.body);
    case METHOD.delete:
      return await instance.delete(`${PATH_API}${args.url}`);
    default:
      return await instance.get(`${PATH_API}${args.url}`, {
        params: args.params,
      });
  }
};
const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api) => {
  await store.dispatch(
    setLoading(!!args?.params?.loading ? !args?.params?.loading : true)
  );
  await mutex.waitForUnlock();
  const response: any = {
    data: [],
  };
  let result: any = await callApi(args);
  await store.dispatch(setLoading(false));

  response.data = result?.data;
  if (result.status != 200) {
    switch (result.status) {
      case 400:
        break;
      case 401:
        if (window.location.pathname !== "/auth/login") {
          window.location.href = "/auth/login";
        }
        break;
      case 403:
        break;
      case 422:
        break;
      case 500:
        break;
      case 501:
      case 502:
      case 503:
        break;
    }
  }
  return response;
};

export default baseQuery;
