import PanelCard from "@/Components/UI/PanelCard";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Popover,
  ListItemButton,
  ListItemText,
  Grid,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  PaymentSettingsLabel,
  TabContainer,
  TabContentContainer,
  TabItem,
  ExpireTrigger,
  ExpireText,
  ExpireDropdown,
  Text,
  AppSwitch,
} from "./styled";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import Image from "next/image";
import CustomRadio from "@/Components/UI/RadioGroup";
import PaymentLinkSuccessModal from "./PaymentLinkSuccessModal";

import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import ClientIcon from "@/assets/Icons/Client-icon.svg";
import CurrencyIcon from "@/assets/Icons/Crypto-select.svg";
import HourglassIcon from "@/assets/Icons/hourglass-icon.svg";
import PaymentIcon from "@/assets/Icons/payment-icon.svg";
import NoteIcon from "@/assets/Icons/note-icon.svg";
import CustomButton from "@/Components/UI/Buttons";
import { theme } from "@/styles/theme";
import useIsMobile from "@/hooks/useIsMobile";
import CheckIcon from "@/assets/Icons/Check-icon.svg";
import InfoIcon from "@/assets/Icons/info-icon.svg";

import BitcoinIcon from "@/assets/cryptocurrency/Bitcoin-icon.svg";
import EthereumIcon from "@/assets/cryptocurrency/Ethereum-icon.svg";
import LitecoinIcon from "@/assets/cryptocurrency/Litecoin-icon.svg";
import DogecoinIcon from "@/assets/cryptocurrency/Dogecoin-icon.svg";
import BitcoinCashIcon from "@/assets/cryptocurrency/BitcoinCash-icon.svg";
import TronIcon from "@/assets/cryptocurrency/Tron-icon.svg";
import USDTIcon from "@/assets/cryptocurrency/USDT-icon.svg";
import USDT2Icon from "@/assets/cryptocurrency/USDT2-icon.svg";

import TrueIcon from "@/assets/Icons/True.svg";
import i18n from "@/i18n";

const CreatePaymentLinkPage = () => {
  const isMobile = useIsMobile("md");
  const { t } = useTranslation("createPaymentLinkScreen");
  const tPaymentLink = useCallback(
    (key: string): string => {
      const result = t(key, { ns: "createPaymentLinkScreen" });
      return typeof result === "string" ? result : String(result);
    },
    [t],
  );
  const currentLng = i18n.language;
  const [activeTab, setActiveTab] = useState(0);
  const [blockchainFees, setBlockchainFees] = useState("company");
  const expireAnchorEl = useRef<HTMLElement | null>(null);
  const expireTriggerRef = useRef<HTMLDivElement>(null);
  const [expireOpen, setExpireOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const currencyTriggerRef = useRef<HTMLButtonElement | null>(null);
  const currencyAnchorEl = useRef<HTMLButtonElement | null>(null);
  const [includeTax, setIncludeTax] = useState<boolean>(false);

  const [currencyOpen, setCurrencyOpen] = useState(false);

  const currencies = ["USD", "EUR", "GBP", "INR", "AED"];

  const handleCurrencyOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    currencyAnchorEl.current = e.currentTarget;
    setCurrencyOpen(true);
  };

  const handleCurrencyClose = () => {
    setCurrencyOpen(false);
  };

  const handleCurrencySelect = (currency: string) => {
    setPaymentSettings((prev) => ({ ...prev, currency }));
    setPaymentSettingsTouched((p) => ({ ...p, currency: true }));
    setPaymentSettingsErrors((p) => ({ ...p, currency: "" }));
    setCurrencyOpen(false);
  };

  // Payment Settings (Tab 0) form data
  const [paymentSettings, setPaymentSettings] = useState({
    value: "",
    currency: "",
    clientName: "",
    expire: "no",
    description: "",
    blockchainFees: "company",
    linkId: "",
    acceptedCryptoCurrency: [] as string[],
  });

  // Validation errors for Payment Settings tab
  const [paymentSettingsErrors, setPaymentSettingsErrors] = useState({
    value: "",
    currency: "",
    description: "",
  });

  // Touched fields for Payment Settings tab
  const [paymentSettingsTouched, setPaymentSettingsTouched] = useState({
    value: false,
    currency: false,
    description: false,
  });

  // Post-Payment Settings (Tab 1) form data
  const [postPaymentSettings, setPostPaymentSettings] = useState({
    callbackUrl: "",
    redirectUrl: "",
    webhookUrl: "",
  });

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const handleBlockchainFeesChange = (value: string) => {
    setBlockchainFees(value);
    setPaymentSettings((prev) => ({ ...prev, blockchainFees: value }));
  };

  const validatePaymentSettings = () => {
    const errors: { value: string; description: string; currency: string } = {
      value: "",
      currency: "",
      description: "",
    };

    // Validate value field
    if (!paymentSettings.value || paymentSettings.value.trim() === "") {
      errors.value = tPaymentLink("valueRequired");
    } else {
      const numValue = parseFloat(paymentSettings.value);
      if (isNaN(numValue) || numValue <= 0) {
        errors.value = tPaymentLink("valueInvalid");
      } else if (numValue > 999999999) {
        errors.value = tPaymentLink("valueTooLarge");
      } else if (paymentSettings.value.split(".")[1]?.length > 2) {
        errors.value = tPaymentLink("valueDecimalPlaces");
      }
    }

    // Validate description (optional but check max length if provided)
    if (
      paymentSettings.description &&
      paymentSettings.description.length > 500
    ) {
      errors.description = tPaymentLink("descriptionMaxLength");
    }

    setPaymentSettingsErrors(errors);
    return !errors.value && !errors.currency && !errors.description;
  };

  const handlePaymentSettingsChange = (field: string, value: string) => {
    setPaymentSettings((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (paymentSettingsErrors[field as keyof typeof paymentSettingsErrors]) {
      setPaymentSettingsErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePaymentSettingsBlur = (field: string) => {
    setPaymentSettingsTouched((prev) => ({ ...prev, [field]: true }));
    validatePaymentSettings();
  };

  const handlePostPaymentSettingsChange = (field: string, value: string) => {
    setPostPaymentSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleExpireOpen = (event: React.MouseEvent<HTMLElement>) => {
    expireAnchorEl.current = event.currentTarget;
    setExpireOpen(true);
  };

  const handleExpireClose = () => {
    setExpireOpen(false);
    expireAnchorEl.current = null;
  };

  const handleExpireSelect = (value: string) => {
    handlePaymentSettingsChange("expire", value);
    handleExpireClose();
  };

  const validateCurrency = (value: string) => {
    if (!value) return tPaymentLink("currencyRequired");
    return "";
  };

  const handleCurrencyBlur = () => {
    setPaymentSettingsTouched((p) => ({ ...p, currency: true }));

    const error = validateCurrency(paymentSettings.currency);
    setPaymentSettingsErrors((p) => ({ ...p, currency: error }));
  };

  // Handle click outside for expire dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        expireTriggerRef.current &&
        !expireTriggerRef.current.contains(event.target as Node) &&
        expireAnchorEl.current &&
        !(expireAnchorEl.current as HTMLElement).contains(event.target as Node)
      ) {
        handleExpireClose();
      }
    };

    if (expireOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expireOpen]);

  const handleCreatePaymentLink = () => {
    if (activeTab === 0) {
      // Mark all fields as touched
      setPaymentSettingsTouched({
        value: true,
        currency: true,
        description: true,
      });

      // Validate before submitting
      if (!validatePaymentSettings()) {
        return;
      }

      console.log("Payment Settings Data:", paymentSettings);
      // Generate a mock payment link (in real app, this would come from API)
      const mockLink = `https://pay.dynopay.com/${Math.random()
        .toString(36)
        .substring(7)}`;
      setPaymentLink(mockLink);
      setSuccessModalOpen(true);
    } else if (activeTab === 1) {
      console.log("Post-Payment Settings Data:", postPaymentSettings);
      // Generate a mock payment link (in real app, this would come from API)
      const mockLink = `https://pay.dynopay.com/${Math.random()
        .toString(36)
        .substring(7)}`;
      setPaymentLink(mockLink);
      setSuccessModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const handleCopyLink = () => {
    if (paymentLink) {
      navigator.clipboard.writeText(paymentLink);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const trigger = currencyTriggerRef.current;
      const popover = currencyAnchorEl.current;

      if (
        trigger &&
        !trigger.contains(event.target as Node) &&
        popover &&
        !popover.contains(event.target as Node)
      ) {
        setCurrencyOpen(false);

        // 👇 Mark as touched only when user leaves without selecting
        setPaymentSettingsTouched((p) => ({ ...p, currency: true }));

        const error = validateCurrency(paymentSettings.currency);
        setPaymentSettingsErrors((p) => ({ ...p, currency: error }));
      }
    };

    if (currencyOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currencyOpen, paymentSettings.currency]);

  const cryptoItems = [
    {
      name: "Bitcoin",
      label: "BTC",
      icon: BitcoinIcon,
    },
    {
      name: "Ethereum",
      label: "ETH",
      icon: EthereumIcon,
    },
    {
      name: "Tron",
      label: "TRX",
      icon: TronIcon,
    },
    {
      name: "Litecoin",
      label: "LTC",
      icon: LitecoinIcon,
    },
    {
      name: "Dogecoin",
      label: "DOGE",
      icon: DogecoinIcon,
    },
    {
      name: "Bitcoin Cash",
      label: "BCH",
      icon: BitcoinCashIcon,
    },
    {
      name: "USDT",
      label: "TRC-20",
      icon: USDTIcon,
    },
    {
      name: "USDT",
      label: "ERC-20",
      icon: USDTIcon,
    },
    {
      name: "USDT",
      label: "FRC-20",
      icon: USDT2Icon,
    },
  ];

  const isLarge = useMediaQuery("(min-width:850px)");
  const isSmall = useMediaQuery("(min-width:600px)");

  const walletNotSetUp = ["BCH"];

  return (
    <div>
      <PaymentLinkSuccessModal
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        paymentLink={paymentLink}
        paymentSettings={paymentSettings}
        onCopyLink={handleCopyLink}
      />

      <PanelCard
        bodyPadding={isMobile ? 2 : 2.5}
        sx={{
          maxWidth: { xs: "100%", md: "959px" },
          width: "100%",
          borderRadius: { xs: "8px", md: "14px" },
        }}
      >
        <Box>
          <TabContainer>
            <TabItem
              onClick={() => handleTabChange(0)}
              active={activeTab === 0}
            >
              <p>{tPaymentLink("paymentSettings")}</p>
            </TabItem>
            <TabItem
              onClick={() => handleTabChange(1)}
              active={activeTab === 1}
            >
              <p>{tPaymentLink("postPaymentSettings")}</p>
            </TabItem>
          </TabContainer>
        </Box>
        {activeTab === 0 && (
          <TabContentContainer>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "16px",
                  }}
                >
                  <InputField
                    label={
                      <PaymentSettingsLabel>
                        <Image
                          src={RoundedStackIcon}
                          alt="value"
                          draggable={false}
                          style={{
                            filter: `brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(100%)`,
                          }}
                        />
                        <span>{tPaymentLink("value")}</span>
                      </PaymentSettingsLabel>
                    }
                    value={paymentSettings.value}
                    onChange={(e) =>
                      handlePaymentSettingsChange("value", e.target.value)
                    }
                    onBlur={() => handlePaymentSettingsBlur("value")}
                    type="number"
                    inputMode="decimal"
                    error={
                      paymentSettingsTouched.value &&
                      Boolean(paymentSettingsErrors.value)
                    }
                    helperText={
                      paymentSettingsTouched.value &&
                      paymentSettingsErrors.value
                        ? paymentSettingsErrors.value
                        : undefined
                    }
                    sx={{
                      width: "100%",
                    }}
                  />

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <PaymentSettingsLabel>
                      <Image
                        src={CurrencyIcon}
                        alt="currency"
                        draggable={false}
                      />
                      <span>{tPaymentLink("currency")}</span>
                    </PaymentSettingsLabel>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <ExpireTrigger
                        ref={currencyTriggerRef}
                        onClick={(e) =>
                          handleCurrencyOpen(
                            e as unknown as React.MouseEvent<HTMLButtonElement>,
                          )
                        }
                        fullWidth
                        isOpen={currencyOpen}
                        isMobile={isMobile}
                        sx={{
                          borderColor:
                            paymentSettingsTouched.currency &&
                            paymentSettingsErrors.currency
                              ? theme.palette.error.main
                              : theme.palette.border.main,

                          "&:hover": {
                            borderColor:
                              paymentSettingsTouched.currency &&
                              paymentSettingsErrors.currency
                                ? theme.palette.error.main
                                : theme.palette.border.focus,
                          },

                          "&:focus, &:focus-visible, &:active": {
                            borderColor:
                              paymentSettingsTouched.currency &&
                              paymentSettingsErrors.currency
                                ? theme.palette.error.main
                                : theme.palette.border.focus,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <ExpireText
                            isMobile={isMobile}
                            style={{
                              color: paymentSettings.currency
                                ? theme.palette.text.primary
                                : theme.palette.text.disabled,
                            }}
                          >
                            {paymentSettings.currency ||
                              tPaymentLink("selectCurrency")}
                          </ExpireText>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {currencyOpen ? (
                            <ExpandLessIcon
                              sx={{
                                color: theme.palette.text.secondary,
                                fontSize: isMobile ? "18px" : "20px",
                              }}
                            />
                          ) : (
                            <ExpandMoreIcon
                              sx={{
                                color: theme.palette.text.secondary,
                                fontSize: isMobile ? "18px" : "20px",
                              }}
                            />
                          )}
                        </Box>
                      </ExpireTrigger>

                      <Popover
                        anchorEl={currencyAnchorEl.current}
                        open={currencyOpen}
                        onClose={handleCurrencyClose}
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
                            mt: "-1px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            width:
                              currencyTriggerRef.current?.offsetWidth || "auto",
                            border: `1px solid ${theme.palette.border.main}`,
                            borderTop: "none",
                            maxHeight: "240px",
                            backgroundColor: theme.palette.common.white,
                          },
                        }}
                      >
                        <ExpireDropdown>
                          {currencies.map((currency) => (
                            <ListItemButton
                              key={currency}
                              onClick={() => handleCurrencySelect(currency)}
                              selected={paymentSettings.currency === currency}
                              sx={{
                                borderRadius: "8px",
                                p: 1,
                                maxHeight: "40px",
                                background:
                                  paymentSettings.currency === currency
                                    ? theme.palette.primary.light
                                    : "transparent",
                                "&:hover": {
                                  background: theme.palette.primary.light,
                                },
                                "&.Mui-selected": {
                                  background: theme.palette.primary.light,
                                  "&:hover": {
                                    background: theme.palette.primary.light,
                                  },
                                },
                              }}
                            >
                              <ListItemText
                                primary={currency}
                                primaryTypographyProps={{
                                  sx: {
                                    fontFamily: "UrbanistMedium",
                                    fontWeight: 500,
                                    fontSize: isMobile ? "10px" : "13px",
                                    color: theme.palette.text.primary,
                                    lineHeight: "1",
                                  },
                                }}
                              />
                            </ListItemButton>
                          ))}
                        </ExpireDropdown>
                      </Popover>

                      {paymentSettingsTouched.currency &&
                        paymentSettingsErrors.currency && (
                          <Text
                            sx={{
                              mt: "4px",
                              fontSize: isMobile ? "10px" : "13px",
                              color: theme.palette.error.main,
                              textAlign: "start",
                            }}
                          >
                            {paymentSettingsErrors.currency}
                          </Text>
                        )}
                    </Box>
                  </Box>
                </Box>

                <InputField
                  label={
                    <PaymentSettingsLabel>
                      <Image
                        src={ClientIcon}
                        alt="clientName"
                        draggable={false}
                        style={{
                          filter: `brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(100%)`,
                        }}
                      />
                      <span>{tPaymentLink("clientName")}</span>
                    </PaymentSettingsLabel>
                  }
                  value={paymentSettings.clientName}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      clientName: e.target.value,
                    })
                  }
                  type="text"
                  inputMode="text"
                  sx={{
                    width: "100%",
                  }}
                />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <PaymentSettingsLabel>
                    <Image src={HourglassIcon} alt="expire" draggable={false} />
                    <span>{tPaymentLink("expire")}</span>
                  </PaymentSettingsLabel>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <ExpireTrigger
                      ref={expireTriggerRef}
                      onClick={handleExpireOpen}
                      fullWidth={true}
                      isOpen={expireOpen}
                      isMobile={isMobile}
                      sx={{
                        borderColor: theme.palette.border.main,
                        "&:hover": {
                          borderColor: theme.palette.border.focus,
                        },
                        "&:focus": {
                          borderColor: theme.palette.border.focus,
                        },
                        "&:focus-visible": {
                          borderColor: theme.palette.border.focus,
                        },
                        "&:active": {
                          borderColor: theme.palette.border.focus,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <ExpireText isMobile={isMobile}>
                          {paymentSettings.expire === "no"
                            ? tPaymentLink("no")
                            : paymentSettings.expire === "yes"
                              ? tPaymentLink("yes")
                              : tPaymentLink("no")}
                        </ExpireText>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {expireOpen ? (
                          <ExpandLessIcon
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: isMobile ? "18px" : "20px",
                            }}
                          />
                        ) : (
                          <ExpandMoreIcon
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: isMobile ? "18px" : "20px",
                            }}
                          />
                        )}
                      </Box>
                    </ExpireTrigger>

                    <Popover
                      anchorEl={expireAnchorEl.current}
                      open={expireOpen}
                      onClose={handleExpireClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                      PaperProps={{
                        sx: {
                          mt: "-1px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          width:
                            expireTriggerRef.current?.offsetWidth || "auto",
                          border: `1px solid ${theme.palette.border.main}`,
                          borderTop: "none",
                          maxHeight: "200px",
                          backgroundColor: theme.palette.common.white,
                        },
                      }}
                    >
                      <ExpireDropdown>
                        {["no", "yes"].map((option) => (
                          <ListItemButton
                            key={option}
                            onClick={() => handleExpireSelect(option)}
                            selected={paymentSettings.expire === option}
                            sx={{
                              borderRadius: "8px",
                              p: 1,
                              minHeight: "40px",
                              background:
                                paymentSettings.expire === option
                                  ? theme.palette.primary.light
                                  : "transparent",
                              "&:hover": {
                                background: theme.palette.primary.light,
                              },
                              "&.Mui-selected": {
                                background: theme.palette.primary.light,
                                "&:hover": {
                                  background: theme.palette.primary.light,
                                },
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                option === "no"
                                  ? tPaymentLink("no")
                                  : option === "yes"
                                    ? tPaymentLink("yes")
                                    : option.charAt(0).toUpperCase() +
                                      option.slice(1)
                              }
                              primaryTypographyProps={{
                                sx: {
                                  fontFamily: "UrbanistMedium",
                                  fontWeight: 500,
                                  fontSize: isMobile ? "13px" : "15px",
                                  color: theme.palette.text.primary,
                                  lineHeight: "1",
                                  textTransform: "capitalize",
                                },
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </ExpireDropdown>
                    </Popover>
                  </Box>
                </Box>

                <Box>
                  <PaymentSettingsLabel>
                    <Image
                      src={PaymentIcon}
                      alt="blockchain fees"
                      draggable={false}
                    />
                    <span>{tPaymentLink("blockchainFeesPaidBy")}</span>
                  </PaymentSettingsLabel>
                  <Box sx={{ marginTop: { xs: "8px", md: "16px" } }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={blockchainFees}
                        onChange={(e) =>
                          handleBlockchainFeesChange(e.target.value)
                        }
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: { xs: "13px", md: "15px" },
                            fontFamily: "UrbanistRegular",
                            color: theme.palette.text.primary,
                            paddingLeft: "8px",
                            lineHeight: 1.2,
                          },
                          gap: { xs: "6px", md: "8px" },
                        }}
                      >
                        <FormControlLabel
                          value="customer"
                          control={<CustomRadio />}
                          label={tPaymentLink("customerFeesAdded")}
                          sx={{ margin: "0px" }}
                        />
                        <FormControlLabel
                          value="company"
                          control={<CustomRadio />}
                          label={tPaymentLink("companyPaysFees")}
                          sx={{ margin: "0px" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <InputField
                  label={
                    <PaymentSettingsLabel>
                      <Image src={NoteIcon} alt="note" draggable={false} />
                      <span>{tPaymentLink("description")}</span>
                    </PaymentSettingsLabel>
                  }
                  value={paymentSettings.description}
                  onChange={(e) =>
                    handlePaymentSettingsChange("description", e.target.value)
                  }
                  onBlur={() => handlePaymentSettingsBlur("description")}
                  error={
                    paymentSettingsTouched.description &&
                    Boolean(paymentSettingsErrors.description)
                  }
                  helperText={
                    paymentSettingsTouched.description &&
                    paymentSettingsErrors.description
                      ? paymentSettingsErrors.description
                      : undefined
                  }
                  maxLength={500}
                  sx={{
                    width: "100%",
                  }}
                  multiline={true}
                  minRows={isMobile ? 4 : 9}
                />
              </Box>
            </Box>

            <Box
              sx={{ height: "1px", backgroundColor: theme.palette.border.main }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  gap: "4px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "4px" : "8px",
                  }}
                >
                  <Text
                    sx={{
                      fontSize: isMobile ? "15px" : "20px",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {tPaymentLink("acceptedCryptocurrencies")}
                  </Text>
                  <Text
                    sx={{
                      fontSize: isMobile ? "12px" : "15px",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {tPaymentLink("whichCryptoCanCustomersUseToPay")}
                  </Text>
                </Box>
                <Text
                  sx={{
                    alignSelf: isMobile ? "flex-start" : "flex-end",
                    fontSize: isMobile ? "12px" : "15px",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {tPaymentLink("atLeastOneCurrencyMustBeSelected")}
                </Text>
              </Box>

              <Grid container columnSpacing={"10px"} rowSpacing={"10px"}>
                {cryptoItems.map((item) => (
                  <Grid
                    key={item.label}
                    item
                    xs={isLarge ? 4 : isSmall ? 6 : 12}
                  >
                    <Box
                      onClick={() => {
                        if (walletNotSetUp.includes(item.label)) return;
                        setPaymentSettings((prev) => {
                          const exists = (
                            prev.acceptedCryptoCurrency as string[]
                          ).includes(item.label);

                          return {
                            ...prev,
                            acceptedCryptoCurrency: exists
                              ? prev.acceptedCryptoCurrency.filter(
                                  (currency) => currency !== item.label,
                                )
                              : [...prev.acceptedCryptoCurrency, item.label],
                          };
                        });
                      }}
                      sx={{
                        cursor: "pointer",
                        height: isMobile ? "50px" : "60px",
                        maxWidth: "100%",
                        border: `1px solid ${paymentSettings.acceptedCryptoCurrency.includes(item.label) ? theme.palette.border.success : walletNotSetUp.includes(item.label) ? theme.palette.border.main : theme.palette.text.secondary}`,
                        borderRadius: "14px",
                        padding: isMobile ? "10px 6px" : "15px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            height: "30px",
                            width: "30px",
                            border: `0.48px solid ${theme.palette.border.main}`,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.secondary.light,
                            padding: "6.5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <Image
                              src={item.icon}
                              alt={item.label}
                              fill
                              draggable={false}
                              style={{
                                objectFit: "contain",
                              }}
                            />
                          </Box>
                        </Box>

                        <Text
                          sx={{
                            fontSize: "15px",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {item.name}
                        </Text>

                        <Box
                          sx={{
                            height: "30px",
                            width: "fit-content",
                            border: `0.48px solid ${theme.palette.border.main}`,
                            borderRadius: "100px",
                            backgroundColor: theme.palette.secondary.light,
                            padding: "6px 13px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            sx={{
                              fontSize: "13px",
                              color: theme.palette.text.primary,
                            }}
                          >
                            {item.label}
                          </Text>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          height: isMobile ? "18px" : "24px",
                          width: isMobile ? "18px" : "24px",
                          backgroundColor:
                            paymentSettings.acceptedCryptoCurrency.includes(
                              item.label,
                            )
                              ? theme.palette.success.main
                              : "",
                          border: `1px solid ${paymentSettings.acceptedCryptoCurrency.includes(item.label) ? theme.palette.border.success : theme.palette.text.secondary}`,
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: isMobile ? "6px" : "3px",
                          marginBottom: isMobile ? "6px" : "3px",
                          marginRight: isMobile ? "4px" : "10px",
                        }}
                      >
                        {paymentSettings.acceptedCryptoCurrency.includes(
                          item.label,
                        ) && (
                          <Image
                            height={isMobile ? 6.75 : 9}
                            width={isMobile ? 9.75 : 13}
                            src={CheckIcon}
                            alt={item.label}
                            draggable={false}
                            style={{
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </Box>
                      {walletNotSetUp.includes(item.label) && (
                        <Text
                          sx={{
                            position: "absolute",
                            bottom: isMobile ? "2px" : "3px",
                            right: isMobile ? "5px" : "7px",
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontSize: isMobile ? "10px" : "12px",
                            color: "#98989D",
                          }}
                        >
                          {tPaymentLink("setUpWalletFirst")}
                        </Text>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  justifyContent: "space-between",
                  gap: isMobile ? "10px" : "",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: isMobile ? "8px" : "12px",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      height: isMobile ? "18px" : "24px",
                      width: isMobile ? "18px" : "24px",
                      backgroundColor:
                        paymentSettings.acceptedCryptoCurrency.length > 0
                          ? theme.palette.success.main
                          : "",
                      border: `1px solid ${paymentSettings.acceptedCryptoCurrency.length > 0 ? theme.palette.border.success : theme.palette.text.secondary}`,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {paymentSettings.acceptedCryptoCurrency.length > 0 && (
                      <Image
                        height={isMobile ? 6.75 : 9}
                        width={isMobile ? 9.75 : 13}
                        src={CheckIcon}
                        alt="checkIcon"
                        draggable={false}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </Box>

                  <Text
                    sx={{
                      fontSize: isMobile ? "12px" : "15px",
                      color: theme.palette.text.primary,
                    }}
                  >{`${paymentSettings.acceptedCryptoCurrency.length} ${tPaymentLink("selectedCurrency")}`}</Text>
                </Box>
                <Box sx={{ display: "flex", gap: "16px" }}>
                  {[tPaymentLink("selectAll"), tPaymentLink("clearAll")].map(
                    (item) => {
                      const first = item === tPaymentLink("selectAll");
                      return (
                        <Box
                          onClick={() => {
                            if (item === tPaymentLink("selectAll")) {
                              setPaymentSettings((prev) => ({
                                ...prev,
                                acceptedCryptoCurrency: cryptoItems
                                  .map((item) => {
                                    if (!walletNotSetUp.includes(item.label))
                                      return item.label;
                                    return null;
                                  })
                                  .filter((item) => item !== null) as string[],
                              }));
                            } else {
                              setPaymentSettings((prev) => ({
                                ...prev,
                                acceptedCryptoCurrency: [],
                              }));
                            }
                          }}
                          key={item}
                          sx={{
                            width: isMobile ? "155px" : "190px",
                            height: isMobile ? "32px" : "40px",
                            cursor:
                              paymentSettings.acceptedCryptoCurrency.length ===
                                0 && !first
                                ? "not-allowed"
                                : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "6px",
                            border: first
                              ? `1px solid ${theme.palette.primary.main}`
                              : paymentSettings.acceptedCryptoCurrency.length >
                                  0
                                ? `1px solid ${theme.palette.text.secondary}`
                                : `1px solid ${theme.palette.border.main}`,
                            color: first
                              ? theme.palette.primary.main
                              : paymentSettings.acceptedCryptoCurrency.length >
                                  0
                                ? theme.palette.text.primary
                                : theme.palette.text.secondary,
                          }}
                        >
                          <Text
                            sx={{
                              fontSize: isMobile ? "13px" : "15px",
                              fontWeight: 500,
                            }}
                          >
                            {item}
                          </Text>
                        </Box>
                      );
                    },
                  )}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ height: "1px", backgroundColor: theme.palette.border.main }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "12px" : "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "4px" : "8px",
                }}
              >
                <Text
                  sx={{
                    fontSize: isMobile ? "15px" : "20px",
                    color: theme.palette.text.primary,
                  }}
                >
                  {tPaymentLink("tax")}
                </Text>
                <Text
                  sx={{
                    fontSize: isMobile ? "12px" : "15px",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {tPaymentLink("taxDescription")}
                </Text>
              </Box>

              <Box
                sx={{
                  width: isMobile ? "324px" : "300px",
                  height: "49px",
                  border: `1px solid ${theme.palette.border.main}`,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 8px 0 14px",
                }}
              >
                <Text
                  sx={{ fontSize: "13px", color: theme.palette.text.primary }}
                >
                  {tPaymentLink("includeTax")}
                </Text>
                <Box
                  sx={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <AppSwitch
                    checked={includeTax}
                    onChange={(e) => setIncludeTax(e.target.checked)}
                  />
                  <Text
                    sx={{
                      width: currentLng === "en" ? "23px" : "59px",
                      fontSize: "13px",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {includeTax ? tPaymentLink("on") : tPaymentLink("off")}
                  </Text>
                </Box>
              </Box>

              {includeTax ? (
                <Box
                  display={{
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    padding: "20px 24px",
                    border: `1px solid ${theme.palette.border.success}`,
                    borderRadius: "14px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Image
                      src={TrueIcon}
                      alt="true icon"
                      width={14}
                      height={14}
                      draggable={false}
                    />
                    <Text
                      sx={{
                        fontSize: isMobile ? "13px" : "15px",
                        fontWeight: 700,
                        fontFamily: "UrbanistBold",
                        color: theme.palette.border.success,
                      }}
                    >
                      {tPaymentLink("taxEnabled")}
                    </Text>
                  </Box>

                  <Text
                    sx={{
                      fontSize: isMobile ? "12px" : "15px",
                      color: theme.palette.border.success,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {tPaymentLink("taxWillBeCalculatedAtCheckout")}
                  </Text>

                  <Box>
                    <Text
                      sx={{
                        fontSize: isMobile ? "12px" : "15px",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {tPaymentLink("taxExamples")}
                    </Text>
                    <Text
                      sx={{
                        fontSize: isMobile ? "12px" : "15px",
                        color: theme.palette.text.primary,
                        paddingLeft: "25px",
                      }}
                    >
                      <li>{tPaymentLink("taxExamplePortugal")}</li>
                      <li>{tPaymentLink("taxExampleGermany")}</li>
                      <li>{tPaymentLink("taxExampleUK")}</li>
                      <li>{tPaymentLink("taxExampleUSA")}</li>
                    </Text>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "fit-content",
                    border: `1px solid ${theme.palette.border.main}`,
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "8px" : "12px",
                    padding: "12px 14px 12px 18px",
                    backgroundColor: theme.palette.primary.light,
                  }}
                >
                  <Image
                    src={InfoIcon}
                    alt="info icon"
                    width={16}
                    height={16}
                    draggable={false}
                    style={{ filter: "brightness(0)" }}
                  />
                  <Text
                    sx={{
                      fontSize: isMobile ? "10px" : "13px",
                      fontWeight: 600,
                      fontFamily: "UrbanistSemibold",
                      color: theme.palette.text.primary,
                      whiteSpace: "wrap",
                    }}
                  >
                    {tPaymentLink("taxInfo")}
                  </Text>
                </Box>
              )}
            </Box>

            <Box>
              <CustomButton
                label={tPaymentLink("continue")}
                variant="primary"
                size="medium"
                fullWidth={true}
                onClick={handleCreatePaymentLink}
                disabled={
                  Boolean(paymentSettingsErrors.value) ||
                  Boolean(paymentSettingsErrors.currency) ||
                  Boolean(paymentSettingsErrors.description) ||
                  !paymentSettings.value ||
                  paymentSettings.value.trim() === "" ||
                  !paymentSettings.currency
                }
                sx={{
                  [theme.breakpoints.down("md")]: {
                    height: "32px",
                    fontSize: "13px",
                  },
                }}
              />
            </Box>
          </TabContentContainer>
        )}
        {activeTab === 1 && (
          <TabContentContainer>
            <InputField
              label={tPaymentLink("callbackUrl")}
              placeholder={tPaymentLink("callbackUrlPlaceholder")}
              value={postPaymentSettings.callbackUrl}
              onChange={(e) =>
                handlePostPaymentSettingsChange("callbackUrl", e.target.value)
              }
              helperText={tPaymentLink("callbackUrlHelper")}
              type="url"
              sx={{
                width: "100%",
              }}
            />
            <InputField
              label={tPaymentLink("redirectUrl")}
              placeholder={tPaymentLink("redirectUrlPlaceholder")}
              value={postPaymentSettings.redirectUrl}
              onChange={(e) =>
                handlePostPaymentSettingsChange("redirectUrl", e.target.value)
              }
              helperText={tPaymentLink("redirectUrlHelper")}
              type="url"
              sx={{
                width: "100%",
              }}
            />
            <InputField
              label={tPaymentLink("webhookUrl")}
              placeholder={tPaymentLink("webhookUrlPlaceholder")}
              value={postPaymentSettings.webhookUrl}
              onChange={(e) =>
                handlePostPaymentSettingsChange("webhookUrl", e.target.value)
              }
              helperText={tPaymentLink("webhookUrlHelper")}
              type="url"
              sx={{
                width: "100%",
              }}
            />
            <Box>
              <CustomButton
                label={tPaymentLink("createPayment")}
                variant="primary"
                size="medium"
                fullWidth={true}
                onClick={handleCreatePaymentLink}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    height: "32px",
                    fontSize: "13px",
                  },
                }}
              />
            </Box>
          </TabContentContainer>
        )}
      </PanelCard>
    </div>
  );
};

export default CreatePaymentLinkPage;
