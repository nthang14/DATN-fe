import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      {/* @ts-expect-error Server Component */}
      <Head>
        <title>DATN</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <body>
        <Main />
        {/* @ts-expect-error Server Component */}
        <NextScript />
      </body>
    </Html>
  );
}
