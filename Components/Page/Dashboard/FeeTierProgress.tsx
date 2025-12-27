import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PanelCard from "@/Components/UI/PanelCard";
import { CheckCircle } from "@mui/icons-material";
import { theme } from "@/styles/theme";
import { formatNumberWithComma, getCurrencySymbol } from "@/helpers";

interface FeeTierProgressProps {
  monthlyLimit?: number; // Monthly volume limit (default: 50000)
  usedAmount?: number; // Used amount (default: 6479.25)
  currentTier?: string; // Current tier name (default: "Standard")
}

const FeeTierProgress: React.FC<FeeTierProgressProps> = ({
  monthlyLimit = 50000,
  usedAmount = 6479.25,
  currentTier = "Standard",
}) => {
  const themeHook = useTheme();

  // Get number of days in current month
  const daysInMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }, []);

  // Calculate percentage
  const percentage = useMemo(() => {
    if (monthlyLimit <= 0) return 0;
    return (usedAmount / monthlyLimit) * 100;
  }, [usedAmount, monthlyLimit]);

  // Calculate how many bars should be filled
  const filledBars = useMemo(() => {
    return Math.round((percentage / 100) * daysInMonth);
  }, [percentage, daysInMonth]);

  // Calculate remaining amount
  const remainingAmount = useMemo(() => {
    return Math.max(0, monthlyLimit - usedAmount);
  }, [monthlyLimit, usedAmount]);

  // Format numbers
  const formattedUsed = formatNumberWithComma(usedAmount);
  const formattedLimit = formatNumberWithComma(monthlyLimit);
  const formattedRemaining = formatNumberWithComma(remainingAmount);

  return (
    <>
      {/* Progress Bar */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            mb: 1.5,
            overflowX: "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: themeHook.palette.grey[100],
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: themeHook.palette.grey[400],
              borderRadius: "3px",
              "&:hover": {
                background: themeHook.palette.grey[500],
              },
            },
            // For Firefox
            scrollbarWidth: "thin",
            scrollbarColor: `${themeHook.palette.grey[400]} ${themeHook.palette.grey[100]}`,
            [themeHook.breakpoints.up("md")]: {
              overflowX: "visible",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            },
          }}
        >
          {/* Filled bars */}
          {Array.from({ length: filledBars }).map((_, i) => (
            <Box
              key={`filled-${i}`}
              sx={{
                minWidth: "8px",
                flex: { xs: "0 0 8px", md: 1 },
                height: "24px",
                background: themeHook.palette.primary.main,
                borderRadius: "4px",
                flexShrink: 0,
              }}
            />
          ))}
          {/* Remaining bars */}
          {Array.from({ length: daysInMonth - filledBars }).map((_, i) => (
            <Box
              key={`remaining-${i}`}
              sx={{
                minWidth: "8px",
                flex: { xs: "0 0 8px", md: 1 },
                height: "24px",
                background: themeHook.palette.grey[200],
                borderRadius: "4px",
                flexShrink: 0,
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 500,
              color: themeHook.palette.primary.main,
              fontFamily: "UrbanistMedium",
            }}
          >
            {percentage.toFixed(1)}% complete
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              color: themeHook.palette.text.secondary,
              fontFamily: "UrbanistRegular",
            }}
          >
            {getCurrencySymbol("USD", formattedRemaining)} remaining
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default FeeTierProgress;
