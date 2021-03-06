import { ThemeProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import GeneralAppBar from "../components/GeneralAppBar";
import "../styles/globals.css";
import { CheckLocalStorage, ClearLocalStorage, LoginContext, SaveLocalStorage, TokenPair } from "../utils/auth";
import useGetThemeVariant from "../utils/theme";
import { FetchCurrentUser, User } from "../utils/users";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2b9eb3",
        },
        secondary: {
            main: "#B87D4B",
        },
    },
});

const DOTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#821980",
        },
        secondary: {
            main: "#EDAE49",
        },
    },
});
const currentTheme = DOTheme;

function MyApp({ Component, pageProps }: AppProps) {
    // const { mode, toggleMode } = useGetThemeVariant();

    // undefined : not yet loaded
    // null : not logged in
    const [user, setUser] = useState<User | undefined | null>(undefined);
    const [tokenPair, _setTokenPair] = useState<TokenPair | undefined | null>(undefined);

    const setTokenPair = (value: TokenPair | undefined | null) => {
        if (value) SaveLocalStorage(value);

        _setTokenPair(value);
    };

    // charge les tokens au lancement

    useEffect(() => {
        _setTokenPair(CheckLocalStorage());
    }, []);

    useEffect(() => {
        if (tokenPair) {
            FetchCurrentUser(tokenPair, setTokenPair)
                .then((data) => {
                    if (data.id != undefined && data.username != undefined) {
                        setUser(data);
                    } else {
                        setUser(null);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setTokenPair(null);
                });
        } else if (tokenPair === null) {
            ClearLocalStorage();
            setUser(null);
        } else {
            setUser(undefined);
        }
    }, [tokenPair]);

    return (
        <LoginContext.Provider
            value={{
                user,
                setUser: (newUser: User | undefined | null) => setUser(newUser),
                tokenPair,
                setTokenPair: (newTokenPair: TokenPair | undefined | null) => setTokenPair(newTokenPair),
            }}
        >
            <ThemeProvider theme={DOTheme}>
                <Head>
                    <title>TOURDO</title>
                    <meta name="description" content="DO tournament manager" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Box
                    sx={{
                        bgcolor: currentTheme.palette.background.default,
                        color: currentTheme.palette.text.primary,
                        minHeight: "100vh",
                    }}
                >
                    <GeneralAppBar />

                    <Box
                        sx={{
                            maxWidth: "60rem",
                            marginRight: "auto",
                            marginLeft: "auto",
                            paddingRight: { sm: 0, md: "1rem" },
                            paddingLeft: { sm: 0, md: "1rem" },
                            paddingTop: "1rem",
                        }}
                    >
                        <Component {...pageProps} />
                    </Box>
                </Box>
            </ThemeProvider>
        </LoginContext.Provider>
    );
}

export default MyApp;
