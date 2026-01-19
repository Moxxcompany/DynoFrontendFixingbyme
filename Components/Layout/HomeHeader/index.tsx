import { useState } from "react";
import { Box, Button, Divider, IconButton, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import DynopayLogo from "@/assets/Images/auth/dynopay-logo.svg";
import CloseIcon from "@/assets/Icons/close-icon.svg";
import {
  HeaderContainer,
  NavLinks,
  Actions,
  MobileMenuButton,
  MobileDrawer,
  MobileNavItem,
} from "./styled";
import { homeTheme } from "@/styles/homeTheme";
import useIsMobile from "@/hooks/useIsMobile";
import HomeButton from "../HomeButton";
import { theme } from "@/styles/theme";
import { MenuRounded } from "@mui/icons-material";

const HomeHeader = () => {
  const router = useRouter();
  const isMobile = useIsMobile("md");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const HeaderItems = [
    { label: "How It Works", path: "/" },
    { label: "Features", path: "/" },
    { label: "Use Cases", path: "/" },
    { label: "Documentation", path: "/" },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <div>
      <HeaderContainer>
        {/* Logo */}
        <Image
          src={DynopayLogo}
          alt="Dynopay"
          width={134}
          height={45}
          draggable={false}
          className="logo"
          style={{ width: "134px", height: "45px" }}
          onClick={() => router.push("/")}
        />

        {/* Center Nav - Desktop Only */}
        <NavLinks className="desktop-nav">
          {HeaderItems.map((item) => (
            <Button key={item.label} onClick={() => handleNavClick(item.path)}>
              {item.label}
            </Button>
          ))}
        </NavLinks>

        <Box sx={{ display: "flex", alignItems: "center", gap: "11px" }}>
          {/* Right Actions */}
          <Actions>
            <Button className="signin" onClick={() => router.push("/auth/login")}>
              Sign In
            </Button>

            <HomeButton
              variant="primary"
              label="Get Started"
              onClick={() => router.push("/auth/register")}
              showIcon={false}
              sx={{
                borderRadius: "8px !important",
                padding: "8px 12px !important",
                minWidth: "98px !important",
              }}
            />
          </Actions>
          {/* Mobile Menu Button */}
          {isMobile && (
            <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
              <MenuRounded sx={{ color: theme.palette.text.primary, fontSize: 24 }} />
            </MobileMenuButton>
          )}
        </Box>
      </HeaderContainer>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "320px",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          },
        }}
      >
        <MobileDrawer>
          {/* Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "16px",
              flexShrink: 0,
            }}
          >
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                padding: "8px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image
                src={CloseIcon}
                alt="Close"
                width={24}
                height={24}
                draggable={false}
              />
            </IconButton>
          </Box>

          {/* Mobile Nav Items - Scrollable */}
          <Box
            sx={{
              padding: "0 24px",
              marginTop: "32px",
              paddingBottom: "32px",
              flex: 1,
              overflowY: "auto",
            }}
          >
            {HeaderItems.map((item) => (
              <MobileNavItem
                key={item.label}
                onClick={() => handleNavClick(item.path)}
              >
                {item.label}
              </MobileNavItem>
            ))}
          </Box>
        </MobileDrawer>
      </Drawer>

      <Divider sx={{ borderColor: homeTheme.palette.border.main }} />
    </div>
  );
};

export default HomeHeader;
