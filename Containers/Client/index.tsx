import withAuth from "@/Components/Page/Common/HOC/withAuth";
import { drawerWidth, toolbarHeight } from "@/styles/theme";
import { LayoutProps, rootReducer } from "@/utils/types";
import { Box, Drawer, useTheme } from "@mui/material";
import React from "react";
import useTokenData from "@/hooks/useTokenData";
import Header from "@/Components/Layout/Header";
import SideBar from "@/Components/Layout/Sidebar";
import Toast from "@/Components/UI/Toast";
import { useSelector } from "react-redux";
import NewHeader from "@/Components/Layout/NewHeader";
import NewSidebar from "@/Components/Layout/NewSidebar";

const ClientLayout = ({ children, pageName, component }: LayoutProps) => {
  const theme = useTheme();
  const tokenData = useTokenData();
  const ToastState = useSelector((state: rootReducer) => state.toastReducer);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
      }}
    >
      <Toast
        open={ToastState.open}
        message={ToastState.message}
        severity={ToastState.severity ?? "success"}
        loading={ToastState.loading}
      />

      <NewHeader />

      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ flexGrow: 1, width: "20%" }}>
          <NewSidebar />
        </Box>

        {/* <Header pageName={pageName} component={component} /> */}

        <Box
          component="main"
          sx={{
            width: "80%",
            // pt: 2.5,
            // px: { lg: 3, sm: 2.5, xs: 1.5 },
          }}
        >
          {/* Here Where the Pages will load */}
          {children}
        </Box>
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
