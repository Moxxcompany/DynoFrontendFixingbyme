import LoadingIcon from "@/assets/Icons/LoadingIcon";
import axiosBaseApi from "@/axiosConfig";
import FormManager from "@/Components/Page/Common/FormManager";
import Dropdown from "@/Components/UI/Dropdown";
import TextBox from "@/Components/UI/TextBox";
import { countDecimals, getCurrencySymbol } from "@/helpers";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { IWallet, menuItem, pageProps } from "@/utils/types";
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const OTPInitial = {
  otp: "",
};

const minimumDollar = 10;

const Withdraw = ({ setPageName }: pageProps) => {
  const dispatch = useDispatch();
  const [cryptoData, setCryptoData] = useState<IWallet[]>([]);
  const [walletInitial, setWalletInitial] = useState({
    currency: "ETH",
    amount: 0,
    address: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<menuItem[]>([]);
  const [maxAmount, setMaxAmount] = useState(0);
  const [transaction, setTransaction] = useState<any>();
  const [countdown, setCountdown] = useState(-1);
  const [finalValues, setFinalValues] = useState<any>();
  const [resendOtp, setResendOTP] = useState(false);

  const [fees, setFees] = useState<{
    fast: number;
    medium: number;
    slow: number;
  }>();
  const [currentFees, setCurrentFees] = useState("fast");
  const [feeToPay, setFeeToPay] = useState(0);
  const [feeType, setFeeType] = useState("amount");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    setPageName("Withdraw");
    getWallets();
  }, []);

  const schema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Amount must be a number. Please enter a valid number.")
      .required("amount is required!")
      .min(10)
      .max(maxAmount),
    address: yup.string().required("address is required!"),
  });
  const otpSchema = yup.object().shape({
    otp: yup
      .string()
      .required("OTP is required!")
      .length(6, "OTP must be 6 digit number"),
  });

  const resetAllStates = () => {
    setLoading2(false);
    setFees(undefined);
    setFinalValues(undefined);
    setCurrentFees("fast");
    setFeeToPay(0);
    setOtpSent(false);
    setFeeType("amount");

    const ETHIndex = wallets.findIndex((x) => x.value === "ETH");
    setCurrentIndex(ETHIndex);

    setWalletInitial({
      currency: "ETH",
      amount: 0,
      address: "",
    });
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    setLoading2(true);
    const amount = Number(
      Number(cryptoData[currentIndex].transfer_rate) * values.amount
    ).toFixed(8);
    setFinalValues({ ...values, amount });
    try {
      if (Boolean(fees)) {
        const {
          data: { data, message },
        } = await axiosBaseApi.post("/wallet/sendConfirmationOTP", {
          ...values,
          amount,
        });
        setOtpSent(true);
        setCountdown(60);
        setResendOTP(true);
        dispatch({
          type: TOAST_SHOW,
          payload: {
            message,
          },
        });
      } else {
        const {
          data: { data },
        } = await axiosBaseApi.post("/wallet/estimateFees", {
          ...values,
          amount,
        });
        setFees(data);
        if (feeType === "wallet") {
          const feesInUSD =
            Number(data[currentFees]) *
            Number(cryptoData[currentIndex].transfer_rate);

          const tempAmount = Number(
            Number(cryptoData[currentIndex].amount_in_usd) -
              minimumDollar -
              feesInUSD
          );
          setMaxAmount(Number(tempAmount.toFixed(8)));
        }
        setFeeToPay(data[currentFees]);
      }

      setLoading2(false);
    } catch (e: any) {
      const message = e.response.data.message ?? e.message;
      dispatch({
        type: TOAST_SHOW,
        payload: {
          message: message,
          severity: "error",
        },
      });
      setTransaction(undefined);
      setFees(undefined);
    }
    setLoading2(false);
  };

  const handleOTPSubmit = async (values: any) => {
    try {
      setLoading2(true);
      const {
        data: { data },
      } = await axiosBaseApi.post("/wallet/withdrawAssets", {
        ...finalValues,
        ...values,
        feeType,
        feeToPay,
      });
      setTransaction(data);
      resetAllStates();
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
    setLoading2(false);
  };

  const handleOTPResend = async () => {
    const {
      data: { data, message },
    } = await axiosBaseApi.post("/wallet/sendConfirmationOTP", {
      ...finalValues,
    });
    setResendOTP(true);
    dispatch({
      type: TOAST_SHOW,
      payload: {
        message,
      },
    });
  };
  useEffect(() => {
    if (resendOtp) {
      setCountdown(60);
      const timeOutId = setTimeout(() => {
        setResendOTP(false);
      }, 60000);
      return () => clearTimeout(timeOutId);
    }
  }, [resendOtp]);

  useEffect(() => {
    if (countdown !== -1) {
      const timerId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [countdown]);

  const getWallets = async () => {
    try {
      const {
        data: { data },
      } = await axiosBaseApi.get("/wallet/getWallet");

      const tempWallets = data.filter((x: any) => x.currency_type === "CRYPTO");
      const tempWalletData: menuItem[] = [];
      const allCurrency = [];
      for (let i = 0; i < data.length; i++) {
        const x = data[i];
        if (x.currency_type === "CRYPTO") {
          tempWalletData.push({
            label: x.wallet_type,
            value: x.wallet_type,
          });
          allCurrency.push(x.wallet_type);
        }
      }
      const ETHIndex = tempWalletData.findIndex((x) => x.value === "ETH");

      setCurrentIndex(ETHIndex);
      setWallets(tempWalletData);
      setCryptoData(tempWallets);

      const tempAmount = Number(
        Number(tempWallets[ETHIndex].amount_in_usd) - minimumDollar
      );
      setMaxAmount(Number(tempAmount.toFixed(2)));
      setLoading(false);
    } catch (e: any) {
      const message = e?.response?.data?.message ?? e.message;
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
      {loading ? (
        <>
          <Box
            sx={{
              height: "375px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingIcon size={75} />
          </Box>
        </>
      ) : (
        <Box sx={{ maxWidth: "500px" }}>
          <FormManager
            initialValues={walletInitial}
            yupSchema={schema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              submitDisable,
              touched,
              values,
            }) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Dropdown
                    fullWidth={true}
                    label={"Currency"}
                    menuItems={wallets}
                    value={values.currency}
                    error={touched.currency && errors.currency}
                    helperText={
                      touched.currency && errors.currency && errors.currency
                    }
                    getValue={(value: any) => {
                      const e: any = {
                        target: {
                          name: "currency",
                          value,
                        },
                      };
                      const index = cryptoData.findIndex(
                        (x) => x.wallet_type === value
                      );
                      setCurrentIndex(index);
                      setFees(undefined);
                      setOtpSent(false);

                      const tempAmount = Number(
                        Number(cryptoData[index].amount_in_usd) - minimumDollar
                      );
                      setMaxAmount(Number(tempAmount.toFixed(8)));
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  <Typography>
                    Balance :{" "}
                    {getCurrencySymbol(
                      values.currency,
                      countDecimals(cryptoData[currentIndex].amount) > 8
                        ? cryptoData[currentIndex].amount.toFixed(8)
                        : cryptoData[currentIndex].amount
                    )}{" "}
                    ($ {cryptoData[currentIndex].amount_in_usd})
                  </Typography>
                </Box>
                <Box
                  sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2 }}
                >
                  <TextBox
                    name="amount"
                    fullWidth
                    label={"Amount in $"}
                    placeholder="Enter amount in $"
                    value={values.amount}
                    error={touched.amount && errors.amount}
                    helperText={
                      touched.amount && errors.amount && errors.amount
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {!errors.amount && (
                    <Typography sx={{ mt: 2, whiteSpace: "nowrap" }}>
                      = ({" "}
                      {Number(
                        Number(cryptoData[currentIndex].transfer_rate) *
                          values.amount
                      ).toFixed(8)}{" "}
                      {cryptoData[currentIndex].wallet_type})
                    </Typography>
                  )}
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextBox
                    name="address"
                    fullWidth
                    label={"Address"}
                    disabled={Boolean(fees)}
                    placeholder="Enter address"
                    value={values.address}
                    error={touched.address && errors.address}
                    helperText={
                      touched.address && errors.address && errors.address
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography sx={{ my: 2 }}>
                    How you want to <br />
                    pay the fees:{" "}
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={feeType}
                    onChange={(e) => {
                      setFeeType(e.target.value);
                      if (e.target.value === "wallet") {
                        const feesInUSD =
                          Number(feeToPay) *
                          Number(cryptoData[currentIndex].transfer_rate);

                        const tempAmount = Number(
                          Number(cryptoData[currentIndex].amount_in_usd) -
                            minimumDollar -
                            feesInUSD
                        );
                        setMaxAmount(Number(tempAmount.toFixed(8)));
                      }
                    }}
                    name="radio-buttons-group"
                    row
                  >
                    <FormControlLabel
                      value="amount"
                      control={<Radio />}
                      label="From Amount"
                    />
                    <FormControlLabel
                      value="wallet"
                      control={<Radio />}
                      label="From Wallet"
                    />
                  </RadioGroup>
                </Box>

                <Collapse in={Boolean(fees)}>
                  {fees && (
                    <Box>
                      <Typography sx={{ my: 2 }}>
                        Choose Fees to Pay:{" "}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={currentFees}
                        onChange={(e) => {
                          const current = e.target.value;
                          const tempFees: any = { ...fees };
                          setCurrentFees(current);
                          if (feeType === "wallet") {
                            const tempAmount = Number(
                              Number(cryptoData[currentIndex].amount_in_usd) -
                                minimumDollar -
                                tempFees[current]
                            );
                            setMaxAmount(Number(tempAmount.toFixed(8)));
                          }
                          setFeeToPay(tempFees[current]);
                        }}
                        name="radio-buttons-group"
                        row
                      >
                        <FormControlLabel
                          value="fast"
                          control={<Radio />}
                          label={`Fast: ${Number(
                            fees.fast /
                              Number(cryptoData[currentIndex].transfer_rate)
                          ).toFixed(2)}$ (${fees.fast} ${
                            cryptoData[currentIndex].wallet_type
                          })`}
                        />
                        <FormControlLabel
                          value="medium"
                          control={<Radio />}
                          label={`Medium: ${Number(
                            fees.medium /
                              Number(cryptoData[currentIndex].transfer_rate)
                          ).toFixed(2)}$ (${fees.medium} ${
                            cryptoData[currentIndex].wallet_type
                          })`}
                        />
                        <FormControlLabel
                          value="slow"
                          control={<Radio />}
                          label={`Slow: ${Number(
                            fees.slow /
                              Number(cryptoData[currentIndex].transfer_rate)
                          ).toFixed(2)}$ (${fees.slow} ${
                            cryptoData[currentIndex].wallet_type
                          })`}
                        />
                      </RadioGroup>
                    </Box>
                  )}
                </Collapse>
                <Collapse in={!otpSent}>
                  <Box
                    sx={{
                      mt: 3,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {loading2 && <LoadingIcon size={25} />}

                    <Button
                      variant="rounded"
                      type="submit"
                      disabled={submitDisable ? submitDisable : loading2}
                      sx={{ py: 1.5, ml: 2 }}
                    >
                      {Boolean(fees) ? "Send OTP" : "Estimate Fee"}
                    </Button>
                  </Box>
                </Collapse>
              </>
            )}
          </FormManager>
          <Collapse in={otpSent}>
            <FormManager
              initialValues={OTPInitial}
              yupSchema={otpSchema}
              onSubmit={handleOTPSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                submitDisable,
                touched,
                values,
              }) => (
                <Box sx={{ mt: 2 }}>
                  <TextBox
                    name="otp"
                    fullWidth
                    label={"OTP"}
                    uppercase
                    placeholder="Enter otp"
                    value={values.otp}
                    error={touched.otp && errors.otp}
                    helperText={touched.otp && errors.otp && errors.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Typography
                    sx={{
                      ml: 2,
                      fontWeight: 500,
                      fontSize: "14px",
                      color: resendOtp ? "text.disabled" : "text.secondary",
                      cursor: resendOtp ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!resendOtp) {
                        setResendOTP(true);
                        handleOTPResend();
                      }
                    }}
                  >
                    Resend Code {resendOtp ? `in ${countdown}s` : ""}
                  </Typography>
                  <Box
                    sx={{
                      mt: 3,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {loading2 && <LoadingIcon size={25} />}

                    <Button
                      variant="rounded"
                      type="submit"
                      disabled={submitDisable ? submitDisable : loading2}
                      sx={{ py: 1.5, ml: 2 }}
                    >
                      Withdraw
                    </Button>
                  </Box>
                </Box>
              )}
            </FormManager>
          </Collapse>

          {transaction && (
            <Typography mt={5}>
              {"Transaction ID: " + transaction?.txId}
            </Typography>
          )}

          {/* <Grid item md={6} xs={12}>
              
            </Grid> */}
        </Box>
      )}
    </Box>
  );
};

export default Withdraw;
