import PanelCard from "@/Components/UI/PanelCard";
import CustomSwitch from "@/Components/UI/CustomSwitch";
import CustomButton from "@/Components/UI/Buttons";
import { theme } from "@/styles/theme";
import { Box, IconButton, Typography, Grid, Divider } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

import BellIcon from "@/assets/Icons/bell-icon.svg";
import MobileIcon from "@/assets/Icons/mobile-icon.svg";
import EnvelopeIcon from "@/assets/Icons/envelope-icon.svg";

interface NotificationItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  showDivider?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  checked,
  onChange,
  showDivider = true,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2.5,
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "UrbanistMedium",
              color: "#242428",
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontFamily: "UrbanistRegular",
              color: theme.palette.text.secondary,
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        </Box>
        <CustomSwitch 
          checked={checked} 
          onChange={(e, checked) => onChange(checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      </Box>
      {showDivider && (
        <Divider
          sx={{
            borderColor: theme.palette.border.main,
            my: 0,
          }}
        />
      )}
    </>
  );
};

const NotificationPage = () => {
  // Transaction Alerts state
  const [transactionUpdates, setTransactionUpdates] = useState(true);
  const [paymentReceived, setPaymentReceived] = useState(false);

  // Weekly Reports state
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(false);

  // Email Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log("Saving notification preferences...");
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left Column - Two Cards Stacked */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Transaction Alerts Card */}
            <PanelCard
              title="Transaction Alerts"
              subTitle="Be notified about changes in transaction statuses"
              showHeaderBorder={false}
              bodyPadding={0}
              headerPadding={theme.spacing(2.5, 2.5, 2, 2.5)}
              headerAction={
                <IconButton
                  sx={{
                    padding: "8px",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Image
                    src={BellIcon.src}
                    alt="bell-icon"
                    width={20}
                    height={20}
                  />
                </IconButton>
              }
              sx={{ height: "100%" }}
            >
              <Box sx={{ px: 2.5, pb: 2.5 }}>
                <NotificationItem
                  title="Transaction Updates"
                  description="Receive notifications when transactions are confirmed or completed"
                  checked={transactionUpdates}
                  onChange={setTransactionUpdates}
                />
                <NotificationItem
                  title="Payment Received"
                  description="Be notified immediately when you receive a payment"
                  checked={paymentReceived}
                  onChange={setPaymentReceived}
                  showDivider={false}
                />
              </Box>
            </PanelCard>

            {/* Weekly Reports Card */}
            <PanelCard
              title="Weekly Reports"
              subTitle="Receive a weekly summary of your activities"
              showHeaderBorder={false}
              bodyPadding={0}
              headerPadding={theme.spacing(2.5, 2.5, 2, 2.5)}
              headerAction={
                <IconButton
                  sx={{
                    padding: "8px",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Image
                    src={MobileIcon.src}
                    alt="mobile-icon"
                    width={20}
                    height={20}
                  />
                </IconButton>
              }
              sx={{ height: "100%" }}
            >
              <Box sx={{ px: 2.5, pb: 2.5 }}>
                <NotificationItem
                  title="Weekly Summary"
                  description="Receive a weekly summary of your activities every Monday"
                  checked={weeklySummary}
                  onChange={setWeeklySummary}
                />
                <NotificationItem
                  title="Security Alerts"
                  description="Alerts for suspicious activity or security changes"
                  checked={securityAlerts}
                  onChange={setSecurityAlerts}
                  showDivider={false}
                />
              </Box>
            </PanelCard>
          </Box>
        </Grid>

        {/* Right Column - Single Taller Card */}
        <Grid item xs={12} md={6}>
          <PanelCard
            title="Email Notifications"
            subTitle="Receive email notifications for important events"
            showHeaderBorder={false}
            bodyPadding={0}
            headerPadding={theme.spacing(2.5, 2.5, 2, 2.5)}
            headerAction={
              <IconButton
                sx={{
                  padding: "8px",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <Image
                  src={EnvelopeIcon.src}
                  alt="envelope-icon"
                  width={20}
                  height={20}
                />
              </IconButton>
            }
            sx={{ height: "100%" }}
          >
            <Box sx={{ px: 2.5, pb: 2.5 }}>
              <NotificationItem
                title="Email Notifications"
                description="Receive important updates via email"
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
              <NotificationItem
                title="SMS notifications"
                description="Receive critical alerts via SMS"
                checked={smsNotifications}
                onChange={setSmsNotifications}
              />
              {/* Browser Notifications - Special Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2.5,
                }}
              >
                <Box sx={{ flex: 1, pr: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 500,
                      fontFamily: "UrbanistMedium",
                      color: "#242428",
                      mb: 0.5,
                    }}
                  >
                    Browser Notifications
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontFamily: "UrbanistRegular",
                      color: theme.palette.text.secondary,
                      lineHeight: 1.5,
                    }}
                  >
                    Receive notifications on your desktop
                  </Typography>
                </Box>
                <CustomButton
                  label="Activate"
                  variant="primary"
                  size="small"
                  endIcon={
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        ml: 0.5,
                      }}
                    >
                      →
                    </Box>
                  }
                  onClick={() => {
                    // TODO: Implement browser notification activation
                    console.log("Activating browser notifications...");
                  }}
                />
              </Box>
            </Box>
          </PanelCard>
        </Grid>
      </Grid>

      {/* Save Changes Button */}
      <Box
        sx={{
          mt: 4,
        }}
      >
        <CustomButton
          label="Save Changes"
          variant="primary"
          size="large"
          fullWidth
          onClick={handleSaveChanges}
        />
      </Box>
    </Box>
  );
};

export default NotificationPage;
