import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PopupModal from "@/Components/UI/PopupModal";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CryptocurrencySelector from "@/Components/UI/CryptocurrencySelector";
import CustomButton from "@/Components/UI/Buttons";
import Image from "next/image";
import WalletIcon from "@/assets/Icons/wallet-icon.svg";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import LoadingIcon from "@/assets/Icons/LoadingIcon";
import OtpDialog from "@/Components/UI/OtpDialog";
import { theme } from "@/styles/theme";
import useIsMobile from "@/hooks/useIsMobile";
import axiosBaseApi from "@/axiosConfig";
import { verifyOtp } from "@/Redux/Sagas/WalletSaga";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { rootReducer } from "@/utils/types";
import {
  ModalHeader,
  ModalHeaderContent,
  ModalSubtitle,
  WarningContainer,
  WarningIconContainer,
  WarningContent,
  ModalActions,
} from "./styled";
import PanelCard from "../PanelCard";

export interface AddWalletModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    walletName: string;
    cryptocurrency: string;
    walletAddress: string;
  }) => void;
  fiatData?: any[];
  cryptoData?: any[];
  onWalletAdded?: () => void;
}

type Address = {
  wallet_address: string;
  currency: string;
};

const AddWalletModal: React.FC<AddWalletModalProps> = ({
  open,
  onClose,
  onSubmit,
  fiatData = [],
  cryptoData = [],
  onWalletAdded,
}) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: rootReducer) => state.userReducer);
  const isMobile = useIsMobile("sm");
  const [walletName, setWalletName] = useState("");
  const [cryptocurrency, setCryptocurrency] = useState("BTC");
  const [walletAddress, setWalletAddress] = useState("");
  const [errors, setErrors] = useState<{
    walletName?: string;
    cryptocurrency?: string;
    walletAddress?: string;
  }>({});
  const [popupLoading, setPopupLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showOtpLoader, setShowOtpLoader] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Validating wallet address..."
  );
  const [address, setAddress] = useState<Address | null>(null);
  const [otpError, setOtpError] = useState<string>("");

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!walletName.trim()) {
      newErrors.walletName = "Wallet name is required";
    }

    if (!cryptocurrency) {
      newErrors.cryptocurrency = "Cryptocurrency is required";
    }

    if (!walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset loader state when OTP modal closes
  useEffect(() => {
    if (!otpModalOpen) {
      setShowOtpLoader(false);
      setOtpError("");
    }
  }, [otpModalOpen]);

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      setPopupLoading(true);

      const values = {
        wallet_address: walletAddress.trim(),
        currency: cryptocurrency,
      };

      const response: any = await axiosBaseApi.post(
        "/wallet/validateWalletAddress",
        values
      );

      if (response.status !== 200 || response.error) {
        dispatch({
          type: TOAST_SHOW,
          payload: {
            message: response?.data?.message ?? "Failed to add wallet address",
            severity: "error",
          },
        });
        setPopupLoading(false);
        return;
      }

      setAddress(values);
      setPopupLoading(false);
      setShowOtpLoader(true);

      // Simulate loading time with changing messages
      const messages = [
        "Validating wallet address...",
        "Checking address format...",
        "Generating OTP...",
        "Almost done...",
      ];

      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (messageIndex < messages.length) {
          setLoadingMessage(messages[messageIndex]);
          messageIndex++;
        }
      }, 1000);

      // Show OTP modal after 2 seconds
      setTimeout(() => {
        clearInterval(messageInterval);
        setShowOtpLoader(false);
        setOtpModalOpen(true);
        setLoadingMessage("Validating wallet address...");
      }, 2000);
    } catch (error: any) {
      console.error("Error adding wallet address:", error);
      dispatch({
        type: TOAST_SHOW,
        payload: {
          message:
            error?.response?.data?.message ??
            error.message ??
            "Something went wrong",
          severity: "error",
        },
      });
      setPopupLoading(false);
    }
  };

  const handleOtpVerify = async (otp: string) => {
    setOtpLoading(true);
    setOtpError("");

    let currencyType: "FIAT" | "CRYPTO" | null = null;

    if (fiatData.some((item) => item.wallet_type === address?.currency)) {
      currencyType = "FIAT";
    } else if (
      cryptoData.some((item) => item.wallet_type === address?.currency)
    ) {
      currencyType = "CRYPTO";
    }

    try {
      const response = await verifyOtp({
        otp: otp,
        wallet_address: address?.wallet_address,
        currency: address?.currency,
        currency_type: currencyType,
      });

      if (response.status) {
        setOtpModalOpen(false);
        setAddress(null);
        handleClose();
        onWalletAdded?.();
        dispatch({
          type: TOAST_SHOW,
          payload: {
            message: response?.message,
            severity: "success",
          },
        });
      } else {
        setOtpError(response?.message || "Invalid OTP. Please try again.");
        dispatch({
          type: TOAST_SHOW,
          payload: {
            message: response?.message || "OTP verification failed",
            severity: "error",
          },
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "OTP verification failed";
      setOtpError(errorMessage);
      dispatch({
        type: TOAST_SHOW,
        payload: {
          message: errorMessage,
          severity: "error",
        },
      });
      console.error("OTP verification failed:", error);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!address) return;

    try {
      setOtpError("");
      const response: any = await axiosBaseApi.post(
        "/wallet/validateWalletAddress",
        address
      );

      if (response.status === 200 && !response.error) {
        dispatch({
          type: TOAST_SHOW,
          payload: {
            message: "OTP has been resent to your email",
            severity: "success",
          },
        });
      } else {
        dispatch({
          type: TOAST_SHOW,
          payload: {
            message: response?.data?.message ?? "Failed to resend OTP",
            severity: "error",
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: TOAST_SHOW,
        payload: {
          message: error?.response?.data?.message ?? "Failed to resend OTP",
          severity: "error",
        },
      });
    }
  };

  const handleClose = () => {
    setWalletName("");
    setCryptocurrency("BTC");
    setWalletAddress("");
    setErrors({});
    setPopupLoading(false);
    setOtpModalOpen(false);
    setShowOtpLoader(false);
    setAddress(null);
    onClose();
  };

  return (
    <PopupModal
      open={open}
      handleClose={handleClose}
      showHeader={false}
      hasFooter={false}
      transparent={true}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "481px",
          minWidth: "481px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
        },
      }}
    >
      <PanelCard
        title="Add New Wallet"
        showHeaderBorder={false}
        headerIcon={
          <Image
            src={WalletIcon}
            alt="wallet icon"
            width={14}
            height={14}
            draggable={false}
          />
        }
        bodyPadding={theme.spacing(1.5, 3.75, 3.75, 3.75)}
        headerPadding={theme.spacing(3.75, 3.75, 0, 3.75)}
        headerActionLayout="inline"
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: "UrbanistMedium",
            lineHeight: "1.5",
            mb: "10px",
          }}
        >
          Add a cryptocurrency wallet address to receive payments
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputField
            label="Wallet Name"
            placeholder="e.g.: Main Bitcoin Wallet"
            value={walletName}
            onChange={(e) => {
              setWalletName(e.target.value);
            }}
            error={!!errors.walletName}
            helperText={errors.walletName}
          />
          <CryptocurrencySelector
            label="Cryptocurrency"
            value={cryptocurrency}
            onChange={(value) => {
              setCryptocurrency(value);
            }}
            error={!!errors.cryptocurrency}
            helperText={errors.cryptocurrency}
          />
          <InputField
            label="Wallet Address"
            placeholder="Enter the wallet address"
            value={walletAddress}
            onChange={(e) => {
              setWalletAddress(e.target.value);
              if (errors.walletAddress) {
                setErrors({ ...errors, walletAddress: undefined });
              }
            }}
            error={!!errors.walletAddress}
            helperText={errors.walletAddress}
          />

          <WarningContainer>
            <WarningIconContainer>
              <Image
                src={InfoIcon}
                alt="info icon"
                width={16}
                height={16}
                draggable={false}
              />
            </WarningIconContainer>
            <WarningContent>
              <p>
                Please check the wallet address carefully. Transactions cannot
                be reversed
              </p>
            </WarningContent>
          </WarningContainer>
        </Box>
        <Box sx={{ display: "flex", gap: "20px", mt: "20px" }}>
          <CustomButton
            label="Cancel"
            variant="outlined"
            onClick={handleClose}
            sx={{ flex: 1 }}
          />
          <CustomButton
            label={popupLoading ? "Processing..." : "Continue"}
            variant="primary"
            onClick={handleSubmit}
            disabled={popupLoading}
            sx={{ flex: 1 }}
          />
        </Box>
      </PanelCard>

      {/* <PopupModal
        open={showOtpLoader}
        showClose={false}
        handleClose={() => {}}
        headerText={"Processing..."}
      >
        <Box sx={{ minWidth: "350px", maxWidth: "400px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              textAlign: "center",
            }}
          >
            <LoadingIcon size={60} />
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              {loadingMessage}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we process your request...
            </Typography>
          </Box>
        </Box>
      </PopupModal> */}

      {/* <OtpDialog
        open={otpModalOpen}
        onClose={() => {
          setOtpModalOpen(false);
          setOtpError("");
        }}
        title="Email Verification"
        subtitle="We've sent a verification code to your email."
        contactInfo={userState.email}
        contactType="email"
        otpLength={6}
        onVerify={handleOtpVerify}
        onResendCode={handleResendCode}
        loading={otpLoading}
        error={otpError}
        onClearError={() => setOtpError("")}
        countdown={0}
      /> */}
    </PopupModal>
  );
};

export default AddWalletModal;
