import React from "react";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, CircularProgress } from "@mui/material";

import createEmotionCache from "utility/createEmotionCache";
import defaultTheme from "theme/default";
import "../styles/globals.css";
import AppHeader from "components/AppHeader";
import appStore from "store/AppStore";
import { initSocket } from "../sockets";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/Routes";

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;