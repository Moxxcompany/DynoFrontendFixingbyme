import React from "react";
import Image from "next/image";
import HomeCard from "@/Components/UI/HomeCard";
import { Box, Grid, Typography } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import {
  FeatureIcon,
  GoLiveCount,
  GoLiveDescription,
  GoLiveTitle,
} from "@/Components/UI/HomeCard/styled";
import { homeTheme } from "@/styles/homeTheme";
import { ImageCenter } from "@/Containers/Login/styled";
import HomeSectionTitle from "@/Components/UI/SectionTitle";
import PaymentLinkSuccessImage from "@/assets/Images/home/payment-link-success.png";
import TransactionDashboardImage from "@/assets/Images/home/transaction-dashboard.png";
import WalletSelectorImage from "@/assets/Images/home/wallet-selector.png";
import APIKeyImage from "@/assets/Images/home/api-key.png";
import ProgressCounterImage from "@/assets/Images/home/progress-counter.png";
import WebhookInfoImage from "@/assets/Images/home/webhook-info.png";
import LinkIcon from "@/assets/Icons/home/link-icon.svg";
import DashboardIcon from "@/assets/Icons/home/dashboard-icon.svg";
import WalletIcon from "@/assets/Icons/home/wallet-icon.svg";
import APIKeyIcon from "@/assets/Icons/home/code-icon.svg";
import ProgressCounterIcon from "@/assets/Icons/home/trend-down-icon.svg";
import WebhookIcon from "@/assets/Icons/home/webhook-icon.svg";

const FeaturesSection = () => {
  const isMobile = useIsMobile("md");
  return (
    <section
      style={{
        padding: "83px 0px",
      }}
    >
      {/* Go Live Section Title */}
      <HomeSectionTitle
        type="small"
        badgeText="Features"
        title="All you need for your business"
        highlightText="your business"
        subtitle="Focus on your business and let us manage your crypto payment processes for you."
        sx={{ maxWidth: "100%" }}
      />
      {/* Go Live Section Cards */}
      <Box
        sx={{
          paddingTop: isMobile ? 5 : 8,
          paddingX: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <HomeCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  padding: isMobile ? 2 : "33px 32px 18px",
                  overflow: "hidden",
                }}
              >
                <FeatureIcon>
                  <Image
                    src={LinkIcon}
                    alt="link icon"
                    width={24}
                    height={24}
                  />
                </FeatureIcon>

                <GoLiveTitle sx={{ marginTop: 2 }}>
                  No-Code Payment Links
                </GoLiveTitle>
                <GoLiveDescription sx={{ marginTop: 1.5 }}>
                  Simple way to send a payment request without any technical
                  setup.
                </GoLiveDescription>

                <ImageCenter
                  sx={{
                    cursor: "default",
                    marginTop: isMobile ? "29px" : "25px",
                    position: "relative",
                    height: "373px",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={PaymentLinkSuccessImage}
                    alt="payment link success"
                    fill={true}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    draggable={false}
                  />
                </ImageCenter>
              </Box>
            </HomeCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <HomeCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  padding: isMobile ? 2 : "33px 32px 30px",
                }}
              >
                <FeatureIcon>
                  <Image
                    src={DashboardIcon}
                    alt="dashboard icon"
                    width={24}
                    height={24}
                  />
                </FeatureIcon>

                <GoLiveTitle sx={{ marginTop: 2 }}>
                  Full Transaction Dashboard
                </GoLiveTitle>
                <GoLiveDescription sx={{ marginTop: 1.5 }}>
                  Real-time tracking of all crypto payments with detailed
                  insights.
                </GoLiveDescription>

                <ImageCenter
                  sx={{
                    cursor: "default",
                    marginTop: isMobile ? "29px" : "25px",
                    position: "relative",
                    height: "373px",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={TransactionDashboardImage}
                    alt="transaction dashboard"
                    fill={true}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    draggable={false}
                  />
                </ImageCenter>
              </Box>
            </HomeCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <HomeCard>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    padding: isMobile ? 2 : "33px 32px 0px",
                  }}
                >
                  <FeatureIcon>
                    <Image
                      src={WalletIcon}
                      alt="wallet icon"
                      width={24}
                      height={24}
                    />
                  </FeatureIcon>

                  <GoLiveTitle sx={{ marginTop: 2 }}>
                    Multiple Wallets Per Company
                  </GoLiveTitle>
                  <GoLiveDescription sx={{ marginTop: 1.5 }}>
                    Manage all your crypto assets in one unified place.
                  </GoLiveDescription>

                  <ImageCenter
                    sx={{
                      cursor: "default",
                      marginTop: isMobile ? "29px" : "25px",
                      position: "relative",
                      height: "373px",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={WalletSelectorImage}
                      alt="wallet selector"
                      fill={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      draggable={false}
                    />
                  </ImageCenter>
                </Box>
              </HomeCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <HomeCard>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    padding: isMobile ? 2 : "33px 32px 0px",
                  }}
                >
                  <FeatureIcon>
                    <Image
                      src={APIKeyIcon}
                      alt="api key icon"
                      width={24}
                      height={24}
                    />
                  </FeatureIcon>

                  <GoLiveTitle sx={{ marginTop: 2 }}>
                    Developer-Friendly API
                  </GoLiveTitle>
                  <GoLiveDescription sx={{ marginTop: 1.5 }}>
                    Clean keys management and comprehensive documentation.
                  </GoLiveDescription>

                  <ImageCenter
                    sx={{
                      cursor: "default",
                      marginTop: isMobile ? "29px" : "25px",
                      position: "relative",
                      height: "373px",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={APIKeyImage}
                      alt="api key"
                      fill={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      draggable={false}
                    />
                  </ImageCenter>
                </Box>
              </HomeCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <HomeCard>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    padding: isMobile ? 2 : "33px 32px 0px",
                  }}
                >
                  <FeatureIcon>
                    <Image
                      src={ProgressCounterIcon}
                      alt="progress counter icon"
                      width={24}
                      height={24}
                    />
                  </FeatureIcon>

                  <GoLiveTitle sx={{ marginTop: 2 }}>
                    Fee Management That Makes Sense
                  </GoLiveTitle>
                  <GoLiveDescription sx={{ marginTop: 1.5 }}>
                    Transparent tier system and real-time fee monitoring.
                  </GoLiveDescription>

                  <ImageCenter
                    sx={{
                      cursor: "default",
                      marginTop: isMobile ? "29px" : "25px",
                      position: "relative",
                      height: "373px",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={ProgressCounterImage}
                      alt="progress counter"
                      fill={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      draggable={false}
                    />
                  </ImageCenter>
                </Box>
              </HomeCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <HomeCard>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    padding: isMobile ? 2 : "33px 32px 0px",
                  }}
                >
                  <FeatureIcon>
                    <Image
                      src={WebhookIcon}
                      alt="webhook icon"
                      width={24}
                      height={24}
                    />
                  </FeatureIcon>

                  <GoLiveTitle sx={{ marginTop: 2 }}>
                    Instant Callbacks & Webhooks
                  </GoLiveTitle>
                  <GoLiveDescription sx={{ marginTop: 1.5 }}>
                    For businesses that need automation and real-time updates.
                  </GoLiveDescription>

                  <ImageCenter
                    sx={{
                      cursor: "default",
                      marginTop: isMobile ? "29px" : "25px",
                      position: "relative",
                      height: "373px",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={WebhookInfoImage}
                      alt="webhook info"
                      fill={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      draggable={false}
                    />
                  </ImageCenter>
                </Box>
              </HomeCard>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default FeaturesSection;
