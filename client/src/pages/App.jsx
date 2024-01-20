import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./home";
import Login from "./login";
import AddCourse from "./addCourse";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AppBar } from "@mui/material";

//import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
//import { Theme } from "./frontend/pages/theme";
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(1);
    // setAccessToken(token);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {accessToken ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/addCourse" element={<AddCourse />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          background: {
            default: "#f9f5ec",
          },
        },
        typography: {
          fontFamily: "Red Hat Display",
        },
        components: {
          // Name of the component
          MuiTextField: {
            styleOverrides: {
              // Name of the slot
              root: {
                // Some CSS
                // backgroundColor: "#D9D9D9",
                // borderWidth: "0px",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                backgroundColor: "#18357F",
                textTransform: "unset",
                fontFamily: "Red Hat Display",
                fontWeight: 500,
                // width: "100%",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

//export default App;
