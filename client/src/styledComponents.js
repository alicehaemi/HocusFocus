import { Stack, Button, Card, Rating, styled } from "@mui/material";

export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#18357F",
  },
  "& .MuiRating-iconHover": {
    color: "#18357F",
  },
});

export const BlueButton = styled(Button)({
  backgroundColor: "#18357F",
  textTransform: "unset",
  fontFamily: "Red Hat Display",
  fontWeight: 500,
  width: "30%",

  // "& .Mui-iconHover": {
  //   color: "#18357F",
  // },
});

export const MainCard = styled(Card)({
  border: "5px solid #18357F",
  backgroundColor: "#F9F5EC",
  width: "80vh",
  height: "70vh",
});
