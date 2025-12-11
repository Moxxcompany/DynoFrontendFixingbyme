import React from "react";
import {
  SidebarWrapper,
  Menu,
  MenuItem,
  IconBox,
  ReferralCard,
  ReferralCodeBox,
  KnowledgeBaseBtn,
} from "./styled";
import Image from "next/image";
import DashboardIcon from "@/assets/Icons/dashboard-icon.svg";
import TransactionsIcon from "@/assets/Icons/transaction-icon.svg";
import WalletsIcon from "@/assets/Icons/wallet-icon.svg";
import APIIcon from "@/assets/Icons/key-icon.svg";
import NotificationsIcon from "@/assets/Icons/notification-icon.svg";
import AddIcon from "@mui/icons-material/Add";

const NewSidebar = () => {
  const menuItems = [
    { label: "Dashboard", icon: DashboardIcon, active: true },
    { label: "Transactions", icon: TransactionsIcon, plus: true },
    { label: "Wallets", icon: WalletsIcon },
    { label: "API", icon: APIIcon },
    { label: "Notifications", icon: NotificationsIcon },
  ];

  return (
    <SidebarWrapper>
      <Menu>
        {menuItems.map((item, i) => (
          <MenuItem key={i} active={item.active}>
            <IconBox active={item.active}>
              <Image src={item.icon} width={20} height={20} alt={item.label} />
            </IconBox>

            <span>{item.label}</span>

            {item.plus && <AddIcon sx={{ marginLeft: "auto" }} />}
          </MenuItem>
        ))}
      </Menu>

      {/* REFERRAL CARD */}
      <ReferralCard>
        <p className="label">Your Referral Code</p>

        <ReferralCodeBox>
          <span>DYNO2024XYZ</span>
          <div className="copy-btn">
            <Image src="/icons/copy.svg" width={18} height={18} alt="copy" />
          </div>
        </ReferralCodeBox>
      </ReferralCard>

      {/* KNOWLEDGE BASE BUTTON */}
      <KnowledgeBaseBtn>
        <Image src="/icons/book.svg" width={16} height={16} alt="icon" />
        Knowledge Base
      </KnowledgeBaseBtn>
    </SidebarWrapper>
  );
};

export default NewSidebar;
