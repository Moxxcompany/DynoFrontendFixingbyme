import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PanelCard from "@/Components/UI/PanelCard";
import CustomButton from "@/Components/UI/Buttons";
import { ArrowOutward, CheckCircle, WorkspacePremium } from "@mui/icons-material";
import { theme } from "@/styles/theme";

const DashboardRightSection = () => {
  const themeHook = useTheme();

  return (
    <Box>
      {/* Fee Tier Progress */}
      <PanelCard
        title="Fee Tier Progress"
        subTitle="Your progress toward the next fee tier"
        showHeaderBorder={true}
        headerPadding={theme.spacing(2.5)}
        bodyPadding={theme.spacing(2.5)}
        sx={{ mb: 2.5 }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "15px",
              color: themeHook.palette.text.secondary,
              mb: 1.5,
              fontFamily: "UrbanistRegular",
            }}
          >
            Monthly Volume
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: themeHook.palette.text.primary,
              mb: 2,
              fontFamily: "UrbanistMedium",
            }}
          >
            $6 479,25 / $50,000
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                mb: 1.5,
              }}
            >
              {/* Completed bars */}
              {Array.from({ length: 13 }).map((_, i) => (
                <Box
                  key={`completed-${i}`}
                  sx={{
                    flex: 1,
                    height: "24px",
                    background: themeHook.palette.primary.main,
                    borderRadius: "4px",
                  }}
                />
              ))}
              {/* Remaining bars */}
              {Array.from({ length: 87 }).map((_, i) => (
                <Box
                  key={`remaining-${i}`}
                  sx={{
                    flex: 1,
                    height: "24px",
                    background: themeHook.palette.grey[200],
                    borderRadius: "4px",
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
                  color: themeHook.palette.text.primary,
                  fontFamily: "UrbanistMedium",
                }}
              >
                13.0% complete
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  color: themeHook.palette.text.secondary,
                  fontFamily: "UrbanistRegular",
                }}
              >
                $43 520.75 to next tier
              </Typography>
            </Box>
          </Box>

          {/* Current Tier Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.5,
              py: 0.75,
              borderRadius: "20px",
              background: "#ECFDF5",
              border: "1px solid #10B981",
            }}
          >
            <CheckCircle sx={{ fontSize: 16, color: "#10B981" }} />
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#10B981",
                fontFamily: "UrbanistMedium",
              }}
            >
              Current Tier: Standard
            </Typography>
          </Box>
        </Box>
      </PanelCard>

      {/* Upgrade to Premium Tier */}
      <PanelCard
        title="Upgrade to Premium Tier"
        subTitle="Lower fees (0.5%) and priority support"
        showHeaderBorder={true}
        headerPadding={theme.spacing(2.5)}
        bodyPadding={theme.spacing(2.5)}
        headerAction={
          <Box
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "#FFF4E6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkspacePremium sx={{ fontSize: 18, color: "#F59E0B" }} />
          </Box>
        }
      >
        <Box>
          <CustomButton
            label="Learn more"
            variant="primary"
            size="medium"
            endIcon={<ArrowOutward sx={{ fontSize: 16 }} />}
            sx={{
              width: "100%",
            }}
          />
        </Box>
      </PanelCard>
    </Box>
  );
};

export default DashboardRightSection;

