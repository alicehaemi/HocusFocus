import * as React from "react";
import {
  Stack,
  Button,
  Card,
  Rating,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import "../styles.css";
// import SpotifyIcon from "../assets/spotify icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Logo from "./icons/logo-blue.png";
import apis from "../apis";

import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { StyledRating } from "../styledComponents";

export default function Home() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [classes, setClasses] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddCourseButton = () => {
    navigate("/addCourse");
  };

  const handleLogout = () => {
    // TODO: handle authentication
    navigate("/login");
  };

  useEffect(() => {
    const payload = {
      token: localStorage.getItem("token"),
      date: new Date(),
    };

    apis
      .getClasses(payload)
      .then((classes) => {
        const classData = classes.data.map((item) => {
          if (item.Entries.length > 0) {
            return {name: item.name, score: item.Entries[0].score}
          } else {
            return {name: item.name, score: 0}
          }
        })
        setClasses(classData);
      })
      .catch((error) => console.error(error));
  }, []);

  const ClassesStack = () => {
    return (
      <>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <h1>Class Stack</h1>
          {classes.map((item) => (
            <ClassCard key={item.name} name={item.name} score={item.score} />
          ))}
        </Stack>
      </>
    );
  };
  const ClassCard = ({ name, score }) => {
    return (
      <>
        <Card>
          <Stack
            justifyContent="center"
            alignItems="center"
            marginBlock="1em"
            marginInline="5em"
          >
            <h3>{name}</h3>
            <StyledRating
              name="customized-color"
              getLabelText={(value) =>
                `${value} Points${value !== 1 ? "s" : ""}`
              }
              icon={<CircleIcon fontSize="inherit" />}
              emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
              // defaultValue={0}
              value={score}
              max={3}
              size="large"
            />
          </Stack>
        </Card>
      </>
    );
  };

  const GraphCard = () => {
    return (
      <>
        <Card>
          <h1>"Graph"</h1>
        </Card>
      </>
    );
  };

  const ReportButtons = () => {
    return (
      <>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" style={{ textTransform: "unset" }}>
            Generate Monthly Report
          </Button>
          <Button variant="contained" style={{ textTransform: "unset" }}>
            Generate Weekly Report
          </Button>
        </Stack>
      </>
    );
  };

  const SettingsCard = () => {
    return (
      <>
        <Card>
          <IconButton aria-label="addCourse" onClick={handleAddCourseButton}>
            <AddIcon />
          </IconButton>

          <IconButton
            aria-label="settings"
            aria-controls={anchorEl ? "settings" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <SettingsOutlinedIcon />
          </IconButton>

          <Menu
            id="settings"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "settings",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>

          <IconButton aria-label="logout" onClick={handleLogout}>
            <LogoutOutlinedIcon />
          </IconButton>
        </Card>
      </>
    );
  };

  const GraphStack = () => {
    return (
      <Stack direction="column">
        <h1>Graph Stack</h1>
        <Stack>
          <GraphCard />
          <Stack direction="row" spacing={2} marginBlock={2}>
            <ReportButtons />
            <SettingsCard />
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return (
    <div>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <div class="logo-container">
          <img src={Logo} alt="Logo" class="logo-img" />
        </div>
        <Stack direction="row" spacing={10}>
          <ClassesStack />
          <GraphStack />
        </Stack>
      </Stack>
    </div>
  );
}
