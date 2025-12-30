import React from "react";
import { Box } from "@mui/material";
import TransactionsTable, { Transaction } from "./TransactionsTable";
import TransactionsTopBar from "./TransactionsTopBar";

const TransactionPage = () => {
  // Sample transaction data matching the image
  const sampleTransactions: Transaction[] = [
    {
      id: "TX001",
      crypto: "BTC",
      amount: "0.0245 BTC",
      usdValue: "$1 250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
    },
    {
      id: "TX001",
      crypto: "LTC",
      amount: "0.0245 BTC",
      usdValue: "$1 250",
      dateTime: "07.11.2025 14:32:00",
      status: "pending",
    },
    {
      id: "TX001",
      crypto: "ETH",
      amount: "0.0245 BTC",
      usdValue: "$1 250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
    },
    {
      id: "TX001",
      crypto: "LTC",
      amount: "0.0245 BTC",
      usdValue: "$1 250",
      dateTime: "07.11.2025 14:32:00",
      status: "failed",
    },
    {
      id: "TX001",
      crypto: "BTC",
      amount: "0.0245 BTC",
      usdValue: "$1 250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
    },
    {
      id: "TX001",
      crypto: "ETH",
      amount: "0.0245 BTC",
      usdValue: "$1 250",
      dateTime: "07.11.2025 14:32:00",
      status: "done",
    },
  ];

  const handleSearch = (searchTerm: string) => {
    console.log("Search:", searchTerm);
    // Implement search logic
  };

  const handleDateRangeChange = (dateRange: any) => {
    console.log("Date range:", dateRange);
    // Implement date filter logic
  };

  const handleWalletChange = (wallet: string) => {
    console.log("Wallet:", wallet);
    // Implement wallet filter logic
  };

  const handleExport = () => {
    console.log("Export");
    // Implement export logic
  };

  return (
    <Box>
      <TransactionsTopBar
        onSearch={handleSearch}
        onDateRangeChange={handleDateRangeChange}
        onWalletChange={handleWalletChange}
        onExport={handleExport}
      />
      <TransactionsTable transactions={sampleTransactions} rowsPerPage={10} />
    </Box>
  );
};

export default TransactionPage;
