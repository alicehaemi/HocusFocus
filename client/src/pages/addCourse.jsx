import * as React from "react";
import { Stack, Button, Card, TextField, Avatar, Input } from "@mui/material";
import "../styles.css";
// import SpotifyIcon from "../assets/spotify icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./icons/logo-blue.png";
import { MainCard } from "../styledComponents";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BlueButton } from "../styledComponents";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import IconButton from "@mui/material/IconButton";

export default function AddCourse() {
  const navigate = useNavigate();
  const [selectedWeekDays, setSelectedWeekDays] = useState("");
  const [weekDays, setWeekDays] = useState([
    {
      day: "M",
      select: false,
    },
    {
      day: "T",
      select: false,
    },
    {
      day: "W",
      select: false,
    },
    {
      day: "R",
      select: false,
    },
    {
      day: "F",
      select: false,
    },
    {
      day: "S",
      select: false,
    },
    {
      day: "U",
      select: false,
    },
  ]);

  const dayMap = {
    M: "M",
    T: "T",
    W: "W",
    R: "T",
    F: "F",
    S: "S",
    U: "S",
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSelect = (ob, ind) => {
    const newArr = weekDays.map((obj, i) => {
      if (i === ind) {
        return { ...obj, select: !obj.select };
      }
      return obj;
    });

    setWeekDays(newArr);

    const selectedDays = newArr
      .filter((item) => item.select)
      .map((item) => {
        return item.day;
      })
      .join("");

    setSelectedWeekDays(selectedDays);
  };

  const InputClassName = () => {
    return (
      <Stack width="100%">
        <h3>Class Name</h3>
        <TextField
          className="loginComps"
          id="courseName"
          label="Course Name"
          variant="outlined"
        />
      </Stack>
    );
  };

  const SelectDays = () => {
    return (
      <>
        <Stack width="100%">
          <h3>Day(s) of Week</h3>
          <Stack direction="row" spacing={2}>
            {weekDays.map((day, i) => (
              <Avatar
                sx={{
                  bgcolor: `${day.select ? "#1a73e8" : "grey"}`,
                  height: "25px",
                  color: "white",
                  width: "25px",
                  fontSize: "12px",
                }}
                onClick={() => handleSelect(day, i)}
                alt="Remy Sharp"
              >
                {dayMap[day.day]}
              </Avatar>
            ))}
          </Stack>
        </Stack>
      </>
    );
  };

  const SelectTime = () => {
    return (
      <>
        <Stack justifyContent="stretch" width="100%">
          <h3>Start Time</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Start Time" />
          </LocalizationProvider>
          <h3>End Time</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="End Time" />
          </LocalizationProvider>
        </Stack>
      </>
    );
  };

  return (
    <div>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <div className="centered">
          <MainCard>
            <Stack
              direction="row"
              justifyContent="center"
              width="100%"
              margin={2}
              spacing={2}
            >
              <IconButton aria-label="back" onClick={handleBack}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              <div></div>
              <h2 style={{ margin: 0 }}>Add Course</h2>
            </Stack>
            <Stack marginInline="15em" marginBlock="5em">
              <Stack
                spacing={1}
                margin={2}
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <InputClassName />
                <SelectDays />
                <SelectTime />

                <Button
                  variant="contained"
                  width="100%"
                  style={{ margin: "3em" }}
                  // onClick={handleLogin}
                >
                  Add Course
                </Button>
              </Stack>
            </Stack>
          </MainCard>
        </div>
      </Stack>
    </div>
  );
}
