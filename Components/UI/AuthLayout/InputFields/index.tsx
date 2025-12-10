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
import { useTheme } from "@mui/material/styles";

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
  sx?: SxProps<Theme>;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
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
  sx,
  multiline = false,
  rows = 1,
  maxLength,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    showPasswordToggle && type === "password" && showPassword ? "text" : type;

  const borderColor = success ? "#4CAF50" : error ? "#F44336" : "#E9ECF2";
  const borderWidth = "1px";
  const focusBorderColor = success ? "#4CAF50" : error ? "#F44336" : "#E5EDFF";

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
            fontSize: "15px",
            textAlign: "start",
            color: disabled ? "#B0BEC5" : "#242428",
          }}
        >
          {label}
        </Typography>
      )}

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
          style: {
            cursor: readOnly ? "not-allowed" : "auto",
          },
        }}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : undefined,
          endAdornment:
            showPasswordToggle && type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  disabled={disabled}
                  sx={{
                    color: "#666",
                    "&:hover": {
                      background: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ) : endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
        }}
        sx={{
          height: "40px",
          borderRadius: "6px !important",
          boxShadow: "rgba(16, 24, 40, 0.05) 0 1px 2px 0",
          fontFamily: "UrbanistMedium",
          "& .MuiInputBase-root": {
            height: "40px",
            borderRadius: "6px",
            boxSizing: "border-box",
            "& input, & textarea": {
              padding: "12px 14px",
              boxSizing: "border-box",
              fontSize: "13px",
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
        }}
      />

      {error && helperText && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.5,
            color: "#F44336",
            fontWeight: 500,
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default InputField;
