import React from "react";
import PopupModal from "../../PopupModal";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import FormManager from "@/Components/Page/Common/FormManager";
import { theme } from "@/styles/theme";
import InputField from "../../AuthLayout/InputFields";
import PanelCard from "../../PanelCard";
import Image from "next/image";
import WalletIcon from "@/assets/Icons/wallet-icon.svg";
import * as yup from "yup";
import InfoIcon from "@/assets/Icons/info-icon.svg";
import {
  PermissionsContainer,
  IconContainer,
  ContentContainer,
  PermissionsTitle,
  PermissionsList,
} from "./styled";
import CustomButton from "../../Buttons";

export interface CreateApiModelProps {
  open: boolean;
  onClose: () => void;
}

const CreateApiModel: React.FC<CreateApiModelProps> = ({ open, onClose }) => {
  const { t } = useTranslation("apiScreen");

  const onSubmit = (values: any) => {
    console.log("Form submitted with data:", values);
  };

  return (
    <PopupModal
      open={open}
      showHeader={false}
      transparent
      handleClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "456px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
        },
      }}
    >
      <PanelCard
        title={t("generate.modalTitle")}
        showHeaderBorder={false}
        headerIcon={
          <Image
            src={WalletIcon.src}
            alt="wallet-icon"
            width={16}
            height={18}
          />
        }
        bodyPadding={theme.spacing(1.5, 3.75, 3.75, 3.75)}
        headerPadding={theme.spacing(3.75, 3.75, 0, 3.75)}
        headerActionLayout="inline"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t("generate.modalSubtitle")}
          </Typography>
        </Box>
        <FormManager
          initialValues={{}}
          yupSchema={yup.object().shape({
            key_name: yup.string().required(t("validation.required")),
          })}
          onSubmit={onSubmit}
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
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <InputField
                fullWidth
                label={t("generate.keyName")}
                placeholder={t("generate.keyNamePlaceholder")}
                name="key_name"
                value={values.key_name}
                onChange={handleChange}
              />

              <PermissionsContainer>
                <IconContainer>
                  <Image
                    src={InfoIcon.src}
                    alt="info-icon"
                    width={16}
                    height={16}
                    style={{ filter: "invert(1)" }}
                  />
                </IconContainer>
                <ContentContainer>
                  <PermissionsTitle variant="body2">
                    {t("generate.keyNameDescription")}
                  </PermissionsTitle>
                  <PermissionsList>
                    <li>{t("generate.keyNameDescription1")}</li>
                    <li>{t("generate.keyNameDescription2")}</li>
                    <li>{t("generate.keyNameDescription3")}</li>
                    <li>{t("generate.keyNameDescription4")}</li>
                  </PermissionsList>
                </ContentContainer>
              </PermissionsContainer>

              <Box sx={{ display: "flex", gap: 1 }}>
                <CustomButton
                  variant="outlined"
                  size="medium"
                  label={t("actions.cancel")}
                  onClick={onClose}
                  sx={{
                    flex: 1,
                  }}
                />
                <CustomButton
                  type="submit"
                  variant="primary"
                  size="medium"
                  label={t("generate.submit")}
                  disabled={submitDisable}
                  sx={{
                    flex: 1,
                  }}
                />
              </Box>
            </Box>
          )}
        </FormManager>
      </PanelCard>
    </PopupModal>
  );
};

export default CreateApiModel;
