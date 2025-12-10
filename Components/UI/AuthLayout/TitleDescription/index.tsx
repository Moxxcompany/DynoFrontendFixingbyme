import React from "react";
import { Box, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

export interface TitleDescriptionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
  titleVariant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  descriptionVariant?: "body1" | "body2" | "subtitle1" | "subtitle2" | "p";
  gutterBottom?: boolean;
  divider?: boolean;
  sx?: SxProps<Theme>;
}

const TitleDescription: React.FC<TitleDescriptionProps> = ({
  title,
  description,
  align = "left",
  titleVariant = "h2",
  descriptionVariant = "body2",
  gutterBottom = true,
  divider = false,
  sx,
}) => {
  if (!title && !description) return null;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: align,
        ...sx,
      }}
    >
      {title ? (
        <Typography
          component="div"
          sx={{
            fontSize: "20px",
            fontFamily: "UrbanistMedium",
            color: "#242428",
          }}
        >
          {title}
        </Typography>
      ) : null}

      {description ? (
        <Typography
          sx={{
            fontSize: "15px",
            marginTop: "12px",
            fontFamily: "UrbanistMedium",
            color: "#676768",
          }}
        >
          {description}
        </Typography>
      ) : null}
    </Box>
  );
};

export default TitleDescription;
