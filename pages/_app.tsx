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

  const [loading, setLoading] = React.useState(true);
  const currentUser: IUser | null = appStore((state) => state.user);
  const userToken: string | null = appStore((state) => state.token);
  React.useEffect(() => {
    const unsubscribe = () => {
      if (currentUser) {
        initSocket();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${userToken}`;
        router.push(ROUTES.HOME);
        setLoading(false);
        if (!currentUser) {
          appStore.setState({
            user: {
              username: user.username,
            },
          });
        }
      } else {
        appStore.setState({
          user: null,
        });
        router.push(ROUTES.LOGIN);
      }
      setLoading(false);
    };

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress /> Please wait...
      </div>
    );
  }
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppHeader />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;