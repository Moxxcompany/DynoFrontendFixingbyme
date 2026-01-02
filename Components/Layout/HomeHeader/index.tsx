import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const HomeHeader = () => {
  const HeaderItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Terms & Conditions",
      href: "/terms-conditions",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "AML Policy",
      href: "/aml-policy",
    },
    {
      label: "API Status",
      href: "/api-status",
    },
  ];
  const router = useRouter();
  return (
    <Box>
      <Grid container spacing={2}>
        {HeaderItems.map((item) => (
          <Grid item key={item.href}>
            <Button
              variant="text"
              color="primary"
              onClick={() => router.push(item.href)}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeHeader;
