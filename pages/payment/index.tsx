import axiosBaseApi from "@/axiosConfig";
import BrandLogo from "@/Components/Layout/BrandLogo";

import CardComponent from "@/Components/Page/Payment/CardComponent";
import { createEncryption } from "@/helpers";

import {
  AccountBalanceRounded,
  CreditCardRounded,
  CurrencyBitcoinRounded,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export interface ApiRes {
  data: {
    mode: "redirect" | "pin" | "avs_noauth" | "otp";
    redirect: string;
    fields: string[];
  };
}

const Payment = () => {
  const theme = useTheme();

  const handleSubmit = async (values: any) => {
    const finalPayload = {
      ...values,
      paymentType: "CARD",
      currency: "USD",
      amount: 125,
    };
    const res = createEncryption(JSON.stringify(finalPayload));

    const {
      data: { data },
    }: { data: ApiRes } = await axiosBaseApi.post("/wallet/addFunds", {
      data: res,
    });
    console.log(data);
    if (data.mode === "pin") {
      console.log(data);
    } else if (data.mode === "avs_noauth") {
      console.log(data);
    } else {
      window.location.replace(data.redirect);
    }
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100vh" }} alignItems={"center"}>
        <Grid
          item
          md={3}
          sx={{
            background: theme.palette.primary.main,
            height: "inherit",
          }}
        >
          {/* <Box sx={{ textAlign: "center" }}>
            <BrandLogo />
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 0 5px #121212",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "#fff",
                gap: 2,
                "& .paymentBox": {
                  display: "flex",
                  gap: 1,
                  p: 3,
                  px: 5,
                  width: "100%",
                  "&.activeBox": {
                    background: "#fff",
                    color: "text.primary",
                  },
                },
              }}
            >
              <Box className="paymentBox activeBox">
                <CreditCardRounded />
                <Typography>Card</Typography>
              </Box>
              <Box className="paymentBox">
                <AccountBalanceRounded />
                <Typography>Bank</Typography>
              </Box>
              <Box className="paymentBox">
                <CurrencyBitcoinRounded />
                <Typography>Crypto</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              maxWidth: "750px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <BrandLogo />
                <Typography>Standard Payment</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
                  $125.99
                </Typography>
                <Typography sx={{ fontSize: 16 }}>temp@gmail.com</Typography>
              </Box>
            </Box>
            <Divider flexItem sx={{ my: 2 }} />
            <Typography>Enter your card details</Typography>
            <CardComponent cardData={handleSubmit} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
