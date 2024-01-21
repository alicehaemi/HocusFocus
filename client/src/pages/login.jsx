import * as React from "react";
import { Stack, Button, Card, TextField } from "@mui/material";
import "../styles.css";
// import SpotifyIcon from "../assets/spotify icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./icons/logo-blue.png";
import { MainCard } from "../styledComponents";
import { BlueButton } from "../styledComponents";

import apis from "../apis";

export default function Login() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  //   const mainRedirectClick = () => {
  //     navigate("/main");
  //   };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    const payload = {
      username: userName,
      password: password,
    };
    apis
      .login(payload)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((error) => console.error(error));
    navigate("/");
  };

  return (
    <div>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <div className="centered">
          <MainCard style={{ marginBlock: "0em" }}>
            <Stack margin="10em" justifyContent="center" alignItems="center">
              <h2 style={{ margin: 0 }}>Welcome, let’s get you logged in</h2>
              <div class="circle-logo-container">
                <img src={Logo} alt="Logo" class="logo-img" />
              </div>
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
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  className="loginComps"
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
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
