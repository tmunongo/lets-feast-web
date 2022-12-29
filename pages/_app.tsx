import { Montserrat, Roboto_Mono } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";

const roboto = Roboto_Mono({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Layout>
          <>
            <style jsx global>{`
              body {
                font-family: ${roboto.style.fontFamily};
              }
              ,
              main {
                font-family: ${montserrat.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
          </>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
