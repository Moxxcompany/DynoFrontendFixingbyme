import { Lock } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { UserAction } from "@/Redux/Actions";
import { USER_UPDATE_PASSWORD } from "@/Redux/Actions/UserAction";
import FormManager from "../Common/FormManager";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import PanelCard from "@/Components/UI/PanelCard";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import { useTranslation } from "react-i18next";
import { InfoIconBox, InfoText, InfoWrapper } from "./styled";
import { theme } from "@/styles/theme";
import Image from "next/image";
import CustomButton from "@/Components/UI/Buttons";

const initialPasswords = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation("profile");
  const [formKey, setFormKey] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    "gm"
  );

  const passwordSchema = yup.object().shape({
    oldPassword: yup.string().optional(),
    newPassword: yup
      .string()
      .required(t("newPasswordRequired") || "New password is required")
      .matches(
        regex,
        t("passwordValidationError") ||
          "Please enter a valid password (requires 1 capital letter, 1 small letter, 1 number, 1 special character and minimum 8 characters)"
      ),
    confirmPassword: yup
      .string()
      .required(t("confirmPasswordRequired") || "Confirm password is required")
      .oneOf(
        [yup.ref("newPassword")],
        t("passwordMismatch") || "Passwords do not match"
      ),
  });

  const handlePasswordSubmit = (values: any) => {
    dispatch(UserAction(USER_UPDATE_PASSWORD, { ...values }));
    // Reset form after submission
    setFormKey((prev) => prev + 1);
  };

  return (
    <PanelCard
      bodyPadding={`${theme.spacing(2, 2.5, 2.5, 2.5)}`}
      title={t("updatePassword")}
      showHeaderBorder={false}
      headerAction={
        <IconButton>
          <Lock color="action" />
        </IconButton>
      }
    >
      <FormManager
        key={formKey}
        initialValues={initialPasswords}
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
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                rowGap: "14px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <InputField
                  inputHeight="38px"
                  label={t("oldPassword")}
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  value={values.oldPassword || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("oldPasswordPlaceholder")}
                  error={
                    touched.oldPassword &&
                    errors.oldPassword &&
                    !!errors.oldPassword
                  }
                  helperText={
                    touched.oldPassword && errors.oldPassword
                      ? errors.oldPassword
                      : ""
                  }
                  sideButton={true}
                  sideButtonType="primary"
                  iconBoxSize="38px"
                  sideButtonIcon={
                    showPassword ? (
                      <VisibilityOffIcon
                        sx={{
                          color: "#676768",
                          height: "18px",
                          width: "16px",
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          color: "#676768",
                          height: "18px",
                          width: "16px",
                        }}
                      />
                    )
                  }
                  onSideButtonClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  showPasswordToggle={true}
                />

                <InfoWrapper>
                  <InfoIconBox>
                    <Image
                      src={InfoIcon.src}
                      alt="info-icon"
                      width={16}
                      height={16}
                    />
                  </InfoIconBox>
                  <InfoText>{t("infoText")}</InfoText>
                </InfoWrapper>
              </Box>

              <Box sx={{ width: "100%" }}>
                <InputField
                  inputHeight="38px"
                  label={t("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={values.newPassword || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("newPasswordPlaceholder")}
                  error={
                    touched.newPassword &&
                    errors.newPassword &&
                    !!errors.newPassword
                  }
                  helperText={
                    touched.newPassword && errors.newPassword
                      ? errors.newPassword
                      : ""
                  }
                  sideButton={true}
                  sideButtonType="primary"
                  iconBoxSize="38px"
                  sideButtonIcon={
                    showNewPassword ? (
                      <VisibilityOffIcon
                        sx={{
                          color: "#676768",
                          height: "18px",
                          width: "16px",
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          color: "#676768",
                          height: "18px",
                          width: "16px",
                        }}
                      />
                    )
                  }
                  onSideButtonClick={() => {
                    setShowNewPassword(!showNewPassword);
                  }}
                  showPasswordToggle={true}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <InputField
                  inputHeight="38px"
                  label={t("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("confirmPasswordPlaceholder")}
                  error={
                    touched.confirmPassword &&
                    errors.confirmPassword &&
                    !!errors.confirmPassword
                  }
                  helperText={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ""
                  }
                  sideButton={true}
                  sideButtonType="primary"
                  iconBoxSize="38px"
                  sideButtonIcon={
                    showConfirmPassword ? (
                      <VisibilityOffIcon
                        sx={{
                          color: "#676768",
                          height: "18px",
                          width: "16px",
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          color: "#676768",
                          height: "18px",
                          width: "16px",
                        }}
                      />
                    )
                  }
                  onSideButtonClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  showPasswordToggle={true}
                />
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CustomButton
                label={t("update")}
                variant="primary"
                size="medium"
                disabled={submitDisable}
                type="submit"
              />
            </Box>
          </Box>
        )}
      </FormManager>
    </PanelCard>
  );
};

export default UpdatePassword;
