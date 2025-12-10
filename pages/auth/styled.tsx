import { Box, Card, styled } from "@mui/material";

export const CardWrapper = styled(Card)(() => ({
  width: "536px",
  //   height: "56px",
  height: "fit-content",
  borderRadius: "14px",
  padding: "8px",
  zIndex: 2,
  background: "#fff",
  textAlign: "center",
  border: "1px solid #E9ECF2",
  boxShadow: "rgba(47, 47, 101, 0.15) 0 4px 16px 0",
}));

export const ImageCenter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  cursor: "pointer",
}));

export const AuthContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  overflow: "hidden",
  position: "relative",
  zIndex: 1,
  padding: "20px",
}));
