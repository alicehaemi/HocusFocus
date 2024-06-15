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
import Logo from "./logos/logo-blue.png";
import apis from "../apis";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { StyledRating } from "../styledComponents";

export default function Home() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [classes, setClasses] = useState([]);

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
    localStorage.removeItem("token");
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
        console.log(classes.data);
        const classData = classes.data.map((item) => {
          if (item.Entries.length > 0) {
            return {
              id: item.id,
              name: item.name,
              score: item.Entries[0].score,
            };
          } else {
            return { id: item.id, name: item.name, score: 0 };
          }
        });
        setClasses(classData);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(classes);
  }, [classes]);

  const handleRatingChange = (id, newValue) => {
    // local change
    setClasses((prevClasses) =>
      prevClasses.map((classItem) =>
        classItem.id === id ? { ...classItem, score: newValue } : classItem
      )
    );

    const payload = {
      token: localStorage.getItem("token"),
      id: id,
      score: newValue,
    };

    apis.updateRating(payload).catch((error) => console.error(error));
  };

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
            <ClassCard
              key={item.id}
              id={item.id}
              name={item.name}
              score={item.score}
            />
          ))}
        </Stack>
      </>
    );
  };
  const ClassCard = ({ id, name, score }) => {
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
              value={score}
              max={3}
              size="large"
              onChange={(event, newValue) => {
                handleRatingChange(id, newValue);
              }}
            />
          </Stack>
        </Card>
      </>
    );
  };

  const GraphCard = () => {
    return (
      <>
        <Card className="center-content">
          <h1>TIMER</h1>
        </Card>
      </>
    );
  };

  const ReportButtons = () => {
    return (
      <>
        <Stack direction="column" spacing={2}>
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
          {/* <IconButton aria-label="addCourse" onClick={handleAddCourseButton}>
            <AddIcon />
          </IconButton> */}
          <IconButton aria-label="userProfile" >
            <AccountCircleIcon />
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

  const Badges = () => {
    return (
      <Stack direction="column" >
        <h1 className="center-text">Badges</h1>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" style={{ textTransform: "unset" }}>
            Badge 1
          </Button>
          <Button variant="contained" style={{ textTransform: "unset" }}>
            Badge 2
          </Button>
          <Button variant="contained" style={{ textTransform: "unset" }}>
            Badge 3
          </Button>
        </Stack>
      </Stack>
    );
  };

  const AudioOption = () => {
    const buttonStyle = {
      textTransform: "unset",
      minWidth: '100px',  // Set the desired width
      minHeight: '100px', // Set the same value for height to make it square
      maxWidth: '100px',
      maxHeight: '100px',
      flexGrow: 0 // Prevent stretching
    };
    return (
      <>
      <Stack direction="column" className="center-content">
        <h1> Audio </h1>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" sx={buttonStyle} style={{ textTransform: "unset"}}>
            No sound
          </Button>
          <Button variant="contained" sx={buttonStyle} style={{ textTransform: "unset"}}>
            Rain Falling
          </Button>
          <Button variant="contained" sx={buttonStyle} style={{ textTransform: "unset"}}>
            Fire Crackling
          </Button>
        </Stack>
      </Stack>
      </>
    );
  };

  const CourseOptions = () => {
    return (
      <Stack direction="column" className="center-content">
        <h1>Course Options</h1>
        <Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleAddCourseButton} style={{ textTransform: "unset" }}>
              Add Course
            </Button>
            <Button variant="contained" style={{ textTransform: "unset" }}>
              Edit Course
            </Button>
            <Button variant="contained" style={{ textTransform: "unset" }}>
              Remove Course
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const TimerStack = () => {
    return (
      <Stack direction="column" spacing={2}>
        <SettingsCard /> 
        
        <Stack>
          <GraphCard />
          <Stack direction="column" spacing={2} marginBlock={2}>
            <ReportButtons /> 
            <AudioOption />
            <CourseOptions />
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
        <Stack direction="row" spacing={30}>
          <Badges />
          <ClassesStack />
          <TimerStack />
        </Stack>
        <Stack direction="column" spacing={2}>
        </Stack>
      </Stack>
    </div>
  );
}
