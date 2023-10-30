export {};

declare global {
  interface Window {
    tokenChannel: any;
    setToken: any;
  }
}
declare module "react-recaptcha"