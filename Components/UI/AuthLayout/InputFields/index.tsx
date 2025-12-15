import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { StaticImageData } from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  showPasswordToggle?: boolean;
  sideButton?: boolean;
  onSideButtonClick?: () => void;
  sideButtonIcon?: React.ReactNode | StaticImageData;
  sideButtonType?: "primary" | "secondary";
  sx?: SxProps<Theme>;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
}

/**
 * Comprehensive InputField component with support for all variants:
 * - Disabled, Read-only, Success, Error states
 * - Password visibility toggle
 * - Custom adornments
 * - MUI TextField with full customization
 */
const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value = "",
  onChange,
  onBlur,
  onFocus,
  type = "text",
  variant = "outlined",
  size = "medium",
  disabled = false,
  readOnly = false,
  error = false,
  success = false,
  helperText = "",
  fullWidth = true,
  startAdornment,
  endAdornment,
  showPasswordToggle = false,
  sideButton = false,
  onSideButtonClick,
  sideButtonIcon,
  sideButtonType = "primary",
  sx,
  multiline = false,
  rows = 1,
  maxLength,
  inputMode,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("sm");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    showPasswordToggle && type === "password" && showPassword ? "text" : type;

  const borderColor = success ? "#4CAF50" : error ? "#F44336" : "#E9ECF2";
  const borderWidth = "1px";
  const focusBorderColor = success
    ? "#4CAF50"
    : error
    ? "#F44336"
    : theme.palette.primary.light;

  // Helper function to render the side button icon
  const renderSideButtonIcon = () => {
    const iconSize = isMobile ? "16px" : "18px";

    if (!sideButtonIcon) {
      return (
        <EditIcon
          sx={{
            fontSize: iconSize,
            width: iconSize,
            height: iconSize,
          }}
        />
      );
    }

    // Check if it's a StaticImageData (SVG import from Next.js)
    if (typeof sideButtonIcon === "object" && "src" in sideButtonIcon) {
      return (
        <Image
          src={sideButtonIcon}
          alt="icon"
          width={12}
          height={12}
          style={{
            display: "flex",
            objectFit: "contain",
            width: iconSize,
            height: iconSize,
          }}
        />
      );
    }

    // Otherwise, treat it as a React component (MUI icon or custom component)
    // Wrap it to ensure consistent sizing
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: iconSize,
          height: iconSize,
          "& svg": {
            fontSize: iconSize,
            width: iconSize,
            height: iconSize,
          },
        }}
      >
        {sideButtonIcon as React.ReactNode}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        ...sx,
      }}
    >
      {label && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            fontSize: isMobile ? "13px" : "15px",
            textAlign: "start",
            color: disabled ? "#B0BEC5" : "#242428",
          }}
        >
          {label}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: fullWidth ? "100%" : "auto",
        }}
      >
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          type={inputType}
          variant={variant}
          disabled={disabled}
          inputProps={{
            readOnly: readOnly,
            maxLength: maxLength,
            inputMode: inputMode,
            style: {
              cursor: readOnly ? "not-allowed" : "auto",
            },
          }}
          fullWidth={sideButton ? false : fullWidth}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          error={error}
          helperText={helperText || undefined}
          FormHelperTextProps={{
            sx: {
              margin: error ? "4px 0 0 0 !important" : "0px",
              minHeight: error ? "auto" : "0px",
            },
          }}
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
          }}
          sx={{
            ...(sideButton && { flex: 1 }),
            borderRadius: "6px !important",
            boxShadow: "none",
            fontFamily: "UrbanistMedium",
            "& .MuiInputBase-root": {
              height: isMobile ? "32px" : "40px",
              borderRadius: "6px",
              boxSizing: "border-box",
              "& input, & textarea": {
                padding: "12px 14px",
                boxSizing: "border-box",
                fontSize: isMobile ? "10px" : "13px",
                lineHeight: "1.5",
                color: disabled ? "#B0BEC5" : "#333",
                "&::placeholder": {
                  color: "#BDBDBD",
                  fontFamily: "UrbanistMedium",
                },
                fontFamily: "UrbanistMedium",
              },
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              backgroundColor: disabled
                ? "#F5F5F5"
                : success
                ? "#F1F8F6"
                : error
                ? "#FFFBFB"
                : "#FFFFFF",
              transition: "all 0.3s ease",
              boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
              "& fieldset": {
                borderColor: borderColor,
                borderWidth: borderWidth,
              },
              "&:hover fieldset": {
                borderColor: disabled ? borderColor : focusBorderColor,
              },
              "&.Mui-focused fieldset": {
                borderColor: focusBorderColor,
                borderWidth: "1px",
              },
              "&.Mui-disabled": {
                backgroundColor: "#F5F5F5",
                opacity: 0.6,
              },
              "& input": {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "#333",
                },
              },
            },
            "& .MuiOutlinedInput-input.Mui-disabled": {
              WebkitTextFillColor: "#B0BEC5",
            },
            "& .MuiFormHelperText-root": {
              margin: error ? "4px 0 0 0 !important" : "0px !important",
              fontSize: isMobile ? "10px" : "13px",
              fontFamily: "UrbanistMedium",
              color: error ? "#F44336" : "#676768",
              lineHeight: "1.5",
              minHeight: error ? "auto" : "0px",
              display: error || helperText ? "block" : "none",
            },
          }}
        />

        {sideButton && (
          <IconButton
            onClick={onSideButtonClick}
            disabled={disabled}
            sx={{
              width: isMobile ? "32px" : "40px",
              height: isMobile ? "32px" : "40px",
              minWidth: isMobile ? "32px" : "40px",
              minHeight: isMobile ? "32px" : "40px",
              maxWidth: isMobile ? "32px" : "40px",
              maxHeight: isMobile ? "32px" : "40px",
              borderRadius: "6px",
              border: `1px solid ${
                sideButtonType === "primary" ? "#676768" : "#0004FF"
              }`,
              backgroundColor: "#FFFFFF",
              color: "#242428",
              padding: isMobile ? "8px" : "11px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              "&:hover": {
                backgroundColor: "#F5F5F5",
                borderColor: "#E9ECF2",
              },
              "&:disabled": {
                backgroundColor: "#F5F5F5",
                opacity: 0.6,
                borderColor: "#E9ECF2",
              },
            }}
          >
            {renderSideButtonIcon()}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default InputField;
