import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "@/utils/types";
import { generateRedirectUrl } from "@/helpers";
import LoadingIcon from "@/assets/Icons/LoadingIcon";
import axiosBaseApi from "@/axiosConfig";
import { useRouter } from "next/router";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { CommonDetails } from "@/utils/types/paymentTypes";
import { NorthEastRounded } from "@mui/icons-material";

interface QRCodeProps {
  accountDetails?: CommonDetails;
}

const QRCodeComponent = ({ accountDetails }: QRCodeProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const walletState = useSelector((state: rootReducer) => state.walletReducer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accountDetails) {
      setLoading(false);
      console.log(accountDetails);
    }
  }, [accountDetails]);

  const handleSubmit = async () => {
    try {
      const {
        data: { data },
      } = await axiosBaseApi.post("/wallet/verifyPayment", {
        uniqueRef: accountDetails?.hash,
      });
      const redirectUri = generateRedirectUrl(data);
      window.location.replace(redirectUri);
    } catch (e: any) {
      const message = e.response.data.message ?? e.message;
      dispatch({
        type: TOAST_SHOW,
        payload: {
          message: message,
          severity: "error",
        },
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      {loading ? (
        <>
          <Typography>Please wait</Typography>
          <Box
            sx={{
              height: "375px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingIcon size={75} />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 3,
              mt: 2,
              background: theme.palette.secondary.main + "11",
              border: "1px solid #a2a2a2",
              borderRadius: "5px",
              gap: 2,
              "& .topText": {
                color: "text.disabled",
                fontSize: 12,
                textTransform: "uppercase",
              },
              "& .mainText": {
                fontWeight: 600,
                fontSize: 22,
              },
            }}
          >
            <Box>
              <Typography className="topText">Amount</Typography>
              <Typography className="mainText">
                {walletState.currency + " " + walletState.amount}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{}}>
                <img src={accountDetails?.qr_image} />
              </Box>
              <Typography textAlign={"center"}>
                Scan the QR Code above on your Bank’s mobile app to complete the
                payment.
              </Typography>
            </Box>
          </Box>
          <Button variant="rounded" sx={{ mt: 3 }} onClick={handleSubmit}>
            I have completed this payment
          </Button>
        </>
      )}
    </Box>
  );
};

export default QRCodeComponent;
