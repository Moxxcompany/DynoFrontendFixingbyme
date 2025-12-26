import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useIsMobile from "@/hooks/useIsMobile";

export interface TextareaFieldProps {
  label?: string | React.ReactNode | React.ReactElement;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
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
  sx?: SxProps<Theme>;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  autoComplete?: string;
}

/**
 * Comprehensive TextareaField component with support for all variants:
 * - Disabled, Read-only, Success, Error states
 * - Custom adornments
 * - Native textarea with auto-resize functionality
 * - UI matches InputField component styling
 */
const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  placeholder,
  value = "",
  name,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onPaste,
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
  sx,
  minRows = 1,
  maxRows,
  maxLength,
  inputRef,
  autoComplete,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("sm");
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Combine refs - use a ref callback
  const setRefs = (node: HTMLTextAreaElement | null) => {
    // Set internal ref
    if (internalRef) {
      (internalRef as any).current = node;
    }
    // Set external ref if provided
    if (inputRef) {
      if (typeof inputRef === "function") {
        inputRef(node);
      } else if (inputRef && "current" in inputRef) {
        (inputRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    }
  };

  // Auto-resize functionality
  useEffect(() => {
    const textarea = internalRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 22.5;
      const minHeight = lineHeight * minRows;
      const maxHeight = maxRows ? lineHeight * maxRows : Infinity;
      const scrollHeight = textarea.scrollHeight;
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    };

    adjustHeight();
    
    // Adjust on input
    const handleInput = () => adjustHeight();
    textarea.addEventListener("input", handleInput);
    
    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, [value, minRows, maxRows]);

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
            position: "relative",
            width: fullWidth ? "100%" : "auto",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {startAdornment && (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                paddingTop: "12px",
                paddingLeft: "14px",
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              {startAdornment}
            </Box>
          )}

          <Box
            component="textarea"
            ref={setRefs}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            autoComplete={autoComplete}
            rows={minRows}
            sx={{
              width: "100%",
              padding: startAdornment
                ? "12px 14px 12px 40px"
                : endAdornment
                ? "12px 40px 12px 14px"
                : "12px 14px",
              boxSizing: "border-box",
              borderRadius: "6px",
              border: `${borderWidth} solid ${
                isFocused
                  ? focusBorderColor
                  : isHovered && !disabled
                  ? focusBorderColor
                  : borderColor
              }`,
              backgroundColor: disabled
                ? "#F5F5F5"
                : success
                ? "#E5EDFF"
                : error
                ? "#FFFBFB"
                : "#FFFFFF",
              fontSize: isMobile ? "13px" : "15px",
              lineHeight: "1.5",
              fontFamily: "UrbanistMedium",
              color: disabled ? "#6b728080" : "#333",
              cursor: readOnly ? "not-allowed" : "auto",
              resize: "none",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
              outline: "none",
              "&::placeholder": {
                color: "#BDBDBD",
                fontFamily: "UrbanistMedium",
              },
              "&:disabled": {
                backgroundColor: "#F5F5F5",
                opacity: 1,
                cursor: "not-allowed",
              },
              "&:focus": {
                borderColor: focusBorderColor,
              },
            }}
          />

          {endAdornment && (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                paddingTop: "12px",
                paddingRight: "14px",
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              {endAdornment}
            </Box>
          )}
        </Box>

        {helperText && (
          <Typography
            sx={{
              margin: "4px 0 0 0",
              fontSize: isMobile ? "10px" : "13px",
              fontWeight: 500,
              color: error ? "#F44336" : "#676768",
              lineHeight: "1.5",
              textAlign: "start",
            }}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TextareaField;
