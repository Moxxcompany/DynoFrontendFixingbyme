import axiosBaseApi from "@/axiosConfig";
import BrandLogo from "@/Components/Layout/BrandLogo";
import paymentAuth from "@/Components/Page/Common/HOC/paymentAuth";
import BankTransferComponent from "@/Components/Page/Payment/BankTransferComponent";

import CardComponent from "@/Components/Page/Payment/CardComponent";
import { createEncryption } from "@/helpers";
import useTokenData from "@/hooks/useTokenData";
import { rootReducer } from "@/utils/types";

import {
  AccountBalanceRounded,
  CreditCardRounded,
  CurrencyBitcoinRounded,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useSelector } from "react-redux";

export interface BankTransferApiRes {
  data: {
    mode: "banktransfer";
    transfer_account: string;
    transfer_bank: string;
    transfer_note: string;
    transfer_amount: string;
  };
}

export interface transferDetails {
  transfer_account: string;
  transfer_bank: string;
  transfer_note: string;
  transfer_amount: string;
}

const paymentMethods = [
  { label: "Card", value: "CARD", icon: <CreditCardRounded /> },
  {
    label: "Bank Transfer (NGN)",
    value: "BANK_TRANSFER",
    icon: <AccountBalanceRounded />,
  },
  {
    label: "Bank Account",
    value: "BANK_ACCOUNT",
    icon: <AccountBalanceRounded />,
  },
  {
    label: "Crypto",
    value: "CRYPTO",
    icon: <CurrencyBitcoinRounded />,
  },
];

const Payment = () => {
  const theme = useTheme();
  const tokenData = useTokenData();
  const [paymentType, setPaymentType] = useState("BANK_TRANSFER");
  const [transferDetails, setTransferDetails] = useState<transferDetails>();

  const walletState = useSelector((state: rootReducer) => state.walletReducer);

  // useEffect(() => {
  //   if (paymentType === "BANK_TRANSFER") {
  //     initiateBankTransfer();
  //   }
  // }, [paymentType]);

  const initiateBankTransfer = async () => {
    const finalPayload = {
      paymentType,
      currency: walletState.currency,
      amount: walletState.amount,
    };
    const res = createEncryption(JSON.stringify(finalPayload));

    const {
      data: { data },
    }: { data: BankTransferApiRes } = await axiosBaseApi.post(
      "/wallet/addFunds",
      {
        data: res,
      }
    );
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
                  cursor: "pointer",
                  "&.activeBox": {
                    background: "#fff",
                    color: "text.primary",
                  },
                },
              }}
            >
              {paymentMethods.map((x, i) => (
                <Box
                  className={`paymentBox ${
                    paymentType === x.value && "activeBox"
                  }`}
                  key={x.value}
                  onClick={() => setPaymentType(x.value)}
                >
                  {x.icon}
                  <Typography>{x.label}</Typography>
                </Box>
              ))}
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
                <BrandLogo redirect={false} />
                <Typography>Standard Payment</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
                  {walletState.currency === "NGN" ? "₦" : "$"}
                  {walletState.amount}
                </Typography>
                <Typography sx={{ fontSize: 16 }}>
                  {tokenData?.email}
                </Typography>
              </Box>
            </Box>
            <Divider flexItem sx={{ my: 2 }} />
            {paymentType === "CARD" && <CardComponent />}
            {paymentType === "BANK_TRANSFER" && (
              <BankTransferComponent transferDetails={transferDetails} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// export default paymentAuth(Payment);
export default Payment;
