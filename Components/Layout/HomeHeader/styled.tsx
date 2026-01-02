import { homeTheme } from "@/styles/homeTheme";
import { styled } from "@mui/material";

export const HeaderContainer = styled("nav")(({ theme }) => ({
  height: 64,
  padding: "0 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",

  maxWidth: 1280,
  margin: "0 auto",

  ".logo": {
    cursor: "pointer",
    userSelect: "none",
  },
}));

export const NavLinks = styled("div")({
  display: "flex",
  gap: 24,
  alignItems: "center",

  button: {
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    fontFamily: "UrbanistRegular",
    color: homeTheme.palette.text.secondary,
    padding: 0,

    "&:hover": {
      background: "transparent",
      color: homeTheme.palette.primary.main,
    },
  },
});

export const Actions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,

  ".signin": {
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    color: homeTheme.palette.text.primary,
    lineHeight: "20px",
    fontFamily: "UrbanistMedium",

    "&:hover": {
      background: "transparent",
      color: homeTheme.palette.primary.main,
    },
  },
});
