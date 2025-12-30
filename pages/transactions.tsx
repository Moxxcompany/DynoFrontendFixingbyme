import CustomDatePicker from "@/Components/UI/DatePicker";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { pageProps } from "@/utils/types";
import TransactionPage from "@/Components/Page/Transactions";

const TransactionsPage = ({
  setPageName,
  setPageDescription,
  setPageAction,
}: pageProps) => {
  useEffect(() => {
    if (setPageName && setPageDescription) {
      setPageName("Transactions");
      setPageDescription("View and manage all crypto payment transactions");
    }
  }, [setPageName, setPageDescription]);
  return (
    <div>
      {/* <CustomDatePicker /> */}

      <TransactionPage />
    </div>
  );
};

export default TransactionsPage;
