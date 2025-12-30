import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomDatePicker, {
  DateRange,
  DatePickerRef,
} from "@/Components/UI/DatePicker";
import CustomButton from "@/Components/UI/Buttons";
import useIsMobile from "@/hooks/useIsMobile";
import {
  TransactionsTopBarContainer,
  DatePickerTriggerButton,
  WalletSelectorButton,
  SearchIconButton,
} from "./styled";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import { format } from "date-fns";
import SearchIcon from "@/assets/Icons/search-icon.svg";
import Image from "next/image";

interface TransactionsTopBarProps {
  onSearch?: (searchTerm: string) => void;
  onDateRangeChange?: (dateRange: DateRange) => void;
  onWalletChange?: (wallet: string) => void;
  onExport?: () => void;
}

const TransactionsTopBar: React.FC<TransactionsTopBarProps> = ({
  onSearch,
  onDateRangeChange,
  onWalletChange,
  onExport,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  const datePickerRef = useRef<DatePickerRef>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const walletButtonRef = useRef<HTMLButtonElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [selectedWallet, setSelectedWallet] = useState("all");
  const [walletMenuAnchor, setWalletMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleSearch = () => {
    onSearch?.(searchTerm);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    onDateRangeChange?.(range);
  };

  const handleWalletChange = (value: string) => {
    setSelectedWallet(value);
    setWalletMenuAnchor(null);
    onWalletChange?.(value);
  };

  const handleWalletButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setWalletMenuAnchor(e.currentTarget);
  };

  const handleWalletMenuClose = () => {
    setWalletMenuAnchor(null);
  };

  const handleCalendarButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    if (datePickerRef.current) {
      datePickerRef.current.open(e);
    }
  };

  const formatDateRange = (): string => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${format(dateRange.startDate, "MMM dd, yyyy")} - ${format(
        dateRange.endDate,
        "MMM dd, yyyy"
      )}`;
    }
    if (dateRange.startDate) {
      return format(dateRange.startDate, "MMM dd, yyyy");
    }
    return "Select date range";
  };

  const walletOptions = [
    { value: "all", label: "All Wallets" },
    { value: "wallet1", label: "Wallet 1" },
    { value: "wallet2", label: "Wallet 2" },
    { value: "wallet3", label: "Wallet 3" },
  ];

  return (
    <TransactionsTopBarContainer>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
        <InputField
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyPress}
        />
        <SearchIconButton onClick={handleSearch}>
          <Image src={SearchIcon} alt="search" width={20} height={20} />
        </SearchIconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            position: "relative",
          }}
        >
          <DatePickerTriggerButton
            ref={buttonRef}
            onClick={handleCalendarButtonClick}
          >
            <CalendarTodayIcon className="calendar-icon" />
            <Typography
              className="date-text"
              sx={{
                color:
                  dateRange.startDate && dateRange.endDate
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
              }}
            >
              {formatDateRange()}
            </Typography>
            <Box className="separator" />
            <KeyboardArrowDownIcon className="arrow-icon" />
          </DatePickerTriggerButton>
          <Box
            sx={{
              position: "absolute",
              width: 0,
              height: 0,
              overflow: "hidden",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <CustomDatePicker
              ref={datePickerRef}
              value={dateRange}
              onChange={handleDateRangeChange}
              hideTrigger={true}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            position: "relative",
          }}
        >
          <WalletSelectorButton
            ref={walletButtonRef}
            onClick={handleWalletButtonClick}
          >
            <AccountBalanceWalletIcon className="wallet-icon" />
            <Typography className="wallet-text">
              {walletOptions.find((opt) => opt.value === selectedWallet)
                ?.label || "All Wallets"}
            </Typography>
            <Box className="separator" />
            <KeyboardArrowDownIcon className="arrow-icon" />
          </WalletSelectorButton>
          <Menu
            anchorEl={walletMenuAnchor}
            open={Boolean(walletMenuAnchor)}
            onClose={handleWalletMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                mt: "8px",
                borderRadius: "8px",
                minWidth: "200px",
                boxShadow: "rgba(16, 24, 40, 0.12) 0px 8px 24px 0px",
                border: `1px solid ${theme.palette.border.main}`,
              },
            }}
          >
            {walletOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleWalletChange(option.value)}
                selected={selectedWallet === option.value}
                sx={{
                  fontSize: "14px",
                  fontFamily: "UrbanistMedium",
                  padding: "10px 16px",
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <CustomButton
          label="Export"
          startIcon={<DownloadIcon />}
          variant="secondary"
          onClick={onExport}
          sx={{
            padding: "10px 60px",
            minWidth: "auto",
          }}
        />
      </Box>
    </TransactionsTopBarContainer>
  );
};

export default TransactionsTopBar;
