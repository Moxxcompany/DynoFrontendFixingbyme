import { EditRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import * as yup from "yup";
// import {
//   USER_UPDATE,
//   USER_UPDATE_NOTIFICATION,
//   USER_UPDATE_PASSWORD,
//   UserAction,
// } from "@/Redux/Actions/UserAction";

import { firstCapital } from "@/helpers";
import { TokenData } from "@/utils/types";
import Panel from "@/Components/UI/Panel";
import FormManager from "../Common/FormManager";
import TextBox from "@/Components/UI/TextBox";
import { MuiTelInput } from "mui-tel-input";
import { UserAction } from "@/Redux/Actions";
import { USER_UPDATE, USER_UPDATE_PASSWORD } from "@/Redux/Actions/UserAction";

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
};

const initialPasswords = {
  oldPassword: "",
  newPassword: "",
};

const ProfilePageOld = ({ tokenData }: { tokenData: TokenData }) => {
  const dispatch = useDispatch();

  const fileRef = useRef<any>();
  const [media, setMedia] = useState<any>();
  const [editable, setEditable] = useState(false);
  const [initialUser, setInitialUser] = useState({ ...initialValue });
  const [initialPass, setInitialPass] = useState({ ...initialPasswords });

  const [userPhoto, setUserPhoto] = useState("");

  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    "gm"
  );

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("email is required"),
  });

  const passwordSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("New password is required")
      .matches(
        regex,
        "Please enter a valid password (requires 1 capital letter,1 small letter,1 number,1 special character and minimum 8 digit)"
      ),
  });

  useEffect(() => {
    const name = tokenData.name.split(" ");
    setInitialUser({
      firstName: name[0],
      lastName: name[1],
      email: tokenData.email,
      mobile: tokenData.mobile,
    });
    setUserPhoto(tokenData.photo);
  }, [tokenData]);

  const handleSubmit = (values: any) => {
    const { firstName, lastName, email, mobile } = values;
    const finalPayload = {
      name: firstName + " " + lastName,
      email,
      mobile,
    };
    const formData = new FormData();
    formData.append("image", media);
    formData.append("data", JSON.stringify({ ...finalPayload }));
    dispatch(UserAction(USER_UPDATE, formData));
    setEditable(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setUserPhoto(URL.createObjectURL(file));
      setMedia(file);
    }
  };

  const handlePasswordSubmit = (values: any) => {
    dispatch(UserAction(USER_UPDATE_PASSWORD, { ...values }));
    setInitialPass({ ...initialPasswords });
  };

  return (
    <Grid container columnSpacing={3} sx={{ mb: 3, rowGap: 2 }}>
      <Grid item md={6} xs={12}>
        <Panel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Account Setting
            </Typography>

            {!editable && (
              <IconButton onClick={() => setEditable(true)}>
                <EditRounded color="secondary" />
              </IconButton>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              mt: 3,
              width: "fit-content",
              "& img": {
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                objectFit: "cover",
              },
              ...(editable && {
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.3)",
                  zIndex: 1,
                  borderRadius: "20px",
                  transition: "0.3s",
                  opacity: 0,
                },
                "& .actionbar": {
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  opacity: 0,
                  transition: "0.3s",

                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
                  zIndex: 2,
                  background: "#fff",
                  borderRadius: "20px",
                },
                "&:hover": {
                  cursor: "pointer",
                  "& img": {
                    // opacity: 0.5,
                  },
                  "& .actionbar": {
                    opacity: 1,
                  },
                  "&::before": {
                    opacity: 1,
                  },
                },
              }),
            }}
          >
            {/* eslint-disable-next-line */}
            <img src={userPhoto} crossOrigin="anonymous" alt="no picture" />
            <input
              type="file"
              onChange={handleFileChange}
              hidden
              ref={fileRef}
            />
            {editable && (
              <Box className="actionbar">
                <IconButton onClick={() => fileRef.current.click()}>
                  <EditRounded color="secondary" />
                </IconButton>
              </Box>
            )}
          </Box>
          <FormManager
            initialValues={initialUser}
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
                    mt: 5,
                  }}
                >
                  <Grid container columnSpacing={2}>
                    <Grid item md={6}>
                      <TextBox
                        fullWidth={true}
                        label="First Name"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={values.firstName}
                        error={touched.firstName && errors.firstName}
                        helperText={
                          touched.firstName &&
                          errors.firstName &&
                          errors.firstName
                        }
                        disabled={!editable}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextBox
                        fullWidth={true}
                        label="Last Name"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={values.lastName}
                        error={touched.lastName && errors.lastName}
                        helperText={
                          touched.lastName && errors.lastName && errors.lastName
                        }
                        disabled={!editable}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                  </Grid>

                  <TextBox
                    fullWidth={true}
                    label="email"
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email && errors.email}
                    disabled={!editable}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        ml: 1,
                        fontSize: "11px",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    >
                      Mobile
                    </Typography>
                    <MuiTelInput
                      fullWidth={true}
                      placeholder="Enter your mobile number"
                      name="mobile"
                      forceCallingCode
                      disableFormatting
                      defaultCountry="US"
                      disabled={!editable}
                      value={values.mobile}
                      onChange={(newValue, info) => {
                        const e: any = {
                          target: {
                            name: "mobile",
                            value: newValue,
                          },
                        };
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableRipple={false}
                    sx={{
                      mt: 2,
                      borderRadius: "30px",
                      textTransform: "none",
                    }}
                    type="submit"
                    disabled={submitDisable ? submitDisable : !editable}
                  >
                    Update
                  </Button>

                  {editable && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      disableRipple={false}
                      sx={{
                        mt: 2,
                        ml: 1,
                        px: 3,
                        py: 1.5,
                        borderRadius: "30px",
                        textTransform: "none",
                      }}
                      onClick={() => setEditable(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </>
            )}
          </FormManager>
        </Panel>
      </Grid>
      <Grid item md={6} xs={12}>
        <Panel>
          <Typography variant="h6" fontWeight={700}>
            Update Password
          </Typography>

          <FormManager
            initialValues={initialPass}
            yupSchema={passwordSchema}
            onSubmit={handlePasswordSubmit}
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
                    mt: 2.5,
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <TextBox
                      fullWidth={true}
                      label="Old Password"
                      placeholder="Enter your old password"
                      name="oldPassword"
                      value={values.oldPassword}
                      error={touched.oldPassword && errors.oldPassword}
                      type="password"
                      helperText={
                        touched.oldPassword &&
                        errors.oldPassword &&
                        errors.oldPassword
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText sx={{ ml: 2 }} error={true}>
                      *if you logged in with google/telegram or didn&apos;t set
                      your password then left this field empty.
                    </FormHelperText>
                  </Box>

                  <TextBox
                    fullWidth={true}
                    label="New Password"
                    placeholder="Enter your new password"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    error={touched.newPassword && errors.newPassword}
                    helperText={
                      touched.newPassword &&
                      errors.newPassword &&
                      errors.newPassword
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableRipple={false}
                    sx={{
                      my: 2,
                      borderRadius: "30px",
                      textTransform: "none",
                    }}
                    type="submit"
                    disabled={submitDisable}
                  >
                    Update
                  </Button>
                </Box>
              </>
            )}
          </FormManager>
        </Panel>
      </Grid>
    </Grid>
  );
};

export default ProfilePageOld;
