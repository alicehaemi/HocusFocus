import * as React from "react";
import { Stack, Button, Card, TextField } from "@mui/material";
import "../styles.css";
// import SpotifyIcon from "../assets/spotify icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Logo from "./icons/logo-blue.png";
import { MainCard } from "../styledComponents";
import { BlueButton } from "../styledComponents";

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
          <MainCard>
            <Stack margin="10em">
              <h2 style={{ margin: 0 }}>Welcome, let’s get you logged in</h2>
              <Stack
                spacing={1}
                margin={2}
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <TextField
                  className="loginComps"
                  id="username"
                  label="Username"
                  variant="outlined"
                />
                <TextField
                  className="loginComps"
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                />
                <a onClick={handleSignUp}>Don’t have an account?</a>
                <BlueButton
                  className="blueButton"
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
                </BlueButton>
              </Stack>
            </Stack>
          </MainCard>
        </div>
      </Stack>
    </div>
  );
}
