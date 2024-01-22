import { orange } from "@mui/material/colors";

export const userBox = (): any => {
  return {
    p: 2,
    backgroundColor: "rgb(200, 250, 214)",
    borderRadius: "8px",
    maxWidth: "360px",
  };
};

export const botBox = (): any => {
  return {
    p: 2,
    backgroundColor: "rgb(244, 246, 248)",
    borderRadius: "8px",
    maxWidth: "360px",
  };
};

export const scrollbar = (): any => {
  return {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "gray",
      borderRadius: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "lightgray",
    },
  };
};
