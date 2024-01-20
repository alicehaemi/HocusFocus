import * as React from "react";
import { Stack, Button, Card, TextField } from "@mui/material";
import "../styles.css";
// import SpotifyIcon from "../assets/spotify icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Logo from "./icons/logo-blue.png";

export default function Login() {
  const navigate = useNavigate();

  //   const mainRedirectClick = () => {
  //     navigate("/main");
  //   };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <div className="centered">
          <Card variant="outlined">
            <Stack margin="10em">
              <h2 style={{ margin: 0 }}>
                Welcome back, Let’s get you logged in
              </h2>
              {/* <img src={Logo} alt="Logo" /> */}
              <Stack
                spacing={1}
                margin={2}
                justifyContent="center"
                alignItems="center"
              >
                <TextField id="username" label="Username" variant="outlined" />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                />
                <a onClick={handleSignUp}>Don’t have an account?</a>
                <Button onClick={handleLogin}>Login</Button>
              </Stack>
            </Stack>
          </Card>
        </div>
      </Stack>
    </div>
  );
}
