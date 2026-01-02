import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { homeTheme } from "@/styles/homeTheme";

const HomeSectionTitleWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Badge = styled(Box)(() => ({
  textAlign: "center",
  width: "fit-content",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  fontFamily: "UrbanistMedium",
  color: homeTheme.palette.primary.main,
  backgroundColor: homeTheme.palette.background.default,
  padding: "6px 16px",
  borderRadius: "100px",
}));

const Heading = styled(Typography)<{ type: "small" | "large" }>(
  ({ theme, type }) => ({
    textAlign: "center",
    fontSize: type === "large" ? "60px" : "36px",
    lineHeight: type === "large" ? "60px" : "40px",
    fontWeight: 500,
    fontFamily: "UrbanistMedium",
    color: homeTheme.palette.text.primary,
    maxWidth: 705,
    marginTop: type === "large" ? "24px" : "16px",
    marginBottom: type === "large" ? "15px" : "16px",
    padding: "0 8px",
    [theme.breakpoints.down("md")]: {
      fontSize: type === "large" ? "45px" : "36px",
      lineHeight: type === "large" ? "48px" : "40px",
    },
  })
);

const SubText = styled(Typography)<{ type: "small" | "large" }>(
  ({ theme, type }) => ({
    textAlign: "center",
    fontSize: type === "large" ? "18px" : "16px",
    lineHeight: type === "large" ? "28px" : "24px",
    fontWeight: 400,
    fontFamily: "UrbanistRegular",
    color: homeTheme.palette.text.secondary,
    maxWidth: 500,
    [theme.breakpoints.down("md")]: {
      fontSize: type === "large" ? "18px" : "16px",
      lineHeight: type === "large" ? "28px" : "24px",
    },
  })
);

const HighlightText = styled("span")(() => ({
  background: "linear-gradient(90deg, #0004FF 0%, #6A4DFF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: 500,
}));

interface HomeSectionTitleProps {
  type?: "small" | "large";
  badgeText?: string;
  title: string;
  highlightText?: string;
  subtitle: string;
}

const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({
  badgeText,
  title,
  highlightText,
  subtitle,
  type = "large",
}) => {
  const renderTitle = () => {
    if (!highlightText || !title.includes(highlightText)) {
      return title;
    }

    const parts = title.split(highlightText);

    return (
      <>
        {parts[0]}
        <HighlightText>{highlightText}</HighlightText>
        {parts[1]}
      </>
    );
  };

  return (
    <HomeSectionTitleWrapper>
      {badgeText && <Badge>{badgeText}</Badge>}

      <Heading type={type} variant="h1">
        {renderTitle()}
      </Heading>

      <SubText type={type} variant="body1">
        {subtitle}
      </SubText>
    </HomeSectionTitleWrapper>
  );
};

export default HomeSectionTitle;
