import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

const OpeningBox: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper elevation={6}>
      <Box p={isMobile ? 2 : 4}>
        <Typography variant={"h5"} component="div">
          Welcome to the Enhanced AI Chat Assistant!
        </Typography>
        <Typography mb={1.5} color="text.secondary">
          We are excited to introduce a revamped version of the Mintbase AI chat
          template, designed to elevate your user experience and streamline
          problem-solving.
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {` What's New: `}
        </Typography>
        <ul>
          <li>
            <strong>Improved User Interaction:</strong>
            <Typography variant="subtitle2">
              {
                "Enjoy a more intuitive and user-friendly interface for seamless communication with our AI chat assistant."
              }
            </Typography>
          </li>
          <li>
            <strong>Enhanced Problem Resolution:</strong>
            <Typography variant="subtitle2">
              {
                "Experience quicker and more accurate responses, making it even easier to find solutions to your queries."
              }
            </Typography>
          </li>
          <li>
            <strong>Material UI Integration:</strong>
            <Typography variant="subtitle2">
              {
                "Our new template incorporates Material UI, providing a modern and visually appealing design for a delightful user experience."
              }
            </Typography>
          </li>
        </ul>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Get started by asking any question, and let our AI chat assistant
          assist you effortlessly.
        </Typography>
      </Box>
    </Paper>
  );
};
export default OpeningBox;
