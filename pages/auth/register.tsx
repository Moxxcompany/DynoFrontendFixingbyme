import Panel from "@/Components/UI/Panel";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Wallet from "@/assets/Images/wallet.png";
import FormManager from "@/Components/Page/Common/FormManager";
import {
  Apple,
  CancelRounded,
  CheckCircleRounded,
  Google,
  Password,
  Telegram,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";

import * as yup from "yup";
import { UserAction } from "@/Redux/Actions";
import { USER_REGISTER } from "@/Redux/Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { rootReducer } from "@/utils/types";
import TextBox from "@/Components/UI/TextBox";
import LoadingIcon from "@/assets/Icons/LoadingIcon";

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const passwordRef = useRef<any>();
  const router = useRouter();
  const [viewPassword, setViewPassword] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    digitCount: false,
    capital: false,
    small: false,
    special: false,
    digits: false,
  });
  const userState = useSelector((state: rootReducer) => state.userReducer);
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/~]).{8,20}$/;
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required!"),
    lastName: yup.string().required("Last Name is required!"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("email is required!"),

    password: yup
      .string()
      .required("Password is required!")
      .matches(regex, " "),
    confirmPassword: yup
      .string()
      .required("Confirm password is required!")
      .when("password", (password: any, schema) => {
        return schema.test({
          test: (value: string) => value === password[0],
          message: "Password and confirm password should be same!",
        });
      }),
  });

  const handleSubmit = (values: any) => {
    const { confirmPassword, firstName, lastName, email, password } = values;
    const finalPayload = {
      name: firstName + " " + lastName,
      email: email,
      password: password,
    };
    dispatch(UserAction(USER_REGISTER, finalPayload));
  };

  const handlePasswordValidation = (password: string) => {
    const capital = /[A-Z]/.test(password);
    const small = /[a-z]/.test(password);
    const digits = /\d/.test(password);
    const special = /[!@#$%^&*()-=_+{}[\]:;<>,.?/~]/.test(password);
    const digitCount = password.length >= 8 && password.length <= 20;
    setPasswordValidation({ capital, small, digits, digitCount, special });
    if (capital && small && digits && digitCount && special) {
      setPopUp(false);
    }
  };

  useEffect(() => {
    if (userState.name) {
      router.push({
        pathname: "/",
      });
    }
  }, [userState]); // eslint-disable-line

  return (
    <Box>
      <Popover
        open={popUp}
        anchorEl={passwordRef.current}
        disableEnforceFocus
        disableAutoFocus
        onClose={() => setPopUp(false)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            background: "transparent",
            p: 2,
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            position: "relative",
            background: "#fff",
            borderRadius: "10px",
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
            "&::before": {
              backgroundColor: "#fff",
              content: '""',
              display: "block",
              position: "absolute",
              width: 15,
              height: 15,
              top: "50%",
              transform: "translateY(-50%)",
              clipPath: "polygon(100% 50%, 0 0, 0 100%);",
              right: -15,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              rowGap: 1,

              mt: -1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                color: passwordValidation.capital ? "#2e7d32" : "#d32f2f",
                alignItems: "center",
              }}
            >
              {passwordValidation.capital ? (
                <CheckCircleRounded fontSize="small" />
              ) : (
                <CancelRounded fontSize="small" />
              )}
              <Typography sx={{ ml: 0.5 }}>Atleast 1 capital letter</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: passwordValidation.small ? "#2e7d32" : "#d32f2f",
              }}
            >
              {passwordValidation.small ? (
                <CheckCircleRounded fontSize="small" />
              ) : (
                <CancelRounded fontSize="small" />
              )}
              <Typography sx={{ ml: 0.5 }}>Atleast 1 small letter</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: passwordValidation.special ? "#2e7d32" : "#d32f2f",
              }}
            >
              {passwordValidation.special ? (
                <CheckCircleRounded fontSize="small" />
              ) : (
                <CancelRounded fontSize="small" />
              )}
              <Typography sx={{ ml: 0.5 }}>
                Atleast 1 special character
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: passwordValidation.digits ? "#2e7d32" : "#d32f2f",
              }}
            >
              {passwordValidation.digits ? (
                <CheckCircleRounded fontSize="small" />
              ) : (
                <CancelRounded fontSize="small" />
              )}
              <Typography sx={{ ml: 0.5 }}>Atleast 1 digit</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: passwordValidation.digitCount ? "#2e7d32" : "#d32f2f",
              }}
            >
              {passwordValidation.digitCount ? (
                <CheckCircleRounded fontSize="small" />
              ) : (
                <CancelRounded fontSize="small" />
              )}
              <Typography sx={{ ml: 0.5 }}>
                Minimum 8 characters and maximum 20 characters
              </Typography>
            </Box>
          </Box>
        </Box>
      </Popover>
      <Grid container sx={{ height: "100vh" }}>
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
        <Grid item md={4.5} sx={{ height: "100vh", overflowY: "auto" }}>
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
              Register
            </Typography>
            <Typography fontSize={18} mt={1}>
              Let&apos;s get started your journey with us.
            </Typography>
            <Divider sx={{ my: 3 }} />

            <FormManager
              initialValues={initialValue}
              yupSchema={registerSchema}
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
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      rowGap: "20px",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Grid container columnSpacing={2}>
                        <Grid item md={6} xs={12}>
                          <Typography
                            sx={{
                              ml: 1,
                              fontSize: "14px",
                              textTransform: "capitalize",
                            }}
                          >
                            First Name
                          </Typography>
                          <TextBox
                            fullWidth={true}
                            placeholder="Enter your first name"
                            name="firstName"
                            value={values.firstName}
                            error={touched.firstName && errors.firstName}
                            helperText={
                              touched.firstName &&
                              errors.firstName &&
                              errors.firstName
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Typography
                            sx={{
                              ml: 1,
                              fontSize: "14px",
                              textTransform: "capitalize",
                            }}
                          >
                            Last Name
                          </Typography>
                          <TextBox
                            fullWidth={true}
                            placeholder="Enter your last name"
                            name="lastName"
                            value={values.lastName}
                            error={touched.lastName && errors.lastName}
                            helperText={
                              touched.lastName &&
                              errors.lastName &&
                              errors.lastName
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                      </Grid>
                    </Box>

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
                        fullWidth={true}
                        placeholder="Enter your email"
                        name="email"
                        value={values.email}
                        error={touched.email && errors.email}
                        helperText={
                          touched.email && errors.email && errors.email
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          ml: 1,
                          fontSize: "14px",
                          textTransform: "capitalize",
                        }}
                      >
                        Password
                      </Typography>

                      <TextBox
                        fullWidth={true}
                        inputRef={passwordRef}
                        type={viewPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={values.password}
                        error={touched.password && errors.password}
                        helperText={
                          touched.password && errors.password && errors.password
                        }
                        onClick={() => setPopUp(true)}
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
                        onChange={(e) => {
                          handlePasswordValidation(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          ml: 1,
                          fontSize: "14px",
                          textTransform: "capitalize",
                        }}
                      >
                        Confirm Password
                      </Typography>
                      <TextBox
                        fullWidth={true}
                        type={viewConfirmPassword ? "text" : "password"}
                        placeholder="Enter your password again"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        helperText={
                          touched.confirmPassword &&
                          errors.confirmPassword &&
                          errors.confirmPassword
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() =>
                                setViewConfirmPassword(!viewConfirmPassword)
                              }
                            >
                              {viewConfirmPassword ? (
                                <VisibilityOffRounded color="secondary" />
                              ) : (
                                <VisibilityRounded color="secondary" />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography width="100%" marginLeft={2} fontWeight={500}>
                        Already have an account?{" "}
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: 500,
                            color: "text.secondary",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            router.push("/auth/login");
                          }}
                        >
                          Login
                        </Typography>
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",

                          maxWidth: "fit-content",
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
                            Sign up
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </FormManager>
            {/* <Box
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
            </Box> */}
            {/* <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Button
                variant="rounded"
                color="white"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  "& img": {
                    width: "20px",
                    height: "auto",
                  },
                }}
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/auth/validateSocialRegister",
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
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
