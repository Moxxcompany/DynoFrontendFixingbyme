import adminBaseApi from "@/axiosAdmin";
import PopupModal from "@/Components/UI/PopupModal";
import TextBox from "@/Components/UI/TextBox";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { pageProps } from "@/utils/types";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdminHome = ({ setPageName }: pageProps) => {
  const dispatch = useDispatch();

  const [transactionFee, setTransactionFee] = useState(0);
  const [fee, setFee] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPageName("Dashboard");
    getTransactionFee();
  }, []);

  const getTransactionFee = async () => {
    try {
      const {
        data: { data },
      } = await adminBaseApi.get("/admin/getTransactionFee");
      setTransactionFee(data.transaction_fee);
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

  const newTransactionFee = async () => {
    try {
      const {
        data: { data },
      } = await adminBaseApi.post("/admin/newTransactionFee", { fee });
      setTransactionFee(data.transaction_fee);
      setOpen(false);
      setFee(0);
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
    <Box>
      <PopupModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setFee(0);
        }}
        headerText={"Transaction Fee"}
        showClose
        confirmText="Change"
        hasFooter
        onConfirm={newTransactionFee}
      >
        <Box sx={{ minWidth: "350px" }}>
          <TextBox
            value={fee}
            onChange={(e: any) => setFee(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            label={"change fee"}
            autoFocus
          />
        </Box>
      </PopupModal>
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Transaction Fee : {transactionFee}%
        </Typography>
        <Button
          variant="rounded"
          sx={{ mt: 1 }}
          onClick={() => {
            setFee(transactionFee);
            setOpen(true);
          }}
        >
          Change
        </Button>
      </Box>
    </Box>
  );
};

export default AdminHome;
