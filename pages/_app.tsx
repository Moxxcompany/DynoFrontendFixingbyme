import { ClientLayout, LoginLayout } from "@/Containers";
import store from "@/store";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [pageName, setPageName] = useState("");
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            {!pathname.includes("auth") && (
              <ClientLayout pageName={pageName}>
                <Component {...pageProps} setPageName={setPageName} />
              </ClientLayout>
            )}
            {pathname.includes("auth") && (
              <LoginLayout pageName={pageName}>
                <Component {...pageProps} setPageName={setPageName} />
              </LoginLayout>
            )}
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}
