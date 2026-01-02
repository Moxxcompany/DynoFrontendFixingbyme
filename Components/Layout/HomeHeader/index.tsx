import { Box, Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import DynopayLogo from "@/assets/Images/auth/dynopay-logo.svg";
import { HeaderContainer, NavLinks, Actions } from "./styled";
import CustomButton from "@/Components/UI/Buttons";
import { homeTheme } from "@/styles/homeTheme";

const HomeHeader = () => {
  const router = useRouter();

  const HeaderItems = [
    // { label: "How It Works", path: "/how-it-works" },
    // { label: "Features", path: "/features" },
    // { label: "Use Cases", path: "/use-cases" },
    // { label: "Documentation", path: "/docs" },
    { label: "How It Works", path: "/" },
    { label: "Features", path: "/" },
    { label: "Use Cases", path: "/" },
    { label: "Documentation", path: "/" },
  ];

  return (
    <div>
      <HeaderContainer>
        {/* Logo */}
        <Image
          src={DynopayLogo}
          alt="Dynopay"
          width={120}
          height={40}
          draggable={false}
          className="logo"
          onClick={() => router.push("/")}
        />

        {/* Center Nav */}
        <NavLinks>
          {HeaderItems.map((item) => (
            <Button key={item.path} onClick={() => router.push(item.path)}>
              {item.label}
            </Button>
          ))}
        </NavLinks>

        {/* Right Actions */}
        <Actions>
          <Button className="signin" onClick={() => router.push("/auth/login")}>
            Sign In
          </Button>

          <CustomButton
            label="Get Started"
            variant="primary"
            size="medium"
            onClick={() => router.push("/auth/register")}
          />
        </Actions>
      </HeaderContainer>
      <Divider sx={{ borderColor: homeTheme.palette.border.main }} />
    </div>
  );
};

export default HomeHeader;
