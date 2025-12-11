import { useState } from "react";
import {
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  LangFlag,
  LangTrigger,
  LangText,
  CheckIconStyled,
  VerticalLine,
} from "./styled";

import portugalFlag from "@/assets/Images/Icons/flags/portugal-flag.png";
import unitedStatesFlag from "@/assets/Images/Icons/flags/united-states-flag.png";
import franceFlag from "@/assets/Images/Icons/flags/france-flag.png";
import spainFlag from "@/assets/Images/Icons/flags/spain-flag.png";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";
import i18n from "i18next";

const languages = [
  { code: "pt", label: "Português", flag: portugalFlag },
  { code: "en", label: "English", flag: unitedStatesFlag },
  { code: "fr", label: "Français", flag: franceFlag },
  { code: "es", label: "Español", flag: spainFlag },
];

export default function LanguageSwitcher() {
  const current = i18n.language || "en";
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    handleClose();
  };

  const selected = languages.find((l) => l.code === current) ?? languages[1];

  return (
    <>
      <LangTrigger onClick={handleOpen} theme={theme}>
        <LangFlag src={selected.flag.src} alt="flag" />
        <LangText>{selected.code.toUpperCase()}</LangText>

        <VerticalLine />
        {!anchorEl ? <ExpandMoreIcon /> : <ExpandLess />}
      </LangTrigger>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: "6px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
          },
        }}
      >
        <List sx={{ width: "100%", p: 1.5 }}>
          {languages.map((lng) => (
            <ListItemButton
              key={lng.code}
              onClick={() => changeLang(lng.code)}
              sx={{
                borderRadius: "50px",
                mb: 0.5,
                py: 1,
                gap: 2,
                background: lng.code === current ? "#E8F0FF" : "transparent",
                "&:hover": {
                  background: "#E8F0FF",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "fit-content" }}>
                <LangFlag src={lng.flag.src} alt={lng.label} />
              </ListItemIcon>

              <ListItemText
                sx={{ fontSize: "15px", fontFamily: "UrbanistMedium" ,fontWeight: 500}}
                primary={`${lng.code.toUpperCase()} – ${lng.label}`}
              />

              {lng.code === current && <CheckIconStyled />}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
}
