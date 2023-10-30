import "~/styles/globals.scss";
import type { AppProps as NextAppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "~/app/store";
import { useRouter } from "next/router";
import AppLayout from "~/components/layout/AppLayout";
import ToastLayout from "~/components/layout/ToastLayout";
import { NextIntlProvider } from "next-intl";
import NextApp from "next/app";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import theme from "~/utils/theme";
import { ThemeProvider } from "@mui/material";
import { Poppins } from "next/font/google";
import Loading from "~/components/layout/Loading";
import Error from "~/components/layout/Error";
const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export interface AppProps extends NextAppProps {
  messages: {};
  Component: any;
}
export default function App({ Component, pageProps, messages }: AppProps) {
  const router = useRouter();
  const regex =
    /^(?!.*(?:api|_next\/static|_next\/image|favicon\.ico|404|500|auth)).*/;
  const arr = router.pathname.split("/");
  return (
    <Error>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <NextIntlProvider messages={messages}>
              <ToastLayout>
                <style jsx global>{`
                  html,
                  body {
                    font-family: ${poppins.style.fontFamily};
                  }
                `}</style>
                <main className={poppins.className + " relative"}>
                  {arr.length > 1 && !regex.test(arr[1]) ? (
                    <Component {...pageProps} />
                  ) : (
                    <AppLayout>
                      <Component {...pageProps} />
                    </AppLayout>
                  )}
                  <Loading />
                </main>
              </ToastLayout>
            </NextIntlProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    </Error>
  );
}
App.getInitialProps = async function getInitialProps(context: any) {
  const { locale } = context.router;
  const messages = locale ? require(`messages/${locale}.json`) : undefined;
  return { ...(await NextApp.getInitialProps(context)), messages };
};
