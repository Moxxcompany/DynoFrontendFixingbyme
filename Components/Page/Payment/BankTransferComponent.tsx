import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "@/utils/types";
import { generateRedirectUrl, getTime } from "@/helpers";
import LoadingIcon from "@/assets/Icons/LoadingIcon";
import axiosBaseApi from "@/axiosConfig";
import { useRouter } from "next/router";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { transferDetails } from "@/utils/types/paymentTypes";

interface BankTransferProps {
  transferDetails?: transferDetails;
}

const BankTransferComponent = ({ transferDetails }: BankTransferProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const walletState = useSelector((state: rootReducer) => state.walletReducer);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (transferDetails) {
      setLoading(false);
    }
  }, [transferDetails]);

  const handleSubmit = async () => {
    try {
      const {
        data: { data },
      } = await axiosBaseApi.post("/wallet/verifyPayment", {
        uniqueRef: transferDetails?.hash,
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
      <Typography>
        Proceed to your bank app to complete this transfer
      </Typography>
      {loading ? (
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
                {walletState.currency +
                  " " +
                  (transferDetails?.transfer_amount ?? walletState.amount)}
              </Typography>
            </Box>
            <Box>
              <Typography className="topText">Account Number</Typography>
              <Typography className="mainText">
                {transferDetails?.transfer_account ?? "00000"}
              </Typography>
            </Box>
            <Box>
              <Typography className="topText">Bank Name</Typography>
              <Typography className="mainText">
                {transferDetails?.transfer_bank ?? "Bank"}
              </Typography>
            </Box>
            <Box>
              <Typography className="topText">Note</Typography>
              <Typography className="mainText">
                {transferDetails?.transfer_note ?? "Bank"}
              </Typography>
            </Box>
            <Divider />
            <Typography fontSize={14}>
              The account details only valid for specific transaction and
              it&apos;ll expire by{" "}
              <Typography component={"span"} fontSize={14} fontWeight={700}>
                {getTime(transferDetails?.account_expiration)}(Today)
              </Typography>
            </Typography>
          </Box>
          <Button variant="rounded" sx={{ mt: 3 }} onClick={handleSubmit}>
            I have made this bank transfer
          </Button>
        </>
      )}
    </Box>
  );
};

export default BankTransferComponent;
