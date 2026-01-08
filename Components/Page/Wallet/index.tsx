import React, { useState, useCallback } from "react";
import CopyIcon from "@/assets/Icons/copy-icon.svg";
import EditIcon from "@/assets/Icons/edit-icon.svg";
import WalletIcon from "@/assets/Icons/home/wallet.svg";
import LinkIcon from "@/assets/Icons/link-icon.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import { Box, Typography, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Image from "next/image";
import { ArrowOutward } from "@mui/icons-material";
import { theme } from "@/styles/theme";
import { getCurrencySymbol, formatNumberWithComma } from "@/helpers";
import { useDispatch } from "react-redux";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { useTranslation } from "react-i18next";
import PanelCard from "@/Components/UI/PanelCard";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import {
  HeaderIcon,
  SetupWarnnigContainer,
  WalletCardBody,
  WalletCardBodyRow,
  WalletCopyButton,
  WalletEditButton,
  WalletHeaderAction,
  WalletLabel,
} from "./styled";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CustomButton from "@/Components/UI/Buttons";
import AddWalletModal from "@/Components/UI/AddWalletModal";
import { WarningIconContainer } from "@/Components/UI/AddWalletModal/styled";
import useIsMobile from "@/hooks/useIsMobile";
import { useWalletData } from "@/hooks/useWalletData";

interface WalletData {
  icon: any;
  walletTitle: string;
  walletAddress: string;
  name: string;
  totalProcessed: number;
}

const Wallet = () => {
  const isMobile = useIsMobile("md");
  const dispatch = useDispatch();
  const { t } = useTranslation("walletScreen");
  const tWallet = useCallback(
    (key: string): string => {
      const result = t(key, { ns: "walletScreen" });
      return typeof result === "string" ? result : String(result);
    },
    [t]
  );

  const [openEditModal, setOpenEditModal] = useState(false);

  const { walletData } = useWalletData();
  // const walletData = useMemo<WalletData[]>(
  //   () => [
  //     {
  //       icon: BitcoinIcon,
  //       walletTitle: tWallet("mainBitcoinWallet"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "BTC",
  //       totalProcessed: 125430.5,
  //     },
  //     {
  //       icon: EthereumIcon,
  //       walletTitle: tWallet("ethereumPayments"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "ETH",
  //       totalProcessed: 89234.2,
  //     },
  //     {
  //       icon: LitecoinIcon,
  //       walletTitle: tWallet("litecoinWallet"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "LTC",
  //       totalProcessed: 45678.9,
  //     },
  //     {
  //       icon: BNBIcon,
  //       walletTitle: tWallet("bnbWallet"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "BNB",
  //       totalProcessed: 125430.5,
  //     },
  //     {
  //       icon: DogecoinIcon,
  //       walletTitle: tWallet("dogecoinWallet"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "DOGE",
  //       totalProcessed: 89234.2,
  //     },
  //     {
  //       icon: BitcoinCashIcon,
  //       walletTitle: tWallet("bitcoinCashWallet"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "BCH",
  //       totalProcessed: 45678.9,
  //     },
  //     {
  //       icon: TronIcon,
  //       walletTitle: tWallet("tronWallet"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "TRX",
  //       totalProcessed: 125430.5,
  //     },
  //     {
  //       icon: USDTIcon,
  //       walletTitle: tWallet("usdtWallet"),
  //       walletAddress: "1A1zP1ePSQGeF2DMPTTTLSSLmv7DvfNo",
  //       name: "USDT",
  //       totalProcessed: 89234.2,
  //     },
  //   ],
  //   [tWallet]
  // );

  const copyAddressToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    dispatch({
      type: TOAST_SHOW,
      payload: {
        message: tWallet("addressCopied"),
        severity: "success",
      },
    });
  };

  const handleViewTransactions = (wallet: WalletData) => {
    console.log("View transactions for:", wallet.walletTitle);
  };

  const handleEdit = (wallet: WalletData) => {
    console.log("Edit wallet:", wallet.walletTitle);
    setOpenEditModal(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        mt: isMobile ? 1 : 0
      }}
    >
      <SetupWarnnigContainer>
        <WarningIconContainer>
          <Image
            src={InfoIcon}
            alt="info icon"
            width={16}
            height={16}
            draggable={false}
            style={{ filter: "brightness(0)" }}
          />
        </WarningIconContainer>
        <Box>
          <Typography sx={{ fontFamily: "UrbanistSemibold", fontWeight: "600", fontSize: isMobile ? "10px" : "15px", lineHeight: "130%", letterSpacing: 0 }}>Complete wallet setup</Typography>
          <Typography sx={{ fontFamily: "UrbanistMedium", fontWeight: "500", fontSize: isMobile ? "10px" : "15px", lineHeight: "130%", letterSpacing: 0 }}>Please add all eight crypto wallet addresses. Some features will remain unavailable until all wallets are added.</Typography>
        </Box>
      </SetupWarnnigContainer>
      <Grid container spacing={isMobile ? 2 : 2.5}>
        {walletData.map((wallet, index) => (
          <Grid item xs={12} md={6} xl={4} key={index}>
            <PanelCard
              title={wallet.walletTitle}
              headerIcon={
                <HeaderIcon>
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    draggable={false}
                  />
                </HeaderIcon>
              }
              showHeaderBorder={false}
              headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
              bodyPadding={theme.spacing(3, 2.5, 2.5, 2.5)}
              headerAction={
                <WalletHeaderAction>
                  <Image
                    src={wallet?.icon}
                    alt={wallet.name}
                    draggable={false}
                  />
                  <span>{wallet.name === "USDT-TRC20" ? "USDT" : wallet.name}</span>
                </WalletHeaderAction>
              }
            >
              <WalletCardBody>
                <WalletCardBodyRow>
                  <InputField
                    value={wallet.walletAddress}
                    readOnly
                    label={
                      <WalletLabel>
                        <Image src={LinkIcon} alt="Address" draggable={false} />
                        <span>{tWallet("address")}</span>
                      </WalletLabel>
                    }
                    sx={{
                      width: "100%",
                      gap: 1.25,
                    }}
                  />
                  <WalletCopyButton onClick={() => copyAddressToClipboard(wallet.walletAddress)}>
                    <Image src={CopyIcon} alt="Copy" draggable={false} />
                  </WalletCopyButton>
                </WalletCardBodyRow>
                <WalletCardBodyRow>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
                  >
                    <WalletLabel>
                      <Image
                        src={RoundedStackIcon}
                        alt="Total processed"
                        draggable={false}
                      />
                      <span>{tWallet("totalProcessed")}</span>
                    </WalletLabel>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        lineHeight: "24px",
                        fontFamily: "UrbanistMedium",
                      }}
                    >
                      {getCurrencySymbol(
                        "USD",
                        formatNumberWithComma(wallet.totalProcessed)
                      )}
                    </Typography>
                  </Box>
                </WalletCardBodyRow>

                <WalletCardBodyRow>
                  <CustomButton
                    label={tWallet("viewTransactions")}
                    variant="outlined"
                    endIcon={<ArrowOutward sx={{ fontSize: 16 }} />}
                    sx={{
                      backgroundColor: theme.palette.common.white,
                      color: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: "6px",
                      fontSize: "15px",
                      fontWeight: 500,
                      fontFamily: "UrbanistMedium",
                      lineHeight: "18px",
                      "&:hover": {
                        backgroundColor: theme.palette.common.white,
                        color: theme.palette.primary.main,
                        border: `1px solid ${theme.palette.primary.main}`,
                      },
                    }}
                  />

                  <WalletEditButton onClick={() => handleEdit(wallet)}>
                    <Image
                      src={EditIcon.src}
                      alt="View Transactions"
                      width={16}
                      height={16}
                      draggable={false}
                    />
                  </WalletEditButton>
                </WalletCardBodyRow>
              </WalletCardBody>
            </PanelCard>
          </Grid>
        ))}
      </Grid>

      {/* <Dialog
        open={true}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: "12px" }
        }}
      >
        <DialogContent sx={{ px: "30px", pt: "30px" }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Image src={WalletIcon} alt="wallet" width={14} height={14} />
            <Typography
              sx={{
                fontFamily: "UrbanistMedium",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "100%"
              }}
            >
              You Don’t Have Active Wallets
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "140%",
              mt: "12px",
              color: "#676768"
            }}
          >
            You have to have at least one wallet address added in order to proceed.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: "30px",
            pb: "30px",
            display: "flex",
            gap: "12px"
          }}
        >
          <Button
            fullWidth
            sx={{
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
              fontSize: "15px",
              color: "#676768",
              border: "1px solid #E9ECF2",
              py: "11px",
              borderRadius: "6px"
            }}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            sx={{
              fontFamily: "UrbanistMedium",
              fontWeight: 500,
              fontSize: "15px",
              color: "#FFFFFF",
              backgroundColor: "#0004FF",
              py: "11px",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#0003cc"
              }
            }}
          >
            Go to Wallets
          </Button>
        </DialogActions>
      </Dialog> */}

      <AddWalletModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </Box>
  );
};

export default Wallet;