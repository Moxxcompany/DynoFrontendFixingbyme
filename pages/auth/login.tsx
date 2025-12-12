// import Panel from "@/Components/UI/Panel";
// import {
//   Box,
//   Button,
//   Collapse,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   IconButton,
//   Radio,
//   RadioGroup,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Wallet from "@/assets/Images/wallet.png";
// import FormManager from "@/Components/Page/Common/FormManager";
// import {
//   Apple,
//   Google,
//   Password,
//   Telegram,
//   VisibilityOffRounded,
//   VisibilityRounded,
// } from "@mui/icons-material";

// import * as yup from "yup";
// import { UserAction } from "@/Redux/Actions";
// import {
//   USER_CONFIRM_CODE,
//   USER_EMAIL_CHECK,
//   USER_LOGIN,
//   USER_SEND_OTP,
// } from "@/Redux/Actions/UserAction";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { rootReducer } from "@/utils/types";
// import TextBox from "@/Components/UI/TextBox";
// import LoadingIcon from "@/assets/Icons/LoadingIcon";
// import GoogleIcon from "@/assets/Images/googleIcon.svg";
// import { signIn } from "next-auth/react";
// import TelegramLoginButton from "@/Components/Page/Common/TelegramLogin";
// import axios from "axios";
// import axiosBaseApi from "@/axiosConfig";
// import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";

// const initialValue = {
//   email: "",
//   password: "",
//   otp: "",
//   emailOTP: "",
// };

// const Login = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const userState = useSelector((state: rootReducer) => state.userReducer);
//   const [viewPassword, setViewPassword] = useState(false);
//   const [sent, setSent] = useState(false);
//   const [signInType, setSignInType] = useState("mobile");
//   const [collapse, setCollapse] = useState(false);
//   const [countdown, setCountdown] = useState(-1);
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const loginSchema = yup.object().shape({
//     email: yup
//       .string()
//       .email("Please enter a valid email")
//       .required("email is required!"),
//   });
//   const passwordSchema = yup.object().shape({
//     password: yup.string().test("password", "password is required", (value) => {
//       let flag = true;
//       if (signInType === "password") {
//         if (value === "" || value === null) {
//           flag = false;
//         } else {
//           flag = true;
//         }
//       }
//       return flag;
//     }),
//     otp: yup.string().test("otp", "OTP is required", (value) => {
//       let flag = true;
//       if (signInType === "mobile") {
//         if (value === "" || value === null) {
//           flag = false;
//         } else {
//           flag = true;
//         }
//       }
//       return flag;
//     }),
//     emailOTP: yup.string().test("emailOTP", "OTP is required", (value) => {
//       let flag = true;
//       if (signInType === "emailOTP") {
//         if (value === "" || value === null) {
//           flag = false;
//         } else {
//           flag = true;
//         }
//       }
//       return flag;
//     }),
//   });

//   useEffect(() => {
//     if (userState.name) {
//       router.replace("/");
//     }
//   }, [userState]); // eslint-disable-line

//   useEffect(() => {
//     if (sent) {
//       setCountdown(30);
//       const timeOutId = setTimeout(() => {
//         setSent(false);
//       }, 30000);
//       return () => clearTimeout(timeOutId);
//     }
//   }, [sent]);

//   useEffect(() => {
//     if (countdown !== -1) {
//       const timerId = setInterval(() => {
//         setCountdown(countdown - 1);
//       }, 1000);
//       return () => clearInterval(timerId);
//     }
//   }, [countdown]);

//   const handleCheck = async (values: any) => {
//     try {
//       const {
//         data: { data },
//       } = await axiosBaseApi.get("/user/checkEmail?email=" + values.email);

//       if (data.validEmail) {
//         setEmail(values.email);
//         dispatch({ type: USER_EMAIL_CHECK, payload: data });
//         setCollapse(!collapse);
//       } else {
//         setEmailError("Email not found! please try again");
//       }
//     } catch (e: any) {
//       const message = e.response.data.message ?? e.message;
//       dispatch({
//         type: TOAST_SHOW,
//         payload: {
//           message: message,
//           severity: "error",
//         },
//       });
//     }
//   };
//   const handleSubmit2 = (values: any) => {
//     if (signInType === "password") {
//       dispatch(UserAction(USER_LOGIN, { email, password: values.password }));
//     } else if (signInType === "emailOTP") {
//       dispatch(UserAction(USER_CONFIRM_CODE, { email, otp: values.emailOTP }));
//     } else if (signInType === "mobile") {
//       dispatch(
//         UserAction(USER_CONFIRM_CODE, {
//           email,
//           otp: values.otp,
//           mobile: userState.mobile,
//         })
//       );
//     }
//   };

//   const connectSocial = async (token: any) => {
//     const {
//       data: { data, message },
//     } = await axiosBaseApi.post("user/connectSocial", {
//       ...token,
//     });
//     dispatch({
//       type: TOAST_SHOW,
//       payload: { message },
//     });
//     dispatch({
//       type: USER_LOGIN,
//       payload: { ...data.userData, accessToken: data.accessToken },
//     });
//   };

//   return (
//     <Box>
//       <Grid container sx={{ height: "100vh" }}>
//         <Grid item md={4.5}>
//           <Box
//             sx={{
//               display: "flex",
//               height: "100%",
//               justifyContent: "center",
//               flexDirection: "column",
//               mx: 5,
//             }}
//           >
//             <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
//               Login
//             </Typography>
//             <Typography fontSize={18} mt={1}>
//               <Typography
//                 component={"span"}
//                 fontSize={"inherit"}
//                 fontWeight={700}
//               >
//                 Welcome back,{" "}
//               </Typography>
//               manage your transactions with us.
//             </Typography>
//             <Divider sx={{ my: 3 }} />
//             <Collapse in={!collapse} orientation="vertical">
//               <FormManager
//                 initialValues={initialValue}
//                 yupSchema={loginSchema}
//                 onSubmit={handleCheck}
//               >
//                 {({
//                   errors,
//                   handleBlur,
//                   handleChange,
//                   submitDisable,
//                   touched,
//                   values,
//                 }) => (
//                   <>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flexDirection: "column",
//                         rowGap: "20px",
//                         width: "100%",
//                       }}
//                     >
//                       <Box sx={{ width: "100%" }}>
//                         <Typography
//                           sx={{
//                             ml: 1,
//                             fontSize: "14px",
//                             textTransform: "capitalize",
//                           }}
//                         >
//                           Email
//                         </Typography>
//                         <TextBox
//                           mt={1}
//                           fullWidth={true}
//                           placeholder="Enter your email"
//                           name="email"
//                           value={values.email}
//                           error={(touched.email && errors.email) || emailError}
//                           helperText={
//                             (touched.email && errors.email && errors.email) ||
//                             (emailError && emailError)
//                           }
//                           onChange={(e) => {
//                             handleChange(e);
//                             setEmailError("");
//                           }}
//                           onBlur={(e) => {
//                             handleBlur(e);
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                     <Typography width="100%" marginLeft={2} fontWeight={500}>
//                       Don&apos;t have an account?{" "}
//                       <Typography
//                         component="span"
//                         sx={{
//                           fontWeight: 500,
//                           color: "text.secondary",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => {
//                           router.push("/auth/register");
//                         }}
//                       >
//                         Create new account
//                       </Typography>
//                     </Typography>
//                     <Box
//                       sx={{
//                         width: "fit-content",
//                         mt: 2,
//                         ml: "auto",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           lineHeight: 0,
//                           "& svg,img": {
//                             width: "30px",
//                             height: "auto",
//                             borderRadius: "100%",
//                           },
//                         }}
//                       >
//                         {userState.loading && <LoadingIcon />}
//                       </Box>
//                       <Button
//                         variant="rounded"
//                         type="submit"
//                         disabled={
//                           userState.loading === true
//                             ? userState.loading
//                             : submitDisable
//                         }
//                         sx={{ py: 1.5 }}
//                       >
//                         <Typography
//                           sx={{
//                             lineHeight: 1,
//                             fontSize: "0.875rem",
//                             px: 1,
//                             cursor: userState.loading
//                               ? "not-allowed"
//                               : "pointer",
//                           }}
//                         >
//                           Continue
//                         </Typography>
//                       </Button>
//                     </Box>
//                   </>
//                 )}
//               </FormManager>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     height: "1px",
//                     background: "#0000001f",
//                     my: 3,
//                     width: "100%",
//                   }}
//                 />
//                 <Typography
//                   sx={{
//                     background: "#fff",
//                     p: 1,
//                     fontWeight: 700,
//                   }}
//                 >
//                   OR
//                 </Typography>
//                 <Box
//                   sx={{
//                     height: "1px",
//                     background: "#0000001f",
//                     my: 3,
//                     width: "100%",
//                   }}
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   mt: 3,
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: "column",
//                   gap: 2,
//                 }}
//               >
//                 <Typography sx={{ fontSize: 11, fontWeight: 600 }}>
//                   Sign up / Log in with
//                 </Typography>
//                 <Button
//                   variant="rounded"
//                   color="white"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                     "& img": {
//                       width: "30px",
//                       height: "auto",
//                     },
//                   }}
//                   onClick={() =>
//                     signIn("google", {
//                       callbackUrl: "/auth/validateSocialLogin",
//                     })
//                   }
//                 >
//                   <img src={GoogleIcon.src} alt="no image" />
//                   Sign in with Google
//                 </Button>
//                 <TelegramLoginButton
//                   dataOnauth={async (user) => {
//                     await connectSocial({
//                       name: user.first_name,
//                       provider: "telegram",
//                       id: user.id.toString(),
//                       email: null,
//                       photo: user.photo_url,
//                     });
//                   }}
//                 />
//               </Box>
//             </Collapse>
//             <Collapse in={collapse} orientation="vertical">
//               <FormManager
//                 initialValues={initialValue}
//                 yupSchema={passwordSchema}
//                 onSubmit={handleSubmit2}
//               >
//                 {({
//                   errors,
//                   handleBlur,
//                   handleChange,
//                   submitDisable,
//                   touched,
//                   values,
//                 }) => (
//                   <>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flexDirection: "column",
//                         rowGap: "20px",
//                         width: "100%",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: "100%",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 1,
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: "14px",
//                             textTransform: "capitalize",

//                             fontWeight: 700,
//                           }}
//                         >
//                           Email:
//                         </Typography>
//                         <Typography sx={{ fontSize: 18 }}>{email}</Typography>
//                         <Typography
//                           sx={{
//                             ml: 3,
//                             mt: 0.5,
//                             fontSize: 14,
//                             color: "text.secondary",
//                             textDecoration: "underline",
//                             cursor: "pointer",
//                           }}
//                           onClick={() => setCollapse(!collapse)}
//                         >
//                           Change
//                         </Typography>
//                       </Box>
//                       <FormControl fullWidth>
//                         <FormLabel id="demo-radio-buttons-group-label">
//                           Choose a sign in method
//                         </FormLabel>
//                         <RadioGroup
//                           aria-labelledby="demo-radio-buttons-group-label"
//                           defaultValue="female"
//                           name="radio-buttons-group"
//                           value={signInType}
//                           onChange={(e) => setSignInType(e.target.value)}
//                         >
//                           <Box>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <FormControlLabel
//                                 value="mobile"
//                                 control={<Radio />}
//                                 label="Text me a verification code"
//                               />
//                               {signInType === "mobile" && userState.mobile && (
//                                 <Typography
//                                   sx={{
//                                     mr: 1,
//                                     fontWeight: 500,
//                                     fontSize: "14px",
//                                     color: sent
//                                       ? "text.disabled"
//                                       : "text.secondary",
//                                     cursor: sent ? "not-allowed" : "pointer",
//                                   }}
//                                   onClick={() => {
//                                     if (!sent) {
//                                       setSent(true);
//                                       dispatch(
//                                         UserAction(USER_SEND_OTP, {
//                                           email,
//                                           mobile: userState.mobile,
//                                         })
//                                       );
//                                     }
//                                   }}
//                                 >
//                                   Send OTP {sent ? `in ${countdown}s` : ""}
//                                 </Typography>
//                               )}
//                             </Box>
//                             <Collapse in={signInType === "mobile"}>
//                               <Box sx={{ width: "100%" }}>
//                                 <Typography
//                                   sx={{
//                                     fontSize: "12px",
//                                     ml: 4,
//                                     color: userState.mobile
//                                       ? "text.primary"
//                                       : "#d32f2f",
//                                   }}
//                                 >
//                                   {userState.mobile
//                                     ? "+ xxxxxxx" +
//                                       userState.mobile.substring(7)
//                                     : "Please enter a mobile number"}
//                                 </Typography>
//                                 <TextBox
//                                   mt={1}
//                                   fullWidth={true}
//                                   type="text"
//                                   placeholder="Enter OTP"
//                                   name="otp"
//                                   value={values.otp}
//                                   disabled={userState.mobile ? false : true}
//                                   error={touched.otp && errors.otp}
//                                   helperText={
//                                     touched.otp && errors.otp && errors.otp
//                                   }
//                                   onChange={handleChange}
//                                   onBlur={handleBlur}
//                                 />
//                               </Box>
//                             </Collapse>
//                           </Box>
//                           <Box sx={{ mt: 2 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <FormControlLabel
//                                 value="emailOTP"
//                                 control={<Radio />}
//                                 label="Email me a verification code"
//                               />
//                               {signInType === "emailOTP" && (
//                                 <Typography
//                                   sx={{
//                                     mr: 1,
//                                     fontWeight: 500,
//                                     fontSize: "14px",
//                                     color: sent
//                                       ? "text.disabled"
//                                       : "text.secondary",
//                                     cursor: sent ? "not-allowed" : "pointer",
//                                   }}
//                                   onClick={() => {
//                                     if (!sent) {
//                                       setSent(true);
//                                       dispatch(
//                                         UserAction(USER_SEND_OTP, {
//                                           email,
//                                           mobile: null,
//                                         })
//                                       );
//                                     }
//                                   }}
//                                 >
//                                   Send Code {sent ? `in ${countdown}s` : ""}
//                                 </Typography>
//                               )}
//                             </Box>
//                             <Collapse in={signInType === "emailOTP"}>
//                               <Box sx={{ width: "100%" }}>
//                                 <TextBox
//                                   mt={1}
//                                   fullWidth={true}
//                                   type="text"
//                                   placeholder="Enter OTP"
//                                   name="emailOTP"
//                                   value={values.emailOTP}
//                                   error={touched.emailOTP && errors.emailOTP}
//                                   helperText={
//                                     touched.emailOTP &&
//                                     errors.emailOTP &&
//                                     errors.emailOTP
//                                   }
//                                   onChange={handleChange}
//                                   onBlur={handleBlur}
//                                 />
//                               </Box>
//                             </Collapse>
//                           </Box>
//                           <Box sx={{ mt: 2 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <FormControlLabel
//                                 value="password"
//                                 control={<Radio />}
//                                 label="Password"
//                               />
//                               {signInType === "password" && (
//                                 <Typography
//                                   sx={{
//                                     mr: 1,
//                                     fontWeight: 500,
//                                     fontSize: "14px",
//                                     color: "text.secondary",
//                                     cursor: "pointer",
//                                   }}
//                                   onClick={() => {
//                                     router.push("/auth/forgot");
//                                   }}
//                                 >
//                                   Forgot password?
//                                 </Typography>
//                               )}
//                             </Box>
//                             <Collapse in={signInType === "password"}>
//                               <Box sx={{ width: "100%" }}>
//                                 <TextBox
//                                   mt={1}
//                                   fullWidth={true}
//                                   type={viewPassword ? "text" : "password"}
//                                   placeholder="Enter your password"
//                                   name="password"
//                                   value={values.password}
//                                   error={touched.password && errors.password}
//                                   helperText={
//                                     touched.password &&
//                                     errors.password &&
//                                     errors.password
//                                   }
//                                   InputProps={{
//                                     endAdornment: (
//                                       <IconButton
//                                         onClick={() =>
//                                           setViewPassword(!viewPassword)
//                                         }
//                                       >
//                                         {viewPassword ? (
//                                           <VisibilityOffRounded color="secondary" />
//                                         ) : (
//                                           <VisibilityRounded color="secondary" />
//                                         )}
//                                       </IconButton>
//                                     ),
//                                   }}
//                                   onChange={handleChange}
//                                   onBlur={handleBlur}
//                                 />
//                               </Box>
//                             </Collapse>
//                           </Box>
//                         </RadioGroup>
//                       </FormControl>
//                     </Box>
//                     <Box
//                       sx={{
//                         width: "100%",
//                         mt: 2,
//                         maxWidth: "250px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                       }}
//                     >
//                       <Button
//                         variant="rounded"
//                         type="submit"
//                         disabled={
//                           userState.loading === true
//                             ? userState.loading
//                             : submitDisable
//                         }
//                         sx={{ py: 1.5 }}
//                       >
//                         <Typography
//                           sx={{
//                             lineHeight: 1,
//                             fontSize: "0.875rem",
//                             px: 1,
//                             cursor: userState.loading
//                               ? "not-allowed"
//                               : "pointer",
//                           }}
//                         >
//                           Login
//                         </Typography>
//                       </Button>
//                       <Box
//                         sx={{
//                           lineHeight: 0,
//                           "& svg,img": {
//                             width: "30px",
//                             height: "auto",
//                             borderRadius: "100%",
//                           },
//                         }}
//                       >
//                         {userState.loading && <LoadingIcon />}
//                       </Box>
//                     </Box>
//                   </>
//                 )}
//               </FormManager>
//             </Collapse>
//           </Box>
//         </Grid>
//         <Grid
//           item
//           md={7.5}
//           sx={{
//             background: theme.palette.primary.main,
//             "& img": {
//               width: "400px",
//               height: "auto",
//               mt: 5,
//             },
//             color: "#fff",
//             px: 5,
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img src={Wallet.src} alt="no wallet" />
//           <Box>
//             <Typography sx={{ fontSize: 64, fontWeight: 900 }}>
//               BozzWallet
//             </Typography>
//             <Typography sx={{ fontSize: 18, fontWeight: 500, mt: 1 }}>
//               Welcome to BozzWallet, your secure and convenient digital wallet
//               solution. Simplifying your financial transactions has never been
//               easier.
//             </Typography>
//             <Button
//               variant="rounded"
//               color="white"
//               sx={{
//                 mt: 5,
//                 px: 5,
//                 py: 2,
//               }}
//             >
//               Learn More
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
  useTheme,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import GoogleIcon from "@/assets/Images/googleIcon.svg";
import ArrowUpwardIcon from "@/assets/Icons/up-arrow-icon.png";
import EditIcon from "@/assets/Icons/edit-icon.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Logo from "@/assets/Images/auth/dynopay-logo.png";
import { useTranslation } from "react-i18next";
import {
  AuthContainer,
  CardWrapper,
  ImageCenter,
} from "@/Containers/Login/styled";
import TitleDescription from "@/Components/UI/AuthLayout/TitleDescription";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import CustomRadio from "@/Components/UI/RadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { rootReducer } from "@/utils/types";
import * as yup from "yup";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import axiosBaseApi from "@/axiosConfig";
import {
  USER_CONFIRM_CODE,
  USER_EMAIL_CHECK,
  USER_LOGIN,
  UserAction,
} from "@/Redux/Actions/UserAction";
import Link from "next/link";
import CustomButton from "@/Components/UI/Buttons";
import { ContentWrapper } from "@/Containers/Login/styled";
import useIsMobile from "@/hooks/useIsMobile";

export default function Login() {
  const { t } = useTranslation("auth");
  const theme = useTheme();
  const isMobile = useIsMobile("md");
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state: rootReducer) => state.userReducer);
  const [viewPassword, setViewPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const [signInType, setSignInType] = useState("mobile");
  const [collapse, setCollapse] = useState(false);
  const [countdown, setCountdown] = useState(-1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginMethod, setLoginMethod] = useState("sms");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("email is required!"),
  });
  const passwordSchema = yup.object().shape({
    password: yup.string().test("password", "password is required", (value) => {
      let flag = true;
      if (signInType === "password") {
        if (value === "" || value === null) {
          flag = false;
        } else {
          flag = true;
        }
      }
      return flag;
    }),
    otp: yup.string().test("otp", "OTP is required", (value) => {
      let flag = true;
      if (signInType === "mobile") {
        if (value === "" || value === null) {
          flag = false;
        } else {
          flag = true;
        }
      }
      return flag;
    }),
    emailOTP: yup.string().test("emailOTP", "OTP is required", (value) => {
      let flag = true;
      if (signInType === "emailOTP") {
        if (value === "" || value === null) {
          flag = false;
        } else {
          flag = true;
        }
      }
      return flag;
    }),
  });

  useEffect(() => {
    if (userState.name) {
      router.replace("/");
    }
  }, [userState]); // eslint-disable-line

  useEffect(() => {
    if (sent) {
      setCountdown(30);
      const timeOutId = setTimeout(() => {
        setSent(false);
      }, 30000);
      return () => clearTimeout(timeOutId);
    }
  }, [sent]);

  useEffect(() => {
    if (countdown !== -1) {
      const timerId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [countdown]);

  const handleCheck = async (values: any) => {
    try {
      const {
        data: { data },
      } = await axiosBaseApi.get("/user/checkEmail?email=" + values.email);

      if (data.validEmail) {
        setEmail(values.email);
        dispatch({ type: USER_EMAIL_CHECK, payload: data });
        setCollapse(!collapse);
      } else {
        setEmailError("Email not found! please try again");
      }
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
  };
  const handleSubmit2 = (values: any) => {
    if (signInType === "password") {
      dispatch(UserAction(USER_LOGIN, { email, password: values.password }));
    } else if (signInType === "emailOTP") {
      dispatch(UserAction(USER_CONFIRM_CODE, { email, otp: values.emailOTP }));
    } else if (signInType === "mobile") {
      dispatch(
        UserAction(USER_CONFIRM_CODE, {
          email,
          otp: values.otp,
          mobile: userState.mobile,
        })
      );
    }
  };

  const connectSocial = async (token: any) => {
    const {
      data: { data, message },
    } = await axiosBaseApi.post("user/connectSocial", {
      ...token,
    });
    dispatch({
      type: TOAST_SHOW,
      payload: { message },
    });
    dispatch({
      type: USER_LOGIN,
      payload: { ...data.userData, accessToken: data.accessToken },
    });
  };

  return (
    <AuthContainer>
      <CardWrapper sx={{ height: isMobile ? "40px" : "56px" }}>
        {/* Logo */}
        <ImageCenter>
          <Image
            src={Logo}
            alt="logo"
            width={isMobile ? 86 : 114}
            height={isMobile ? 29 : 39}
            draggable={false}
          />
        </ImageCenter>
      </CardWrapper>

      {/* Login Card */}
      <CardWrapper sx={{ padding: "30px" }}>
        {/* Login Title & Description */}
        <TitleDescription
          title={t("login")}
          description={t("loginDescription")}
          align="left"
          titleVariant="h2"
          descriptionVariant="p"
        />

        {/* Email Input field */}
        <Box sx={{ marginTop: "24px" }}>
          <InputField
            label={t("email")}
            type="email"
            value=""
            placeholder={t("emailPlaceHolder")}
            sideButton={true}
            sideButtonType="primary"
            onSideButtonClick={() => {
              router.push("/auth/forgot-password");
            }}
            sideButtonIcon={EditIcon}
          />
        </Box>

        <Box sx={{ marginTop: isMobile ? "12px" : "24px" }}>
          <Typography
            sx={{
              textAlign: "start",
              fontSize: isMobile ? "13px" : "15px",
              fontFamily: "UrbanistMedium",
              color: "#676768",
            }}
          >
            Choose a login method
          </Typography>

          {/* Login Method Selection */}
          <Box sx={{ marginTop: "16px" }}>
            <RadioGroup
              value={loginMethod}
              onChange={(e) => setLoginMethod(e.target.value)}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: isMobile ? "13px" : "15px",
                  fontFamily: "UrbanistMedium",
                  color: "#242428",
                  paddingLeft: "8px",
                },
              }}
            >
              {/* SMS Option */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <FormControlLabel
                  value="sms"
                  control={<CustomRadio />}
                  label="Send the verification code via SMS"
                  sx={{ margin: "0px" }}
                />

                {/* Get Code Button */}
                {loginMethod === "sms" && !isMobile && !isOtpSent && (
                  <Box sx={{ marginTop: "8px" }}>
                    <CustomButton
                      variant="secondary"
                      size="medium"
                      label="Get code"
                      onClick={() => setIsOtpSent(true)}
                      sx={{
                        fontWeight: 500,
                        padding: "11px 28px",
                      }}
                      endIcon={ArrowUpwardIcon}
                    />
                  </Box>
                )}

                {/* Resend Code Button */}
                {loginMethod === "sms" && !isMobile && isOtpSent && (
                  <Box sx={{ marginTop: "8px" }}>
                    <CustomButton
                      variant="secondary"
                      disabled={isOtpSent}
                      size="medium"
                      label="Code in 30s"
                      onClick={() => setIsOtpSent(true)}
                      sx={{
                        fontWeight: 500,
                        padding: "11px 20px",
                      }}
                    />
                  </Box>
                )}
              </Box>

              {/* Mobile Input Field */}
              {loginMethod === "sms" && isMobile && !isOtpSent && (
                <Box sx={{ marginTop: "8px" }}>
                  <InputField
                    placeholder="Enter a mobile phone number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    sideButton={true}
                    sideButtonType="secondary"
                    sideButtonIcon={ArrowUpwardIcon}
                    onSideButtonClick={() => setIsOtpSent(true)}
                  />
                </Box>
              )}

              {/* Resend Code Button */}
              {loginMethod === "sms" && isMobile && isOtpSent && (
                <Box sx={{ marginTop: "8px" }}>
                  <CustomButton
                    variant="secondary"
                    disabled={isOtpSent}
                    size="medium"
                    label="Code in 30s"
                    fullWidth
                    onClick={() => setIsOtpSent(true)}
                    sx={{
                      height: "32px",
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "8px 20px",
                    }}
                  />
                </Box>
              )}

              {/* OTP Input Field (shown when SMS is selected) */}
              {isOtpSent && loginMethod === "sms" && (
                <Box sx={{ marginTop: "10px" }}>
                  <InputField
                    placeholder="Enter the OTP code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    helperText="Enter the code sent to the number provided"
                  />
                </Box>
              )}

              {/* Email Option */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <FormControlLabel
                  value="email"
                  control={<CustomRadio />}
                  label="Send me a verification code via email"
                  sx={{ margin: "16px 0 0 0", color: "#242428" }}
                />
                {/* Get Code Button */}
                {loginMethod === "email" && !isMobile && !isOtpSent && (
                  <CustomButton
                    variant="secondary"
                    size="medium"
                    label="Get code"
                    onClick={() => setIsOtpSent(true)}
                    sx={{
                      fontWeight: 500,
                      padding: "8px 28px",
                    }}
                    endIcon={ArrowUpwardIcon}
                  />
                )}

                {/* Resend Code Button */}
                {loginMethod === "email" && !isMobile && isOtpSent && (
                  <CustomButton
                    variant="secondary"
                    disabled={isOtpSent}
                    size="medium"
                    label="Code in 30s"
                    onClick={() => setIsOtpSent(true)}
                    sx={{
                      fontWeight: 500,
                      padding: "11px 20px",
                    }}
                  />
                )}
              </Box>

              {/* Get Code Button */}
              {loginMethod === "email" && isMobile && (
                <Box sx={{ marginTop: "16px" }}>
                  <CustomButton
                    variant="secondary"
                    size="small"
                    label={isOtpSent ? "Code in 30s" : "Get code"}
                    fullWidth
                    disabled={isOtpSent}
                    onClick={() => setIsOtpSent(true)}
                    sx={{
                      fontWeight: 500,
                      padding: "8px 28px",
                    }}
                    endIcon={isOtpSent ? undefined : ArrowUpwardIcon}
                  />
                </Box>
              )}

              {/* Email Input Field */}
              {loginMethod === "email" && isOtpSent && (
                <Box sx={{ marginTop: "16px" }}>
                  <InputField
                    placeholder="Enter the OTP code"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText="Enter the code sent to the email address provided"
                  />
                </Box>
              )}

              {/* Password Option */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "16px 0 0 0",
                }}
              >
                <FormControlLabel
                  value="password"
                  control={<CustomRadio />}
                  label="Password"
                  sx={{ margin: "0px", color: "#242428" }}
                />

                <Typography
                  component="span"
                  sx={{
                    fontSize: "13px",
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    textAlign: "start",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                    fontFamily: "UrbanistMedium",
                  }}
                  onClick={() => {
                    router.push("/auth/register");
                  }}
                >
                  Forgot your password?
                </Typography>
              </Box>
              {/* Password Input Field */}
              {loginMethod === "password" && (
                <Box sx={{ marginTop: "10px" }}>
                  <InputField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("passwordPlaceHolder")}
                    sideButton={true}
                    sideButtonType="primary"
                    sideButtonIcon={
                      <VisibilityIcon
                        sx={{ color: "#676768", height: "18px", width: "16px" }}
                      />
                    }
                    onSideButtonClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    showPasswordToggle={true}
                  />
                </Box>
              )}
            </RadioGroup>
          </Box>
        </Box>

        {/* Don't have acc */}
        <Box
          sx={{
            display: "flex",
            gap: "7px",
            marginTop: "16px",
            textAlign: "start",
          }}
        >
          <Typography
            width="100%"
            sx={{
              fontSize: "13px",
              color: theme.palette.text.secondary,
              fontFamily: "UrbanistMedium",
            }}
            fontWeight={500}
          >
            Don&apos;t have an account?{" "}
            <Typography
              component="span"
              sx={{
                fontSize: "13px",
                color: theme.palette.primary.main,
                fontWeight: 500,
                textAlign: "start",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                fontFamily: "UrbanistMedium",
              }}
              onClick={() => {
                router.push("/auth/register");
              }}
            >
              Create new account
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ marginTop: "24px" }}>
          <CustomButton
            label="Continue"
            variant="primary"
            size={isMobile ? "small" : "medium"}
            fullWidth
            sx={{
              fontWeight: 700,
            }}
          />
        </Box>

        <Box sx={{ marginTop: "24px" }}>
          <Divider
            sx={{
              borderColor: "red",
              "&::before, &::after": {
                borderColor: "#E9ECF2",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "UrbanistMedium",
                color: "#676768",
                padding: "0 24px",
                fontSize: isMobile ? "10px" : "15px",
              }}
            >
              Or
            </Typography>
          </Divider>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            padding: 0,
            marginTop: isMobile ? "16px" : "24px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: isMobile ? "13px" : "15px",
              fontFamily: "UrbanistMedium",
              color: "#676768",
            }}
          >
            Register / Log in with
          </Typography>

          <Box
            sx={{
              height: isMobile ? "32px" : "40px",
              width: isMobile ? "32px" : "40px",
              borderRadius: "100%",
              border: "1px solid #E9ECF2",
              backgroundColor: "#F4F6FA",
            }}
          >
            <ImageCenter>
              <Image
                src={GoogleIcon}
                alt="google login"
                width={24}
                height={24}
                draggable={false}
              />
            </ImageCenter>
          </Box>
        </Box>
      </CardWrapper>
    </AuthContainer>
  );
}
