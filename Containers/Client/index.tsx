import withAuth from "@/Components/Page/Common/HOC/withAuth";
import { toolbarHeight } from "@/styles/theme";
import { LayoutProps } from "@/utils/types";
import { Box, useTheme } from "@mui/material";
import React from "react";
import useTokenData from "@/hooks/useTokenData";
import Header from "@/Components/Layout/Header";
import { drawerWidth } from "@/Components/Layout/SideBar";

const ClientLayout = ({ children, pageName, component }: LayoutProps) => {
  const theme = useTheme();
  const tokenData = useTokenData();

  return (
    <>
      {/* <Box component="nav" sx={{ sm: "block", xs: "none" }}>
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
      </Box> */}
      <Box
        sx={{
          width: { lg: `calc(100vw - ${drawerWidth}px)`, xs: "100vw" },
          ml: { lg: `${drawerWidth}px`, xs: 0 },
          // mt: { sm: `${toolbarHeight}px`, xs: `${toolbarHeight * 2 - 5}px` },
        }}
      >
        <Header pageName={pageName} component={component} />
        <Box
          component="main"
          sx={{
            pt: 2.5,
            px: { lg: 3, sm: 2.5, xs: 1.5 },
          }}
        >
          {/* Here Where the Pages will load */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default withAuth(ClientLayout);
