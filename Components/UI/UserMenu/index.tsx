import { useState } from "react";
import { Popover, useTheme } from "@mui/material";
import { UserTrigger, UserName, PopWrapper, MenuItemRow } from "./styled";

import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
import useTokenData from "@/hooks/useTokenData";
import { VerticalLine } from "../LanguageSwitcher/styled";
import { useRouter } from "next/router";
import useWindow from "@/hooks/useWindow";
import CustomButton from "../Buttons";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@/assets/Icons/logout-icon.svg";

export default function UserMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const triggerWidth = anchorEl?.clientWidth || 0;
  const tokenData = useTokenData();
  const router = useRouter();
  const customWindow = useWindow();
  const closeMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    if (customWindow) {
      customWindow.localStorage.removeItem("token");
      customWindow.location.replace("/auth/login");
    }
  };
  const { t } = useTranslation("dashboardLayout");

  return (
    <>
      {/* Trigger */}
      <UserTrigger onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Image
          src={tokenData?.photo as string}
          alt="user"
          width={32}
          height={32}
          style={{ borderRadius: "40px" }}
        />
        <UserName>{tokenData?.name}</UserName>

        <VerticalLine />

        {!anchorEl ? (
          <ExpandMoreIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        ) : (
          <ExpandLessIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        )}
      </UserTrigger>

      {/* Popover */}
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            width: triggerWidth,
            minWidth: triggerWidth,
             borderRadius: "6px",
            boxShadow: "0 4px 25px rgba(0,0,0,0.18)",
            overflow: "hidden",
          },
        }}
      >
        <PopWrapper>
          {/* Settings Item */}
          <MenuItemRow
            onClick={() => {
              router.push("/profile");
              closeMenu();
            }}
          >
            <SettingsIcon sx={{ fontSize: 22 }} />
            <span>{t("settings")}</span>
          </MenuItemRow>

          {/* Logout */}
          <CustomButton
            label={t("logout")}
            // onClick={handleLogout}
            variant="secondary"
            endIcon={
              <Image src={LogoutIcon} alt="ssd" width={18} height={18} />
            }
            fullWidth
            size="medium"
          />
        </PopWrapper>
      </Popover>
    </>
  );
}
