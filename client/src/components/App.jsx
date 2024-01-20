import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./home";
import Login from "./login";
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
              {/* <Route path="/" element={<Home />} /> */}
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

<div>
  <Router>
    {/* <ResponsiveAppBar /> */}
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
</div>;

// function App() {
//   const theme = useTheme();
//   const colorMode = React.useContext(ColorModeContext);
//   return (
//     <div className="App">
//       <Router>
//         {/* <ResponsiveAppBar /> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

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
            default: "#F3F3F3",
          },
          // lightGreen: "#7FD486",
        },
        typography: {
          fontFamily: "EB Garamond",
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
