import { EditRounded, CameraAlt, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { MuiTelInput } from "mui-tel-input";

import { TokenData } from "@/utils/types";
import PanelCard from "@/Components/UI/PanelCard";
import FormManager from "../Common/FormManager";
import TextBox from "@/Components/UI/TextBox";
import { UserAction } from "@/Redux/Actions";
import { USER_UPDATE } from "@/Redux/Actions/UserAction";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import Image from "next/image";
import CustomButton from "@/Components/UI/Buttons";

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
};

const AccountSetting = ({ tokenData }: { tokenData: TokenData }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const fileRef = useRef<any>();
  const [media, setMedia] = useState<any>();
  const [editable, setEditable] = useState(false);
  const [initialUser, setInitialUser] = useState({ ...initialValue });
  const [userPhoto, setUserPhoto] = useState("");

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("email is required"),
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

  return (
    <PanelCard
      bodyPadding={`${theme.spacing(2, 2.5, 2.5, 2.5)}`}
      title="Account Setting"
      headerAction={
        !editable && (
          <IconButton onClick={() => setEditable(true)}>
            <EditRounded color="action" />
          </IconButton>
        )
      }
      showHeaderBorder={false}
    >
      <Box>
        {/* Avatar */}
        <Box
          sx={{
            mx: "auto",
            border: "1px solid",
            position: "relative",
            width: 70,
            height: 70,
            borderRadius: "50%",
            overflow: "hidden",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={userPhoto}
            alt="Profile photo"
            fill
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </Box>

        {/* Actions */}
        <Box  mt={"2px"}>
          <Grid container columnSpacing={2}>
            <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CustomButton
                label="Upload new photo"
                variant="outlined"
                size="medium"
                startIcon={<CameraAlt />}
                iconSize={18}
                onClick={() => fileRef.current?.click()}
              />
            </Grid>
            <Grid item md={6}>
              <CustomButton
                label="Remove"
                variant="outlined"
                size="medium"
                startIcon={<DeleteOutline />}
                iconSize={18}
                onClick={() => setUserPhoto("")}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
        />
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
                flexDirection: "column",
                rowGap: "14px",
                width: "100%",
                mt: "14px",
              }}
            >
              <Grid container columnSpacing={2}>
                <Grid item md={6}>
                  <InputField
                    fullWidth={true}
                    inputHeight="38px"
                    label="First Name"
                    placeholder="Enter your first name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="firstName"
                    error={touched.firstName && errors.firstName}
                    helperText={
                      touched.firstName && errors.firstName && errors.firstName
                    }
                    disabled={!editable}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputField
                    fullWidth={true}
                    inputHeight="38px"
                    label="Surname"
                    placeholder="Enter your surname"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && errors.lastName}
                    helperText={
                      touched.lastName && errors.lastName && errors.lastName
                    }
                    disabled={!editable}
                  />
                </Grid>
              </Grid>

              <Grid container columnSpacing={2}>
                <Grid item md={6}>
                  <InputField
                    fullWidth={true}
                    inputHeight="38px"
                    label="E-mail"
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email && errors.email}
                    disabled={!editable}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item md={6}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: "15px",
                        textAlign: "start",
                        color: !editable ? "#B0BEC5" : "#242428",
                        lineHeight: "1.2",
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
                      sx={{
                        borderRadius: "6px !important",
                        boxShadow: "none",
                        fontFamily: "UrbanistMedium",
                        "& .MuiInputBase-root": {
                          height: "38px",
                          borderRadius: "6px",
                          boxSizing: "border-box",
                          "& input": {
                            padding: "12px 14px",
                            boxSizing: "border-box",
                            fontSize: "15px",
                            lineHeight: "1.5",
                            color: !editable ? "#B0BEC5" : "#333",
                            "&::placeholder": {
                              color: "#BDBDBD",
                              fontFamily: "UrbanistMedium",
                            },
                            fontFamily: "UrbanistMedium",
                          },
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "6px",
                          backgroundColor: !editable ? "#F5F5F5" : "#FFFFFF",
                          transition: "all 0.3s ease",
                          boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
                          "& fieldset": {
                            borderColor: "#E9ECF2",
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: !editable
                              ? "#E9ECF2"
                              : theme.palette.primary.light,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.light,
                            borderWidth: "1px",
                          },
                          "&.Mui-disabled": {
                            backgroundColor: "#F5F5F5",
                            opacity: 0.6,
                          },
                          "& input": {
                            "&:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0 1000px white inset",
                              WebkitTextFillColor: "#333",
                            },
                          },
                        },
                        "& .MuiOutlinedInput-input.Mui-disabled": {
                          WebkitTextFillColor: "#B0BEC5",
                        },
                        // Style for the country selector button (flag + dropdown)
                        "& button": {
                          padding: "4px 8px",
                          marginRight: "4px",
                          color: "#333",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                          "& svg": {
                            fontSize: "16px",
                            color: "#676768",
                          },
                          // Style for flag icon image
                          "& img": {
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          },
                        },
                        // Style for country code text
                        "& .MuiInputAdornment-root": {
                          "& p": {
                            fontSize: "15px",
                            color: "#333",
                            fontFamily: "UrbanistMedium",
                            margin: 0,
                          },
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <CustomButton
                    variant="primary"
                    size="medium"
                    type="submit"
                    disabled={submitDisable ? submitDisable : !editable}
                    label="Update"
                  />
                  {editable && (
                    <CustomButton
                      variant="outlined"
                      size="medium"
                      onClick={() => setEditable(false)}
                      label="Cancel"
                    />
                  )}
                </Stack>
              </Box>
            </Box>
          </>
        )}
      </FormManager>
    </PanelCard>
  );
};

export default AccountSetting;
