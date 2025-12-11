import { useState } from "react";
import { Popover, useTheme, Box } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EditIcon from "@/assets/Icons/edit-icon.svg";
import {
  SelectorTrigger,
  TriggerText,
  CompanyListWrapper,
  CompanyItem,
  ItemLeft,
  ItemRight,
} from "./styled";

import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { VerticalLine } from "../LanguageSwitcher/styled";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import CustomButton from "../Buttons";

const companies = [
  { id: 1, name: "TechCorp Solutions", email: "contact@techcorp.com" },
  { id: 2, name: "TechCorp Solutions", email: "contact@techcorp.com" },
  { id: 3, name: "TechCorp Solutions", email: "contact@techcorp.com" },
  { id: 4, name: "TechCorp Solutions", email: "contact@techcorp.com" },
];

export default function CompanySelector() {
  const { t } = useTranslation("dashboardLayout");
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState(1);

  const selected = companies.find((c) => c.id === active);

  const handleOpen = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {/* TRIGGER */}
      <SelectorTrigger onClick={handleOpen}>
        <BusinessCenterIcon
          sx={{ color: theme.palette.primary.main, fontSize: 20 }}
        />

        <TriggerText>{selected?.name}</TriggerText>

        <VerticalLine />

        {!anchorEl ? (
          <ExpandMoreIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        ) : (
          <ExpandLess
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
        )}
      </SelectorTrigger>

      {/* POPOVER */}
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
             borderRadius: "6px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
            overflow: "hidden",
            width: 330,
            p: 2,
          },
        }}
      >
        <Box
          sx={{
            fontSize: 13,
            mb: 1,
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {t("companySelectorTitle")} :
        </Box>

        <CompanyListWrapper>
          {companies.map((c) => (
            <CompanyItem
              key={c.id}
              active={active === c.id}
              onClick={() => setActive(c.id)}
            >
              <ItemLeft>
                <Box className="info">
                  <Box sx={{ display: "flex", alignItems: "center" ,gap:1}}>
                    <BusinessCenterIcon
                      sx={{
                        color:
                          active === c.id
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                      }}
                    />

                    <Box className="name">{c.name}</Box>
                  </Box>
                  <Box className="email">{c.email}</Box>
                </Box>
              </ItemLeft>

              <ItemRight active={active === c.id}>
                <Image src={EditIcon} width={18} height={18} alt="edit" />
              </ItemRight>
            </CompanyItem>
          ))}
        </CompanyListWrapper>

        <CustomButton
          label={t("addCompany")}
          variant="secondary"
          size="medium"
          endIcon={<Add />}
          fullWidth
          sx={{ mt: 1 }}
        />
      </Popover>
    </>
  );
}
