import BrandLogo from "@/Components/Layout/BrandLogo";
import FormManager from "@/Components/Page/Common/FormManager";
import TextBox from "@/Components/UI/TextBox";
import {
  AccountBalanceRounded,
  CreditCardRounded,
  CurrencyBitcoinRounded,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import * as yup from "yup";

const initialValue = {
  number: "",
  expiry: "",
  cvc: "",
  name: "",
  focus: "",
};

interface cardType {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused;
}

const Payment = () => {
  const theme = useTheme();
  const [state, setState] = useState<cardType>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const cardPaymentSchema = yup.object().shape({
    name: yup
      .string()
      .required("card holder name is required!")
      .max(30, "Please enter a valid name"),
  });

  const handleInputChange = (evt: any) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (values: any) => {
    console.log("values==================>", values);
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100vh" }} alignItems={"center"}>
        <Grid
          item
          md={3}
          sx={{
            background: theme.palette.primary.main,
            height: "inherit",
          }}
        >
          {/* <Box sx={{ textAlign: "center" }}>
            <BrandLogo />
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 0 5px #121212",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "#fff",
                gap: 2,
                "& .paymentBox": {
                  display: "flex",
                  gap: 1,
                  p: 3,
                  px: 5,
                  width: "100%",
                  "&.activeBox": {
                    background: "#fff",
                    color: "text.primary",
                  },
                },
              }}
            >
              <Box className="paymentBox activeBox">
                <CreditCardRounded />
                <Typography>Card</Typography>
              </Box>
              <Box className="paymentBox">
                <AccountBalanceRounded />
                <Typography>Bank</Typography>
              </Box>
              <Box className="paymentBox">
                <CurrencyBitcoinRounded />
                <Typography>Crypto</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              maxWidth: "750px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <BrandLogo />
                <Typography>Standard Payment</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
                  $125.99
                </Typography>
                <Typography sx={{ fontSize: 16 }}>temp@gmail.com</Typography>
              </Box>
            </Box>
            <Divider flexItem sx={{ my: 2 }} />
            <Typography>Enter your card details</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 5,
                width: "100%",
              }}
            >
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                preview
                focused={state.focus}
                callback={(type, isValid) => {
                  console.log("cardType============>", type, isValid);
                }}
              />
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <FormManager
                  initialValues={initialValue}
                  yupSchema={cardPaymentSchema}
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        rowGap: "20px",
                        width: "100%",
                      }}
                    >
                      <TextBox
                        name="name"
                        placeholder="Enter card holder name"
                        label="card holder"
                        value={values.name}
                        fullWidth
                        onChange={(e) => {
                          handleInputChange(e);
                          handleChange(e);
                        }}
                        onFocus={handleInputFocus}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}
                        helperText={touched.name && errors.name && errors.name}
                      />
                      <TextBox
                        type="number"
                        name="number"
                        placeholder="Enter card Number"
                        label="Card number"
                        value={state.number}
                        fullWidth
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <TextBox
                          name="name"
                          placeholder="Expiry Date"
                          value={values.name}
                          label={"valid till"}
                          fullWidth
                          onChange={(e) => {
                            handleInputChange(e);
                            handleChange(e);
                          }}
                          onFocus={handleInputFocus}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                          helperText={
                            touched.name && errors.name && errors.name
                          }
                        />
                        <Box>
                          <Typography
                            sx={{ fontSize: 11, fontWeight: 600, ml: 1 }}
                          >
                            CVC/CVV
                          </Typography>
                          <TextBox
                            type="number"
                            name="number"
                            placeholder="CVC"
                            value={state.number}
                            fullWidth
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </FormManager>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
