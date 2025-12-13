import React from "react";
import {
  Box,
  styled,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import { CheckIconStyled } from "@/Components/UI/LanguageSwitcher/styled";
import { theme } from "@/styles/theme";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  languages: { code: string; label: string; flag: any }[];
  onSelect: (code: string) => void;
  onClose: () => void;
  currentLanguage?: string;
}

const ModalBackdrop = styled(Box)<{ open: boolean }>(({ open }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  backdropFilter: open ? "blur(4px)" : "none",
  opacity: open ? 1 : 0,
  pointerEvents: open ? "auto" : "none",
  transition: "all 0.25s ease",
  zIndex: 1199,
  borderRadius: "30px",
}));

const ModalContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1200,
  pointerEvents: "none",
});

const ModalWrapper = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
  position: "relative",
  width: "fit-content",
  minWidth: "fit-content",
  background: theme.palette.common.white,
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  overflow: "hidden",
  padding: "6px",
  opacity: open ? 1 : 0,
  pointerEvents: open ? "auto" : "none",
  transform: open ? "scale(1)" : "scale(0.95)",
  transition: "all 0.25s ease",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  width: "32px",
  height: "32px",
  backgroundColor: "#F5F5F5",
  color: "#666",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "#E0E0E0",
  },
}));
const CustomLangFlag = styled("img")({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
});

const LanguageSwitcherModal: React.FC<Props> = ({
  open,
  languages,
  onSelect,
  onClose,
  currentLanguage,
}) => {
  return (
    <>
      <ModalBackdrop open={open} onClick={onClose} />
      <ModalContainer>
        {open && (
          <CloseButton onClick={onClose} size="small">
            <CloseIcon sx={{color: theme.palette.text.secondary}} />
          </CloseButton>
        )}
        <ModalWrapper open={open}>
          <List sx={{ width: "100%", p: 0 }}>
            {languages.map((lng) => {
              const active = lng.code === currentLanguage;

              return (
                <ListItemButton
                  key={lng.code}
                  onClick={() => {
                    onSelect(lng.code);
                    onClose();
                  }}
                  sx={{
                    borderRadius: "50px",
                    mb: "1px",
                    height: "32px",
                    minHeight: "32px",
                    gap: 2,
                    background: active
                      ? theme.palette.primary.light
                      : "transparent",
                    "&:hover": {
                      background: theme.palette.primary.light,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "fit-content" }}>
                    <CustomLangFlag src={lng.flag.src} alt={lng.label} />
                  </ListItemIcon>

                  <ListItemText
                    sx={{
                      fontSize: "15px",
                      fontFamily: "UrbanistMedium",
                      fontWeight: 500,
                      "& .MuiListItemText-primary": {
                        fontSize: "15px",
                      },
                    }}
                    primary={`${lng.code.toUpperCase()} – ${lng.label}`}
                  />

                  {active && <CheckIconStyled />}
                </ListItemButton>
              );
            })}
          </List>
        </ModalWrapper>
      </ModalContainer>
    </>
  );
};

export default LanguageSwitcherModal;
