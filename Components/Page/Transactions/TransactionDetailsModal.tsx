import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import PopupModal from "@/Components/UI/PopupModal";
import CustomButton from "@/Components/UI/Buttons";
import CopyIcon from "@/assets/Icons/copy-icon.svg";

import HashIcon from "@/assets/Icons/hash-icon.svg";
import RightArrowIcon from "@/assets/Icons/right-arrow-icon.svg";
import CorrectIcon from "@/assets/Icons/correct-icon.png";
import WrongIcon from "@/assets/Icons/wrong-icon.png";
import HourglassIcon from "@/assets/Icons/hourglass-icon.svg";
import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import BNBIcon from "@/assets/cryptocurrency/BNB-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";

import TransactionIcon from "@/assets/Icons/transaction-icon.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  SectionTitle,
  SectionTitleWithIcon,
  DetailRow,
  DetailLabel,
  DetailValue,
  StatusBadge,
  StatusIconWrapper,
  StatusText,
  CryptoIconWrapper,
  HashRow,
  HashValue,
  HashInputBox,
  ActionButtonGroup,
  CopyButton,
  ExplorerButton,
  WebhookResponseBox,
  SectionDivider,
  HeaderTitleRow,
  TitleColumn,
  TitleLabel,
  TitleValue,
} from "./TransactionDetailsModal.styled";
import PanelCard from "@/Components/UI/PanelCard";
import { CryptoIconChip } from "./styled";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import useIsMobile from "@/hooks/useIsMobile";
import SidebarIcon from "@/utils/customIcons/sidebar-icons";
import { HourGlassIcon } from "@/utils/customIcons";

export interface ExtendedTransaction {
  id: string;
  crypto: string;
  amount: string;
  usdValue: string;
  dateTime: string;
  status: "done" | "pending" | "failed";
  fees?: string;
  confirmations?: string;
  incomingTransactionId?: string;
  outgoingTransactionId?: string;
  callbackUrl?: string;
  webhookResponse?: {
    status: string;
    txid: string;
    amount: number;
    confirmations: number;
  };
}

interface TransactionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  transaction: ExtendedTransaction | null;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  open,
  onClose,
  transaction,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  if (!transaction) return null;

  const getCryptoIcon = (crypto: string) => {
    switch (crypto) {
      case "BTC":
        return BitcoinIcon;
      case "ETH":
        return EthereumIcon;
      case "LTC":
        return LitecoinIcon;
      case "BNB":
        return BNBIcon;
      case "DOGE":
        return DogecoinIcon;
      case "BCH":
        return BitcoinCashIcon;
      case "TRX":
        return TronIcon;
      case "USDT":
        return USDTIcon;
      default:
        return BitcoinIcon;
    }
  };

  const getStatusIcon = (status: "done" | "pending" | "failed") => {
    switch (status) {
      case "done":
        return <Image src={CorrectIcon} alt="correct" draggable={false} />;
      case "pending":
        return <HourGlassIcon fill={"#F57C00"} size={isMobile ? 12 : 16} />;
      case "failed":
        return <Image src={WrongIcon} alt="incorrect" draggable={false} />;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleViewOnExplorer = () => {
    // const explorerUrl = `https://blockchain.info/tx/${
    //   transaction.incomingTransactionId || transaction.id
    // }`;
    // window.open(explorerUrl, "_blank");
  };

  return (
    <PopupModal
      open={open}
      handleClose={onClose}
      showHeader={false}
      transparent
      hasFooter={false}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "640px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: isMobile ? theme.spacing(2) : "20px 0",
        },
      }}
    >
      <PanelCard
        title="Transaction Details"
        showHeaderBorder={false}
        headerPadding={theme.spacing(3.75, 3.75, 0, 3.75)}
        bodyPadding={theme.spacing(3, 3.75, 3.75, 3.75)}
        headerAction={
          <StatusBadge status={transaction.status}>
            <StatusIconWrapper status={transaction.status}>
              {getStatusIcon(transaction.status)}
            </StatusIconWrapper>
            <StatusText status={transaction.status}>
              {transaction.status}
            </StatusText>
          </StatusBadge>
        }
        headerIcon={
          <Image
            src={TransactionIcon}
            alt="Transaction Details"
            width={18}
            height={14}
            draggable={false}
          />
        }
        sx={{
          width: "100%",
          borderRadius: "14px",
          // maxWidth: "600px",
          mx: "auto",
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <HeaderTitleRow>
            <TitleColumn>
              <TitleLabel>Transaction ID</TitleLabel>
              <TitleValue>{transaction.id}</TitleValue>
            </TitleColumn>
            <TitleColumn>
              <TitleLabel>Date & Time</TitleLabel>
              <TitleValue>{transaction.dateTime}</TitleValue>
            </TitleColumn>
          </HeaderTitleRow>
        </Box>
        <SectionDivider />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <SectionTitleWithIcon>
            <Image
              src={RoundedStackIcon}
              alt="Amount Details"
              width={15}
              height={15}
              draggable={false}
            />
            <SectionTitle>Amount Details</SectionTitle>
          </SectionTitleWithIcon>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <DetailRow>
              <TitleLabel>Cryptocurrency</TitleLabel>
              <CryptoIconChip sx={{ width: "fit-content" }}>
                <Image
                  src={getCryptoIcon(transaction.crypto)}
                  alt={transaction.crypto}
                  draggable={false}
                />
                <Typography
                  component={"span"}
                  sx={{
                    color:
                      transaction.crypto === "BTC"
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                  }}
                >
                  {transaction.crypto}
                </Typography>
              </CryptoIconChip>
            </DetailRow>
            <DetailRow>
              <TitleLabel>Amount</TitleLabel>
              <TitleValue>{transaction.amount}</TitleValue>
            </DetailRow>
            <DetailRow>
              <TitleLabel>USD Value</TitleLabel>
              <TitleValue>{transaction.usdValue}</TitleValue>
            </DetailRow>
            {transaction.fees && (
              <DetailRow>
                <TitleLabel>Fees</TitleLabel>
                <TitleValue>{transaction.fees}</TitleValue>
              </DetailRow>
            )}
            {transaction.confirmations && (
              <DetailRow>
                <TitleLabel>Confirmations</TitleLabel>
                <TitleValue>{transaction.confirmations}</TitleValue>
              </DetailRow>
            )}
          </Box>
        </Box>
        <SectionDivider />

        {(transaction.incomingTransactionId ||
          transaction.outgoingTransactionId) && (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <SectionTitleWithIcon>
                <Image
                  src={HashIcon}
                  alt="Transaction Hashes"
                  width={20}
                  height={20}
                  draggable={false}
                />
                <SectionTitle>Transaction Hashes</SectionTitle>
              </SectionTitleWithIcon>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {transaction.incomingTransactionId && (
                  <Box>
                    <HashRow>
                      <InputField
                        value={transaction.incomingTransactionId}
                        readOnly
                        label={<TitleLabel>Incoming Transaction ID</TitleLabel>}
                        inputHeight={isMobile ? "32px" : "40px"}
                        sx={{
                          gap: isMobile ? "6px" : "12px",
                        }}
                      />
                      <ActionButtonGroup>
                        <CopyButton
                          onClick={() =>
                            handleCopy(transaction.incomingTransactionId!)
                          }
                          title="Copy"
                        >
                          <Image
                            src={CopyIcon}
                            alt="Copy"
                            width={isMobile ? 12 : 16}
                            height={isMobile ? 12 : 16}
                            draggable={false}
                          />
                        </CopyButton>
                        <ExplorerButton title="View on Explorer">
                          <Image
                            src={RightArrowIcon}
                            alt="Right Arrow"
                            width={isMobile ? 12 : 16}
                            height={isMobile ? 12 : 16}
                            draggable={false}
                          />
                        </ExplorerButton>
                      </ActionButtonGroup>
                    </HashRow>
                  </Box>
                )}
                {transaction.outgoingTransactionId && (
                  <Box>
                    <HashRow>
                      <InputField
                        value={transaction.outgoingTransactionId}
                        readOnly
                        label={<TitleLabel>Outgoing Transaction ID</TitleLabel>}
                        inputHeight={isMobile ? "32px" : "40px"}
                        sx={{
                          gap: isMobile ? "6px" : "12px",
                        }}
                      />

                      <ActionButtonGroup>
                        <CopyButton
                          onClick={() =>
                            handleCopy(transaction.outgoingTransactionId!)
                          }
                          title="Copy"
                        >
                          <Image
                            src={CopyIcon}
                            alt="Copy"
                            width={isMobile ? 12 : 16}
                            height={isMobile ? 12 : 16}
                            draggable={false}
                          />
                        </CopyButton>
                        <ExplorerButton title="View on Explorer">
                          <Image
                            src={RightArrowIcon}
                            alt="Right Arrow"
                            width={isMobile ? 12 : 16}
                            height={isMobile ? 12 : 16}
                            draggable={false}
                          />
                        </ExplorerButton>
                      </ActionButtonGroup>
                    </HashRow>
                  </Box>
                )}
              </Box>
            </Box>
            <SectionDivider />
          </>
        )}

        {(transaction.callbackUrl || transaction.webhookResponse) && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <SectionTitle>Callback Information</SectionTitle>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {transaction.callbackUrl && (
                <Box>
                  <HashRow>
                    <InputField
                      value={transaction.callbackUrl}
                      readOnly
                      label={<TitleLabel>Callback URL</TitleLabel>}
                      inputHeight={isMobile ? "32px" : "40px"}
                      sx={{
                        gap: isMobile ? "6px" : "12px",
                      }}
                    />
                    <CopyButton
                      onClick={() => handleCopy(transaction.callbackUrl!)}
                      title="Copy"
                    >
                      <Image
                        src={CopyIcon}
                        alt="Copy"
                        width={isMobile ? 12 : 16}
                        height={isMobile ? 12 : 16}
                        draggable={false}
                      />
                    </CopyButton>
                  </HashRow>
                </Box>
              )}
              {transaction.webhookResponse && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "6px" : "12px",
                  }}
                >
                  <TitleLabel>Webhook Response</TitleLabel>
                  <WebhookResponseBox>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: "monospace",
                        fontSize: "13px",
                      }}
                    >
                      {JSON.stringify(transaction.webhookResponse, null, 2)}
                    </pre>
                  </WebhookResponseBox>
                </Box>
              )}
            </Box>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
          <CustomButton
            label="Close"
            variant="outlined"
            size="medium"
            onClick={onClose}
            fullWidth
          />
          <CustomButton
            label="View on Explorer"
            variant="primary"
            size="medium"
            onClick={handleViewOnExplorer}
            fullWidth
          />
        </Box>
      </PanelCard>
    </PopupModal>
  );
};

export default TransactionDetailsModal;
