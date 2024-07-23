import { Box, Typography } from "@mui/material";
import React from "react";
import { transferDetails } from "../../../pages/payment/index";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { rootReducer } from "@/utils/types";

interface BankTransferProps {
  transferDetails?: transferDetails;
}

const BankTransferComponent = ({ transferDetails }: BankTransferProps) => {
  const theme = useTheme();
  const walletState = useSelector((state: rootReducer) => state.walletReducer);

  return (
    <Box>
      <Typography>
        Proceed to your bank app to complete this transfer
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
          mt: 2,
          background: theme.palette.secondary.main + "22",
          border: "1px solid #a2a2a2",
          borderRadius: "5px",
        }}
      >
        <Box>
          <Typography color={"text.disabled"}>Amount</Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 22 }}>
            {walletState.currency +
              " " +
              (transferDetails?.transfer_amount ?? walletState.amount)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BankTransferComponent;
