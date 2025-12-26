import React, { useCallback, useState, useRef, useMemo, memo } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import PanelCard from "@/Components/UI/PanelCard";
import CustomButton from "@/Components/UI/Buttons";
import { ArrowOutward, TrendingUp, Add, Remove } from "@mui/icons-material";
import Image from "next/image";
import DashboardIcon from "@/assets/Icons/dashboard-icon.svg";
import TransactionIcon from "@/assets/Icons/transaction.svg";
import WalletIcon from "@/assets/Icons/wallet-grey.svg";
import { theme } from "@/styles/theme";
import { useTranslation } from "react-i18next";
import { PercentageChip } from "./styled";
import ArrowUpSuccessIcon from "@/assets/Icons/up-success.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import { formatNumberWithComma, getCurrencySymbol } from "@/helpers";
import {
  CryptocurrencyIcon,
  IconChip,
} from "@/Components/UI/CryptocurrencySelector/styled";
import useIsMobile from "@/hooks/useIsMobile";
import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import BNBIcon from "@/assets/cryptocurrency/BNB-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";

// Active wallets data array
interface ActiveWallet {
  code: string;
  icon: any;
}

const activeWalletsData: ActiveWallet[] = [
  { code: "BTC", icon: BitcoinIcon },
  { code: "ETH", icon: EthereumIcon },
  { code: "LTC", icon: LitecoinIcon },
  { code: "BNB", icon: BNBIcon },
  { code: "DOGE", icon: DogecoinIcon },
  { code: "BCH", icon: BitcoinCashIcon },
  { code: "TRX", icon: TronIcon },
  { code: "USDT", icon: USDTIcon },
];

// Simple line chart component using SVG
const TransactionVolumeChart = () => {
  const chartData = [
    { day: "Nov 1", value: 2000 },
    { day: "Nov 2", value: 4500 },
    { day: "Nov 3", value: 3200 },
    { day: "Nov 4", value: 15600 },
    { day: "Nov 5", value: 8200 },
    { day: "Nov 6", value: 11000 },
    { day: "Nov 7", value: 9500 },
  ];

  const maxValue = 16000;
  const chartHeight = 200;
  const padding = 40;
  const labelHeight = 30;

  return (
    <Box sx={{ width: "100%", mt: 2, position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          height: `${chartHeight + labelHeight}px`,
          position: "relative",
          pl: 5,
          pr: 2,
        }}
      >
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 400 ${chartHeight}`}
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding + ratio * (chartHeight - 2 * padding);
            return (
              <line
                key={idx}
                x1={padding}
                y1={y}
                x2={400 - padding}
                y2={y}
                stroke="#E9ECF2"
                strokeWidth="1"
              />
            );
          })}

          {/* Chart line */}
          <path
            d={chartData
              .map((d, i) => {
                const x =
                  padding + (i * (400 - 2 * padding)) / (chartData.length - 1);
                const y =
                  chartHeight -
                  padding -
                  (d.value / maxValue) * (chartHeight - 2 * padding);
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")}
            fill="none"
            stroke={theme.palette.primary.main}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {chartData.map((d, i) => {
            const x =
              padding + (i * (400 - 2 * padding)) / (chartData.length - 1);
            const y =
              chartHeight -
              padding -
              (d.value / maxValue) * (chartHeight - 2 * padding);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill={theme.palette.primary.main} />
                <title>{`${
                  d.day
                }: Volume: $${d.value.toLocaleString()}`}</title>
              </g>
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: `${chartHeight}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40px",
          }}
        >
          {[0, 4, 8, 12, 16].map((val) => (
            <Typography
              key={val}
              variant="caption"
              sx={{
                fontSize: "12px",
                color: theme.palette.text.secondary,
                fontFamily: "UrbanistRegular",
              }}
            >
              ${val}k
            </Typography>
          ))}
        </Box>

        {/* X-axis labels */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: padding + 20,
            right: 20,
            display: "flex",
            justifyContent: "space-between",
            height: `${labelHeight}px`,
            alignItems: "flex-start",
          }}
        >
          {chartData.map((d) => (
            <Typography
              key={d.day}
              variant="caption"
              sx={{
                fontSize: "12px",
                color: theme.palette.text.secondary,
                fontFamily: "UrbanistRegular",
              }}
            >
              {d.day}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const StatCard = ({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
}) => {
  const theme = useTheme();
  return (
    <PanelCard
      showHeaderBorder={false}
      headerPadding={theme.spacing(2.5)}
      bodyPadding={theme.spacing(2.5)}
      sx={{ height: "100%" }}
      headerAction={
        <Box
          sx={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: theme.palette.grey[100],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={icon} alt={title} width={16} height={16} />
        </Box>
      }
    >
      <Box>
        <Typography
          sx={{
            fontSize: "15px",
            color: theme.palette.text.secondary,
            mb: 1,
            fontFamily: "UrbanistRegular",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: change ? 1 : 0,
            fontFamily: "UrbanistMedium",
          }}
        >
          {value}
        </Typography>
        {change && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <TrendingUp sx={{ fontSize: 16, color: "#10B981" }} />
            <Typography
              sx={{
                fontSize: "13px",
                color: "#10B981",
                fontFamily: "UrbanistMedium",
              }}
            >
              {change}
            </Typography>
          </Box>
        )}
      </Box>
    </PanelCard>
  );
};

// Memoized wallet card component to prevent re-renders during drag
const ActiveWalletsCard = memo(
  ({
    title,
    icon,
    isMobile,
  }: {
    title: string;
    icon: any;
    isMobile: boolean;
  }) => {
    const theme = useTheme();
    return (
      <IconChip
        sx={{
          padding: "6px 8px !important",
          minWidth: "fit-content",
          height: "30px",
          alignItems: "center",
          flexShrink: 0,
          "& img": {
            userSelect: "none",
            WebkitUserDrag: "none",
            pointerEvents: "none",
            WebkitTouchCallout: "none",
          },
        }}
      >
        <CryptocurrencyIcon
          src={icon}
          alt={title}
          width={18}
          height={18}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
        <span
          style={{
            fontSize: isMobile ? "11px" : "13px",
            fontWeight: 500,
            color: theme.palette.text.secondary,
            flexShrink: 0,
          }}
        >
          {title}
        </span>
      </IconChip>
    );
  }
);

ActiveWalletsCard.displayName = "ActiveWalletsCard";

const DashboardLeftSection = () => {
  const theme = useTheme();
  const namespaces = ["dashboardLayout", "common"];
  const isMobile = useIsMobile("md");
  const [showAllWallets, setShowAllWallets] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const statCardsContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const statCardsDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const statCardsStartXRef = useRef(0);
  const statCardsScrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false); 
  const [isStatCardsDragging, setIsStatCardsDragging] = useState(false); 

  const { t } = useTranslation(namespaces);
  const tDashboard = useCallback(
    (key: string) => t(key, { ns: "dashboardLayout" }),
    [t]
  );

  const maxWalletsToShow = isMobile ? 2 : 3;
  const walletsToDisplay = showAllWallets
    ? activeWalletsData
    : activeWalletsData.slice(0, maxWalletsToShow);
  const hasMoreWallets = activeWalletsData.length > maxWalletsToShow;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isStatCardsDragging) return;
      if (!showAllWallets || !scrollContainerRef.current) return;
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      e.stopPropagation();
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    },
    [showAllWallets]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !isDraggingRef.current ||
        !scrollContainerRef.current ||
        !showAllWallets
      )
        return;
      e.preventDefault();
      e.stopPropagation();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    },
    [showAllWallets]
  );

  const handleMouseUp = useCallback((e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) {
      e.stopPropagation();
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(
    (e?: React.MouseEvent<HTMLDivElement>) => {
      if (e) {
        e.stopPropagation();
      }
      isDraggingRef.current = false;
      setIsDragging(false);
    },
    []
  );

  const handleStatCardsMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!statCardsContainerRef.current) return;
      if (
        (e.target as HTMLElement).closest("button") ||
        (e.target as HTMLElement).closest("a")
      )
        return;
      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.contains(e.target as Node)
      )
        return;
      e.preventDefault();
      statCardsDraggingRef.current = true;
      setIsStatCardsDragging(true);
      statCardsStartXRef.current =
        e.pageX - statCardsContainerRef.current.offsetLeft;
      statCardsScrollLeftRef.current = statCardsContainerRef.current.scrollLeft;
    },
    []
  );

  const handleStatCardsMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!statCardsDraggingRef.current || !statCardsContainerRef.current)
        return;
      if (isDraggingRef.current) return;
      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.contains(e.target as Node)
      )
        return;
      e.preventDefault();
      const x = e.pageX - statCardsContainerRef.current.offsetLeft;
      const walk = (x - statCardsStartXRef.current) * 2;
      statCardsContainerRef.current.scrollLeft =
        statCardsScrollLeftRef.current - walk;
    },
    []
  );

  const handleStatCardsMouseUp = useCallback(() => {
    statCardsDraggingRef.current = false;
    setIsStatCardsDragging(false);
  }, []);

  const handleStatCardsMouseLeave = useCallback(() => {
    statCardsDraggingRef.current = false;
    setIsStatCardsDragging(false);
  }, []);

  return (
    <Box>
      {/* Stat Cards */}
      <Box
        ref={statCardsContainerRef}
        onMouseDown={handleStatCardsMouseDown}
        onMouseMove={handleStatCardsMouseMove}
        onMouseUp={handleStatCardsMouseUp}
        onMouseLeave={handleStatCardsMouseLeave}
        sx={{
          mb: 2.5,
          display: "flex",
          gap: isMobile ? "8px" : "20px",
          overflowX: "auto",
          overflowY: "hidden",
          cursor: isStatCardsDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          willChange: isStatCardsDragging ? "scroll-position" : "auto",
          "& img": {
            userSelect: "none",
            WebkitUserDrag: "none",
            pointerEvents: "none",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          },
          "& *": {
            userSelect: "none",
            WebkitUserDrag: "none",
          },
          "& button": {
            pointerEvents: "auto",
          },
          "&::-webkit-scrollbar": {
            height: "0px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
        }}
      >
        {/* Total Transactions */}
        <PanelCard
          title={t("totalTransactions")}
          showHeaderBorder={false}
          headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
          bodyPadding={theme.spacing(2, 2.5, 2.5, 2.5)}
          sx={{
            width: isMobile ? "200px" : "315px",
            flexShrink: 0,
          }}
          headerAction={
            <IconButton
              sx={{
                padding: "8px",
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <Image
                src={TransactionIcon}
                alt="Transaction Icon"
                width={isMobile ? 14 : 17}
                height={isMobile ? 14 : 14}
                draggable={false}
              />
            </IconButton>
          }
        >
          <Typography
            sx={{
              fontSize: isMobile ? "20px" : "40px",
              color: theme.palette.text.primary,
              fontFamily: "UrbanistMedium",
              lineHeight: 1.2,
            }}
          >
            4
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              mt: 2.5,
            }}
          >
            <PercentageChip
              sx={{ padding: isMobile ? "8px 6px" : "6px 8px", lineHeight: 0 }}
            >
              <Image
                src={ArrowUpSuccessIcon}
                alt="Arrow Up Success Icon"
                width={isMobile ? 8 : 11}
                height={isMobile ? 8 : 11}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: isMobile ? "10px" : "13px",
                  color: theme.palette.border.success,
                  fontFamily: "UrbanistMedium",
                  lineHeight: 0,
                  padding: isMobile ? "0px 2px" : "8px 0px",
                }}
              >
                12%
              </Typography>
            </PercentageChip>
            <Typography
              sx={{
                fontSize: isMobile ? "10px" : "13px",
                color: theme.palette.text.secondary,
                fontFamily: "UrbanistMedium",
                lineHeight: 1.2,
              }}
            >
              {t("comparedToLastMonth")}
            </Typography>
          </Box>
        </PanelCard>

        {/* Total Volume */}
        <PanelCard
          title={t("totalVolume")}
          showHeaderBorder={false}
          headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
          bodyPadding={theme.spacing(2, 2.5, 2.5, 2.5)}
          sx={{
            width: isMobile ? "200px" : "315px",
            flexShrink: 0,
          }}
          headerAction={
            <IconButton
              sx={{
                padding: "8px",
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <Image
                src={RoundedStackIcon}
                alt="Rounded Stack Icon"
                width={isMobile ? 14 : 17}
                height={isMobile ? 14 : 14}
                draggable={false}
              />
            </IconButton>
          }
        >
          <Typography
            sx={{
              fontSize: isMobile ? "20px" : "40px",
              color: theme.palette.text.primary,
              fontFamily: "UrbanistMedium",
              lineHeight: 1.2,
            }}
          >
            {getCurrencySymbol("USD", formatNumberWithComma(6479.25))}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              mt: 2.5,
            }}
          >
            <PercentageChip
              sx={{ padding: isMobile ? "8px 6px" : "6px 8px", lineHeight: 0 }}
            >
              <Image
                src={ArrowUpSuccessIcon}
                alt="Arrow Up Success Icon"
                width={isMobile ? 8 : 11}
                height={isMobile ? 8 : 11}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: isMobile ? "10px" : "13px",
                  color: theme.palette.border.success,
                  fontFamily: "UrbanistMedium",
                  lineHeight: 0,
                  padding: isMobile ? "0px 2px" : "8px 0px",
                }}
              >
                8.5%
              </Typography>
            </PercentageChip>
            <Typography
              sx={{
                fontSize: isMobile ? "10px" : "13px",
                color: theme.palette.text.secondary,
                fontFamily: "UrbanistMedium",
                lineHeight: 1.2,
                paddingRight: "0px !important",
              }}
            >
              {t("comparedToLastMonth")}
            </Typography>
          </Box>
        </PanelCard>

        {/* Active Wallets */}
        <PanelCard
          title={t("activeWallets")}
          showHeaderBorder={false}
          headerPadding={theme.spacing(2.5, 2.5, 0, 2.5)}
          bodyPadding={theme.spacing(2, 2.5, 2.5, 2.5)}
          sx={{
            width: isMobile ? "200px" : "315px",
            flexShrink: 0,
            height: "100%",
          }}
          headerAction={
            <IconButton
              sx={{
                padding: "8px",
                width: "40px",
                height: "40px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <Image
                src={WalletIcon}
                alt="Wallet Icon"
                width={14}
                height={14}
                draggable={false}
              />
            </IconButton>
          }
        >
          <Typography
            sx={{
              fontSize: isMobile ? "20px" : "40px",
              color: theme.palette.text.primary,
              fontFamily: "UrbanistMedium",
              lineHeight: 1.2,
            }}
          >
            {activeWalletsData.length}
          </Typography>

          <Box
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              mt: 2.5,
              overflowX: "auto",
              overflowY: "hidden",
              flexWrap: "nowrap",
              cursor: showAllWallets
                ? isDragging
                  ? "grabbing"
                  : "grab"
                : "default",
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              willChange: isDragging ? "scroll-position" : "auto",
              "& img": {
                userSelect: "none",
                WebkitUserDrag: "none",
                pointerEvents: "none",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                KhtmlUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              },
              "& *": {
                userSelect: "none",
                WebkitUserDrag: "none",
              },
              "& button": {
                pointerEvents: "auto",
              },
              "&::-webkit-scrollbar": {
                height: "0px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "transparent",
              },
            }}
          >
            {walletsToDisplay.map((wallet) => (
              <ActiveWalletsCard
                key={wallet.code}
                title={wallet.code}
                icon={wallet.icon}
                isMobile={isMobile}
              />
            ))}
            {hasMoreWallets && !showAllWallets && (
              <IconButton
                onClick={() => setShowAllWallets(true)}
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "999px",
                  background: theme.palette.secondary.light,
                  border: `1px solid ${theme.palette.border.main}`,
                  padding: 0,
                  minWidth: "30px",
                  flexShrink: 0,
                  "&:hover": {
                    background: theme.palette.secondary.dark,
                  },
                }}
              >
                <Add
                  sx={{
                    fontSize: "20px",
                    color: theme.palette.text.secondary,
                  }}
                />
              </IconButton>
            )}
            {showAllWallets && (
              <IconButton
                onClick={() => setShowAllWallets(false)}
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "999px",
                  background: theme.palette.secondary.light,
                  border: `1px solid ${theme.palette.border.main}`,
                  padding: 0,
                  minWidth: "30px",
                  flexShrink: 0,
                  "&:hover": {
                    background: theme.palette.secondary.dark,
                  },
                }}
              >
                <Remove
                  sx={{
                    fontSize: "20px",
                    color: theme.palette.text.secondary,
                  }}
                />
              </IconButton>
            )}
          </Box>
        </PanelCard>
      </Box>

      {/* Transaction Volume Graph */}
      <PanelCard
        title="Transaction Volume"
        subTitle="Daily transaction activity"
        showHeaderBorder={true}
        headerPadding={theme.spacing(2.5)}
        bodyPadding={theme.spacing(2.5, 2.5, 3, 2.5)}
        headerAction={
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: "6px",
                border: `1px solid ${theme.palette.border.main}`,
                fontSize: "13px",
                color: theme.palette.text.primary,
                fontFamily: "UrbanistMedium",
              }}
            >
              Last 7 Days
            </Box>
            <CustomButton
              label="View Transactions"
              variant="primary"
              size="small"
              endIcon={<ArrowOutward sx={{ fontSize: 16 }} />}
              sx={{
                height: "32px",
                fontSize: "13px",
                px: 1.5,
              }}
            />
          </Box>
        }
        headerActionLayout="inline"
      >
        <TransactionVolumeChart />
      </PanelCard>
    </Box>
  );
};

export default DashboardLeftSection;
