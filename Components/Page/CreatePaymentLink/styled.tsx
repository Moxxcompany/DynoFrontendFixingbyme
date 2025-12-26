import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const TabContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  background: theme.palette.primary.light,
  borderRadius: "50px",
  padding: theme.spacing(1),
}));

export const TabItem = styled(Box)<{ active?: boolean }>(
  ({ theme, active }) => ({
    flex: 1,
    padding: theme.spacing(1),
    borderRadius: "50px",
    background: active
      ? theme.palette.background.paper
      : theme.palette.primary.light,
    cursor: "pointer",
    "&:hover": {
      background: active
        ? theme.palette.background.paper
        : theme.palette.primary.light,
    },
    p: {
      fontSize: "20px",
      fontWeight: active ? 700 : 500,
      lineHeight: "24px",
      color: theme.palette.text.primary,
      fontFamily: active ? "UrbanistBold" : "UrbanistMedium",
      textTransform: "capitalize",
      textAlign: "center",
    },
  })
);

export const TabContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: "flex",
  gap: theme.spacing(3),
}));


export const PaymentSettingsLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& img": {
    width: 16,
    height: 16,
  },
  "& span": {
    fontSize: "15px",
    fontWeight: 500,
    color: theme.palette.text.primary,
    lineHeight: "18px",
    fontFamily: "UrbanistMedium",
  },
}));