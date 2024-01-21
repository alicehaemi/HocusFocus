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

// import { CircleIcon, CircleOutlinedIcon, AddIcon } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { StyledRating } from "../styledComponents";

export default function Home() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

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

  const ClassCard = () => {
    return (
      <>
        <Card>
          <Stack justifyContent="center" alignItems="center" margin={2}>
            <h3>Class Name</h3>
            <StyledRating
              name="customized-color"
              getLabelText={(value) =>
                `${value} Points${value !== 1 ? "s" : ""}`
              }
              icon={<CircleIcon fontSize="inherit" />}
              emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
              defaultValue={0}
              max={3}
              size="large"
            />
          </Stack>
        </Card>
      </>
    );
  };

  const ClassesStack = () => {
    return (
      <>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <h1>Class Stack</h1>
          <ClassCard />
        </Stack>
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
        <h1 style={{ margin: 0 }}>HOME</h1>
        <Stack direction="row" spacing={10}>
          <ClassesStack />
          <GraphStack />
        </Stack>
      </Stack>
    </div>
  );
}
