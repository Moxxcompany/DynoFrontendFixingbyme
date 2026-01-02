import { Box, styled } from "@mui/material";

export const HomeContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto",
  padding: theme.spacing(0, 2),
}));
