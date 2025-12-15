import withAuth from "@/Components/Page/Common/HOC/withAuth";
import { LayoutProps, rootReducer } from "@/utils/types";
import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import useTokenData from "@/hooks/useTokenData";
import Header from "@/Components/Layout/Header";
import SideBar from "@/Components/Layout/Sidebar";
import Toast from "@/Components/UI/Toast";
import { useSelector } from "react-redux";
import NewHeader from "@/Components/Layout/NewHeader";
import NewSidebar from "@/Components/Layout/NewSidebar";
import MobileNavigationBar from "@/Components/Layout/MobileNavigationBar";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "./styled";

const ClientLayout = ({
  children,
  pageName,
  pageDescription,
  component,
}: LayoutProps) => {
  const theme = useTheme();
  const tokenData = useTokenData();
  const ToastState = useSelector((state: rootReducer) => state.toastReducer);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden", // 🔒 prevent page scroll
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toast
        open={ToastState.open}
        message={ToastState.message}
        severity={ToastState.severity || "success"}
        loading={ToastState.loading}
      />

      <Box sx={{ px: { xs: 2, md: 3 }, pt: 3 }}>
        <NewHeader />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: "hidden", // important
          px: { xs: 2, lg: 3 },
          pb: { xs: 10, lg: 3 }, // Add bottom padding on mobile for bottom nav
          mt: 3,
        }}
      >
        <Grid container spacing={3} sx={{ height: "100%" }}>
          {/* Desktop Sidebar */}
          <Grid
            item
            xs={0}
            md={3}
            lg={2.5}
            sx={{
              height: "100%",
              overflow: "hidden",
              display: { xs: "none", lg: "block" },
            }}
          >
            <NewSidebar />
          </Grid>

          {/* Main Content */}
          <Grid
            item
            xs={12}
            md={12}
            lg={9.5}
            sx={{
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {(pageName || pageDescription) && (
              <PageHeader sx={{ pt: 0, pb: 1, mb: 0 }}>
                {pageName && (
                  <PageHeaderTitle variant="h1">{pageName}</PageHeaderTitle>
                )}
                {pageDescription && (
                  <PageHeaderDescription variant="body1">
                    {pageDescription}
                  </PageHeaderDescription>
                )}
              </PageHeader>
            )}
            {children}
          </Grid>
        </Grid>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Box
        sx={{
          display: { xs: "block", lg: "none" },
        }}
      >
        <MobileNavigationBar />
      </Box>
    </Box>
  );
};

export default withAuth(ClientLayout);

{
  /* <Box component="nav" sx={{ sm: "block", xs: "none" }}>
          <Drawer
            variant="permanent"
            sx={{
              display: { lg: "block", xs: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                overflow: "hidden",
                background: theme.palette.primary.main,
                "&::-webkit-scrollbar": {
                  width: 0,
                },
              },
            }}
          >
            <SideBar handleDrawerToggle={() => {}} />
          </Drawer>
        </Box> */
}
