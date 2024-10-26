import {
  AdminLayout,
  ClientLayout,
  LoginLayout,
  PaymentLayout,
} from "@/Containers";
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
            {!pathname.includes("auth") &&
              !pathname.includes("payment") &&
              !pathname.includes("admin") && (
                <ClientLayout pageName={pageName}>
                  <Component {...pageProps} setPageName={setPageName} />
                </ClientLayout>
              )}
            {pathname.includes("auth") ||
              (pathname.includes("admin/login") && (
                <LoginLayout pageName={pageName}>
                  <Component {...pageProps} setPageName={setPageName} />
                </LoginLayout>
              ))}
            {pathname.includes("payment") && (
              <PaymentLayout pageName={pageName}>
                <Component {...pageProps} setPageName={setPageName} />
              </PaymentLayout>
            )}
            {pathname.includes("admin") &&
              !pathname.includes("admin/login") && (
                <AdminLayout pageName={pageName}>
                  <Component {...pageProps} setPageName={setPageName} />
                </AdminLayout>
              )}
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}
