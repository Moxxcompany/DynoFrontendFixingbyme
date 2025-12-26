import PanelCard from "@/Components/UI/PanelCard";
import { Box, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import React, { useState } from "react";
import {
  PaymentSettingsLabel,
  TabContainer,
  TabContent,
  TabItem,
} from "./styled";
import InputField from "@/Components/UI/AuthLayout/InputFields";
import Image from "next/image";
import CustomRadio from "@/Components/UI/RadioGroup";

import LinkIcon from "@/assets/Icons/link-icon.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";
import HourglassIcon from "@/assets/Icons/hourglass-icon.svg";
import PaymentIcon from "@/assets/Icons/payment-icon.svg";
import NoteIcon from "@/assets/Icons/note-icon.svg";
import TextareaField from "@/Components/UI/TextareaField";

const CreatePaymentLinkPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [blockchainFees, setBlockchainFees] = useState("company");

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const handleBlockchainFeesChange = (value: string) => {
    setBlockchainFees(value);
  };
  return (
    <div>
      <PanelCard
        sx={{ maxWidth: "959px", width: "100%", borderRadius: "14px" }}
      >
        <Box>
          <TabContainer>
            <TabItem
              onClick={() => handleTabChange(0)}
              active={activeTab === 0}
            >
              <p>Payment Settings</p>
            </TabItem>
            <TabItem
              onClick={() => handleTabChange(1)}
              active={activeTab === 1}
            >
              <p>Post-Payment Settings</p>
            </TabItem>
          </TabContainer>
        </Box>
        {activeTab === 0 && (
          <TabContent>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <InputField
                label={
                  <PaymentSettingsLabel>
                    <Image
                      src={RoundedStackIcon}
                      alt="value"
                      draggable={false}
                      style={{
                        filter: `brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(100%)`,
                      }}
                    />
                    <span>Value ($)</span>
                  </PaymentSettingsLabel>
                }
                sx={{
                  width: "100%",
                }}
              />
              <InputField
                label={
                  <PaymentSettingsLabel>
                    <Image src={HourglassIcon} alt="expire" draggable={false} />
                    <span>Expire</span>
                  </PaymentSettingsLabel>
                }
                sx={{
                  width: "100%",
                }}
              />

              <Box>
                <PaymentSettingsLabel>
                  <Image
                    src={PaymentIcon}
                    alt="blockchain fees"
                    draggable={false}
                  />
                  <span>Blockchain fees paid by</span>
                </PaymentSettingsLabel>
                <Box sx={{ marginTop: "16px" }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={blockchainFees}
                      onChange={(e) =>
                        handleBlockchainFeesChange(e.target.value)
                      }
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "15px",
                          fontFamily: "UrbanistRegular",
                          color: "#242428",
                          paddingLeft: "8px",
                        },
                        gap: "8px",
                      }}
                    >
                      <FormControlLabel
                        value="customer"
                        control={<CustomRadio />}
                        label="Customer (fees added to the total)"
                        sx={{ margin: "0px" }}
                      />
                      <FormControlLabel
                        value="company"
                        control={<CustomRadio />}
                        label="Company (we pay the fees)"
                        sx={{ margin: "0px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextareaField
                label={
                  <PaymentSettingsLabel>
                    <Image src={NoteIcon} alt="note" draggable={false} />
                    <span>Description</span>
                  </PaymentSettingsLabel>
                }
                sx={{
                  width: "100%",
                }}
              />
            </Box>
          </TabContent>
        )}
        {activeTab === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <InputField
              label={
                <PaymentSettingsLabel>
                  <Image src={NoteIcon} alt="description" draggable={false} />
                  <span>Description</span>
                </PaymentSettingsLabel>
              }
              sx={{
                width: "100%",
              }}
            />
          </Box>
        )}
      </PanelCard>
    </div>
  );
};

export default CreatePaymentLinkPage;
