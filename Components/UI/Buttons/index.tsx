import React from "react";
import { Button as MuiButton, Box } from "@mui/material";
import { borderRadius, fontFamily, SxProps, Theme } from "@mui/system";

export interface CustomButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  sx?: SxProps<Theme>;
}

/**
 * Custom Button Component with Primary and Secondary variants
 * - Primary: Blue background (#1034A6), white text
 * - Secondary: White background, blue text (#1034A6)
 * - Supports icons (startIcon/endIcon) and multiple sizes
 * - Disabled state with proper styling
 */
const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = "button",
  sx,
}) => {
  // Size configuration
  const sizeConfig = {
    small: {
      padding: "8px 16px",
      fontSize: "12px",
      height: "32px",
      gap: "6px",
    },
    medium: {
      padding: "15px 24px",
      fontSize: "15px",
      height: "40px",
      gap: "8px",
    },
    large: {
      padding: "16px 32px",
      fontSize: "16px",
      height: "48px",
      gap: "10px",
    },
  };

  const config = sizeConfig[size];

  // Variant configuration
  const variantConfig = {
    primary: {
      backgroundColor: "#0004FF",
      color: "#FFFFFF",
      fontFamily: "UrbanistBold",
      borderRadius: "6px",
    },
    secondary: {
      backgroundColor: "#FFFFFF",
      color: "#0004FF",
      border: "1px solid #0004FF",
    },
  };

  const variantStyle = variantConfig[variant];

  return (
    <MuiButton
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        padding: config.padding,
        fontSize: config.fontSize,
        height: config.height,
        borderRadius: "8px",
        fontWeight: 600,
        lineHeight: "1.5",
        textTransform: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: config.gap,
        ...variantStyle,
        ...(disabled && {
          backgroundColor: variant === "primary" ? "#B0BEC5" : "#F5F5F5",
          color: variant === "primary" ? "#FFFFFF" : "#B0BEC5",
          border: `1px solid ${variant === "primary" ? "#B0BEC5" : "#E0E0E0"}`,
          cursor: "not-allowed",
          opacity: 0.6,
        }),
        ...sx,
      }}
    >
      {startIcon && (
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize:
              size === "small" ? "16px" : size === "medium" ? "18px" : "20px",
          }}
        >
          {startIcon}
        </Box>
      )}

      <span>{label}</span>

      {endIcon && (
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize:
              size === "small" ? "16px" : size === "medium" ? "18px" : "20px",
          }}
        >
          {endIcon}
        </Box>
      )}
    </MuiButton>
  );
};

export default CustomButton;
