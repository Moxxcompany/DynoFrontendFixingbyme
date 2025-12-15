/**
 * PanelCard - A reusable card component with header, body, and optional footer sections
 *
 * @example
 * // Basic usage with title and content
 * <PanelCard title="Update Password">
 *   <YourFormContent />
 * </PanelCard>
 *
 * @example
 * // With header icon and footer actions
 * <PanelCard
 *   title="Update Password"
 *   headerIcon={<LockIcon />}
 *   footer={<Button>Update</Button>}
 * >
 *   <YourFormContent />
 * </PanelCard>
 *
 * @example
 * // With header action button
 * <PanelCard
 *   title="Account Settings"
 *   headerAction={<IconButton><EditIcon /></IconButton>}
 * >
 *   <YourContent />
 * </PanelCard>
 */

import React, { ReactNode } from "react";
import { Box, Typography, SxProps } from "@mui/material";
import {
  StyledCard,
  CardHeader,
  HeaderContent,
  HeaderIcon,
  CardBody,
  CardFooter,
  HeaderTitle,
} from "./styled";

export interface PanelCardProps {
  /**
   * Title displayed in the card header
   */
  title?: string;
  /**
   * Optional icon element displayed next to the title
   */
  headerIcon?: ReactNode;
  /**
   * Optional element displayed on the right side of the header (e.g., action buttons)
   */
  headerAction?: ReactNode;
  /**
   * Main content of the card
   */
  children: ReactNode;
  /**
   * Optional footer content (e.g., action buttons)
   */
  footer?: ReactNode;
  /**
   * Custom padding for the card body
   */
  bodyPadding?: number | string;
  /**
   * Custom padding for the card header
   */
  headerPadding?: number | string;
  /**
   * Custom padding for the card footer
   */
  footerPadding?: number | string;
  /**
   * Whether to show the header border
   */
  showHeaderBorder?: boolean;
  /**
   * Whether to show the footer border
   */
  showFooterBorder?: boolean;
  /**
   * Custom styles for the card
   */
  sx?: SxProps;
  /**
   * Custom styles for the header
   */
  headerSx?: SxProps;
  /**
   * Custom styles for the body
   */
  bodySx?: SxProps;
  /**
   * Custom styles for the footer
   */
  footerSx?: SxProps;
  /**
   * Click handler for the entire card
   */
  onClick?: () => void;
}

const PanelCard: React.FC<PanelCardProps> = ({
  title,
  headerIcon,
  headerAction,
  children,
  bodyPadding,
  headerPadding,
  showHeaderBorder = true,
  sx,
  headerSx,
  bodySx,
  onClick,
}) => {
  return (
    <StyledCard sx={sx} onClick={onClick}>
      {(title || headerIcon || headerAction) && (
        <CardHeader
          sx={{
            padding: headerPadding,
            borderBottom: showHeaderBorder ? undefined : "none",
            ...headerSx,
          }}
        >
          <HeaderContent>
            {headerIcon && <HeaderIcon>{headerIcon}</HeaderIcon>}
            {title && (
              <HeaderTitle variant="h6" fontWeight={600}>
                {title}
              </HeaderTitle>
            )}
          </HeaderContent>
          {headerAction && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                display: "flex",
                alignItems: "center",
                backgroundColor: "secondary.main",
                borderRadius: "50px",
                border: "1px solid #E9ECF2",
              }}
            >
              {headerAction}
            </Box>
          )}
        </CardHeader>
      )}

      <CardBody
        sx={{
          padding: bodyPadding,
          ...bodySx,
        }}
      >
        {children}
      </CardBody>
    </StyledCard>
  );
};

export default PanelCard;
