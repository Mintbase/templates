export const scrollbar = (): any => {
  return {
    height: "83vh",
    overflow: "hidden",

    "&:hover": {
      overflow: "auto",
    },
    /* Add styles for both horizontal and vertical scrollbars */
    "&::-webkit-scrollbar": {
      width: "5px",
      height: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "gray",
      borderRadius: "6px",
      height: "10rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "lightgray",
    },
  };
};
