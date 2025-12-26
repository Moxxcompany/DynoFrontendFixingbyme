import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { StaticImageData } from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

export interface InputFieldProps {
  label?: string | React.ReactNode | React.ReactElement;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  sideButtonIconWidth?: string;
  sideButtonIconHeight?: string;
  sx?: SxProps<Theme>;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  inputHeight?: string;
  iconBoxSize?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  autoComplete?: string;
  minRows?: number;
  maxRows?: number;
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
  name,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onPaste,
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
  sideButtonIconWidth,
  sideButtonIconHeight,
  sx,
  multiline = false,
  rows = 1,
  maxLength,
  inputMode,
  inputHeight,
  iconBoxSize,
  minRows = 1,
  maxRows,
  inputRef,
  autoComplete,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("sm");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    showPasswordToggle && type === "password" && showPassword ? "text" : type;

  const borderColor = success
    ? theme.palette.success.main
    : error
    ? theme.palette.error.main
    : theme.palette.border.main;
  const borderWidth = "1px";
  const focusBorderColor = success
    ? theme.palette.success.main
    : error
    ? theme.palette.error.main
    : theme.palette.border.focus;

  // Helper function to render the side button icon
  const renderSideButtonIcon = () => {
    // Use custom width/height if provided, otherwise fallback to default responsive sizes
    const iconWidth = sideButtonIconWidth ?? (isMobile ? "16px" : "18px");
    const iconHeight = sideButtonIconHeight ?? (isMobile ? "16px" : "18px");

    if (!sideButtonIcon) {
      return (
        <EditIcon
          sx={{
            fontSize: iconWidth,
            width: iconWidth,
            height: iconHeight,
          }}
        />
      );
    }

    // Check if it's a StaticImageData (SVG import from Next.js)
    if (typeof sideButtonIcon === "object" && "src" in sideButtonIcon) {
      // Convert px string to number for Next.js Image component
      const widthNum = parseInt(iconWidth.replace("px", "")) || 12;
      const heightNum = parseInt(iconHeight.replace("px", "")) || 12;

      return (
        <Image
          src={sideButtonIcon}
          alt="icon"
          width={widthNum}
          height={heightNum}
          style={{
            display: "flex",
            objectFit: "contain",
            width: iconWidth,
            height: iconHeight,
          }}
          draggable={false}
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
          width: iconWidth,
          height: iconHeight,
          "& svg": {
            fontSize: iconWidth,
            width: iconWidth,
            height: iconHeight,
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
            color: "#242428",
            lineHeight: "1.2",
          }}
          className="label"
        >
          {typeof label === "string" ? <span>{label}</span> : label}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: fullWidth ? "100%" : "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: multiline ? "flex-start" : "center",
            gap: "8px",
            width: fullWidth ? "100%" : "auto",
          }}
        >
          <TextField
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown as any}
            onPaste={onPaste
              ? (e: React.ClipboardEvent<HTMLDivElement>) => {
                  onPaste(e as any);
                }
              : undefined}
            type={inputType}
            variant={variant}
            disabled={disabled}
            inputRef={inputRef}
            inputProps={{
              readOnly: readOnly,
              maxLength: maxLength,
              inputMode: inputMode,
              autoComplete: autoComplete,
              style: {
                cursor: readOnly ? "not-allowed" : "auto",
              },
            }}
            fullWidth={sideButton ? false : fullWidth}
            multiline={multiline}
            rows={multiline && !minRows && !maxRows ? rows : undefined}
            minRows={multiline ? minRows : undefined}
            maxRows={multiline ? maxRows : undefined}
            error={error}
            helperText={undefined}
            InputProps={{
              startAdornment: startAdornment ? (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
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
                ...(multiline
                  ? {
                      minHeight: inputHeight ?? (isMobile ? "32px" : "40px"),
                      alignItems: "flex-start",
                      padding: "0px !important",
                    }
                  : {
                      height: inputHeight ?? (isMobile ? "32px" : "40px"),
                    }),
                borderRadius: "6px",
                boxSizing: "border-box",
                "& input, & textarea": {
                  padding: "11px 14px",
                  boxSizing: "border-box",
                  fontSize: isMobile ? "13px" : "15px",
                  lineHeight: "1.5",
                  color: disabled ? "#B0BEC5" : "#333",
                  "&::placeholder": {
                    color: theme.palette.secondary.contrastText,
                    fontFamily: "UrbanistMedium",
                  },
                  fontFamily: "UrbanistMedium",
                },
                "& textarea": {
                  resize: "none",
                  overflow: "auto",
                },
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                backgroundColor: disabled
                  ? "#F5F5F5"
                  : success
                  ? "#E5EDFF"
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
                  opacity: 1,
                },
                "& input": {
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    WebkitTextFillColor: "#333",
                  },
                },
              },
              "& .MuiOutlinedInput-input.Mui-disabled": {
                WebkitTextFillColor: "#6b728080",
              },
            }}
          />

          {sideButton && (
            <IconButton
              onClick={onSideButtonClick}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Toggle visibility"
              sx={{
                width: iconBoxSize ?? (isMobile ? "32px" : "40px"),
                height: iconBoxSize ?? (isMobile ? "32px" : "40px"),
                minWidth: iconBoxSize ?? (isMobile ? "32px" : "40px"),
                minHeight: iconBoxSize ?? (isMobile ? "32px" : "40px"),
                maxWidth: isMobile ? "32px" : "40px",
                maxHeight: iconBoxSize ?? (isMobile ? "32px" : "40px"),
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

        {helperText && (
          <Typography
            sx={{
              margin: "4px 0 0 0",
              fontSize: isMobile ? "10px" : "13px",
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
              color: error ? theme.palette.error.main : theme.palette.secondary.contrastText,
              lineHeight: "1.2",
              textAlign: "start",
            }}
            className="helper-text"
          >
            {helperText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InputField;
