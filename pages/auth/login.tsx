import Panel from "@/Components/UI/Panel";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Wallet from "@/assets/Images/wallet.png";
import FormManager from "@/Components/Page/Common/FormManager";
import {
  Apple,
  Google,
  Password,
  Telegram,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";

import * as yup from "yup";
import { UserAction } from "@/Redux/Actions";
import { USER_LOGIN } from "@/Redux/Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { rootReducer } from "@/utils/types";
import TextBox from "@/Components/UI/TextBox";
import LoadingIcon from "@/assets/Icons/LoadingIcon";
import GoogleIcon from "@/assets/Images/googleIcon.svg";
import { signIn } from "next-auth/react";
import TelegramLoginButton from "@/Components/Page/Common/TelegramLogin";
import axios from "axios";
import axiosBaseApi from "@/axiosConfig";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state: rootReducer) => state.userReducer);
  const [viewPassword, setViewPassword] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [email, setEmail] = useState("");
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("email is required!"),
  });
  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .email("Please enter a valid password")
      .required("password is required!"),
  });

  useEffect(() => {
    if (userState.name) {
      router.replace("/");
    }
  }, [userState]); // eslint-disable-line

  const handleCheck = async (values: any) => {
    setEmail(values.email);

    setCollapse(!collapse);
  };
  const handleSubmit2 = (values: any) => {
    dispatch(UserAction(USER_LOGIN, { email, password: values.password }));
    setCollapse(!collapse);
  };
  return (
    <Box>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item md={4.5}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
              flexDirection: "column",
              mx: 5,
            }}
          >
            <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
              Login
            </Typography>
            <Typography fontSize={18} mt={1}>
              <Typography
                component={"span"}
                fontSize={"inherit"}
                fontWeight={700}
              >
                Welcome back,{" "}
              </Typography>
              manage your transactions with us.
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Collapse in={!collapse} orientation="vertical">
              <FormManager
                initialValues={initialValue}
                yupSchema={loginSchema}
                onSubmit={handleCheck}
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
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        rowGap: "20px",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          sx={{
                            ml: 1,
                            fontSize: "14px",
                            textTransform: "capitalize",
                          }}
                        >
                          Email
                        </Typography>
                        <TextBox
                          mt={1}
                          fullWidth={true}
                          placeholder="Enter your email"
                          name="email"
                          value={values.email}
                          error={touched.email && errors.email}
                          helperText={
                            touched.email && errors.email && errors.email
                          }
                          onChange={handleChange}
                          onBlur={(e) => {
                            handleBlur(e);
                            console.log(e);
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography width="100%" marginLeft={2} fontWeight={500}>
                      Don&apos;t have an account?{" "}
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 500,
                          color: "text.secondary",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          router.push("/auth/register");
                        }}
                      >
                        Create new account
                      </Typography>
                    </Typography>
                    <Box
                      sx={{
                        width: "fit-content",
                        mt: 2,
                        ml: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          lineHeight: 0,
                          "& svg,img": {
                            width: "30px",
                            height: "auto",
                            borderRadius: "100%",
                          },
                        }}
                      >
                        {userState.loading && <LoadingIcon />}
                      </Box>
                      <Button
                        variant="rounded"
                        type="submit"
                        disabled={
                          //   userState.loading === true
                          //     ? userState.loading
                          //     :
                          submitDisable
                        }
                        sx={{ py: 1.5 }}
                      >
                        <Typography
                          sx={{
                            lineHeight: 1,
                            fontSize: "0.875rem",
                            px: 1,
                            // cursor: userState.loading
                            //   ? "not-allowed"
                            //   : "pointer",
                          }}
                        >
                          Continue
                        </Typography>
                      </Button>
                    </Box>
                  </>
                )}
              </FormManager>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    height: "1px",
                    background: "#0000001f",
                    my: 3,
                    width: "100%",
                  }}
                />
                <Typography
                  sx={{
                    background: "#fff",
                    p: 1,
                    fontWeight: 700,
                  }}
                >
                  OR
                </Typography>
                <Box
                  sx={{
                    height: "1px",
                    background: "#0000001f",
                    my: 3,
                    width: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: 11, fontWeight: 600 }}>
                  Sign up / Log in with
                </Typography>
                <Button
                  variant="rounded"
                  color="white"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    "& img": {
                      width: "30px",
                      height: "auto",
                    },
                  }}
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "/auth/validateSocialLogin",
                    })
                  }
                >
                  <img src={GoogleIcon.src} alt="no image" />
                  Sign in with Google
                </Button>
                <TelegramLoginButton
                  dataOnauth={async (user) => {
                    const data = await axios.post(
                      `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
                      {
                        chat_id: user.id,
                        text: "Please provide an email or mobile number to have more control over your account.",
                      }
                    );
                    console.log(user);
                  }}
                />
              </Box>
            </Collapse>
            <Collapse in={collapse} orientation="vertical">
              <FormManager
                initialValues={initialValue}
                yupSchema={passwordSchema}
                onSubmit={handleSubmit2}
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
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        rowGap: "20px",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            textTransform: "capitalize",

                            fontWeight: 700,
                          }}
                        >
                          Email:
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>{email}</Typography>
                        <Typography
                          sx={{
                            ml: 3,
                            mt: 0.5,
                            fontSize: 14,
                            color: "text.secondary",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => setCollapse(!collapse)}
                        >
                          Change
                        </Typography>
                      </Box>

                      <Box sx={{ width: "100%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              ml: 1,
                              fontSize: "14px",
                              textTransform: "capitalize",
                            }}
                          >
                            Password
                          </Typography>
                          <Typography
                            sx={{
                              mr: 1,
                              fontWeight: 500,
                              fontSize: "14px",
                              color: "text.secondary",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              router.push("/auth/forgot");
                            }}
                          >
                            Forgot password?
                          </Typography>
                        </Box>
                        <TextBox
                          mt={1}
                          fullWidth={true}
                          type={viewPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          name="password"
                          value={values.password}
                          error={touched.password && errors.password}
                          helperText={
                            touched.password &&
                            errors.password &&
                            errors.password
                          }
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={() => setViewPassword(!viewPassword)}
                              >
                                {viewPassword ? (
                                  <VisibilityOffRounded color="secondary" />
                                ) : (
                                  <VisibilityRounded color="secondary" />
                                )}
                              </IconButton>
                            ),
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        mt: 2,
                        maxWidth: "250px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="rounded"
                        type="submit"
                        disabled={
                          userState.loading === true
                            ? userState.loading
                            : submitDisable
                        }
                        sx={{ py: 1.5 }}
                      >
                        <Typography
                          sx={{
                            lineHeight: 1,
                            fontSize: "0.875rem",
                            px: 1,
                            cursor: userState.loading
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          Login
                        </Typography>
                      </Button>
                      <Box
                        sx={{
                          lineHeight: 0,
                          "& svg,img": {
                            width: "30px",
                            height: "auto",
                            borderRadius: "100%",
                          },
                        }}
                      >
                        {userState.loading && <LoadingIcon />}
                      </Box>
                    </Box>
                  </>
                )}
              </FormManager>
            </Collapse>
          </Box>
        </Grid>
        <Grid
          item
          md={7.5}
          sx={{
            background: theme.palette.primary.main,
            "& img": {
              width: "400px",
              height: "auto",
              mt: 5,
            },
            color: "#fff",
            px: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Wallet.src} alt="no wallet" />
          <Box>
            <Typography sx={{ fontSize: 64, fontWeight: 900 }}>
              BozzWallet
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 500, mt: 1 }}>
              Welcome to BozzWallet, your secure and convenient digital wallet
              solution. Simplifying your financial transactions has never been
              easier.
            </Typography>
            <Button
              variant="rounded"
              color="white"
              sx={{
                mt: 5,
                px: 5,
                py: 2,
              }}
            >
              Learn More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
