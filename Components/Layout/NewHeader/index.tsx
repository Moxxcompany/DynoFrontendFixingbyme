import React from "react";
import {
  HeaderContainer,
  LogoContainer,
  MainContainer,
  RequiredKYC,
  RequiredKYCText,
  RightSection,
} from "./styled";
import Logo from "@/assets/Images/auth/dynopay-logo.png";
import Image from "next/image";
import LanguageSwitcher from "@/Components/UI/LanguageSwitcher";
import CompanySelector from "@/Components/UI/CompanySelector";
import UserMenu from "@/Components/UI/UserMenu";
import { useRouter } from "next/router";
import { VerticalLine } from "@/Components/UI/LanguageSwitcher/styled";
import InfoIcon from "@mui/icons-material/Info";
import { theme } from "@/styles/theme";
import { useTranslation } from "react-i18next";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const NewHeader = () => {
  const router = useRouter();
  const { t } = useTranslation("dashboardLayout");
  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <Image
            onClick={() => router.push("/")}
            src={Logo}
            alt="logo"
            width={108}
            height={37}
            draggable={false}
            className="logo"
          />
        </LogoContainer>
        <MainContainer>
          <CompanySelector />

          <RightSection>
            <LanguageSwitcher />
            <RequiredKYC>
              <InfoIcon
                sx={{ fontSize: "20px", color: theme.palette.error.main }}
              />
              <RequiredKYCText>{t("requiredKYC")}</RequiredKYCText>
              <VerticalLine />
              <ArrowOutwardIcon
                sx={{ color: theme.palette.text.secondary, fontSize: "20px" }}
              />
            </RequiredKYC>
            <UserMenu />
          </RightSection>
        </MainContainer>
      </HeaderContainer>
    </>
  );
};

export default NewHeader;
