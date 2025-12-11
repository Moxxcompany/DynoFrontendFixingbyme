import { styled } from "@mui/material";

export const UserTrigger = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: theme.palette.common.white,
  padding: "4px 16px",
  borderRadius: "14px",
  cursor: "pointer",
  transition: "0.2s ease",

//   "&:hover": {
//     background: "#f4f6f9",
//   },
}));

export const UserName = styled("span")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontFamily: "UrbanistMedium",
}));

export const PopWrapper = styled("div")(() => ({
  padding: "16px 18px",
  background: "#fff",
}));

export const UserRow = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "18px",
}));

export const MenuItemRow = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: 500,
  justifyContent:"center",

  "&:hover": {
    opacity: 0.9,
  },
}));

export const LogoutButton = styled("button")(({ theme }) => ({
  width: "100%",
  marginTop: "18px",
  padding: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",

  background: "transparent",
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.2s",

  "&:hover": {
    background: theme.palette.primary.light,
  },
}));
