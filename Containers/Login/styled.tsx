import { Box, styled } from "@mui/material";

export const LoginWrapper = styled(Box)(() => ({
  background: "#f4f6fa",
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "hidden",
}));

export const ContentWrapper = styled(Box)(() => ({
  position: "relative",
  zIndex: 20,
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px", // safe spacing for mobile
}));
