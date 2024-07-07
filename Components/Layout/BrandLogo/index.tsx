import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

const BrandLogo = () => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          mt: 2,
          display: { lg: "block", xs: "none" },
          "& img": {
            width: "40px",
            height: "auto",
          },
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        {/* <img src={Logo.src} alt="no logo" /> */}
        <Typography sx={{ fontSize: "45px" }}>D</Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: { lg: "none", xs: "block" },
          "& img": {
            width: "180px",
            height: "auto",
          },
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        {/* <img src={Logo2.src} alt="no logo" /> */}
      </Box>
    </>
  );
};

export default BrandLogo;
