import useIsMobile from "@/hooks/useIsMobile";
import { Box, Typography } from "@mui/material";
import React from "react";

const TermsConditions = () => {

  const data = [
    {
      title: "Acceptance of Terms",
      content1: "By creating an account, accessing the dashboard, integrating the API, or processing crypto payments through DynoPay (“the Service”), you confirm that:",
      content2: "",
      bulletPoints: [
        "You have read and agree to these Terms & Conditions;",
        "You are at least 18 years old;",
        "You are legally allowed to use crypto-related services in your region.",
      ],
      content3: "If you do not agree with any part of these Terms, do not use the Service.",
    },
    {
      title: "Description of the Service",
      content1: "DynoPay provides tools for receiving, managing, and monitoring cryptocurrency payments, including:",
      content2: "",
      bulletPoints: [
        "Crypto payment links",
        "API-based payment processing",
        "Wallet aggregation",
        "Transaction monitoring dashboards",
        "Fee and settlement tools"
      ],
      content3: "We do not operate as a bank, custodian, broker-dealer, or financial advisor. You remain the legal owner and controller of your crypto wallets.",
    },
    {
      title: "Eligibility & Compliance",
      content1: "You may use the Service only if it is legal to do so in your country.",
      content2: "You are responsible for:",
      bulletPoints: [
        "Complying with local cryptocurrency regulations",
        "Ensuring your customers are allowed to pay in crypto",
        "Completing any required KYC/AML if applicable"
      ],
      content3: "We reserve the right to suspend or limit accounts that violate laws or present compliance risks.",
    },
    {
      title: "User Account Responsibilities",
      content1: "",
      content2: "You must:",
      bulletPoints: [
        "Provide accurate registration information",
        "Keep your login credentials secure",
        "Restrict access to your account",
        "Notify us immediately of any unauthorized access"
      ],
      content3: "We are not responsible for losses resulting from compromised credentials.",
    },
    {
      title: "Wallet Connections",
      content1: "You may connect your external cryptocurrency wallets to the Service.",
      content2: "By doing so, you acknowledge:",
      bulletPoints: [
        "We do not take custody of your funds",
        "All blockchain transactions are irreversible",
        "Delays or failures caused by network congestion are outside our control",
      ],
      content3: "You remain fully responsible for on-chain activity performed using your wallets",
    },
    {
      title: "Payment Processing",
      content1: "",
      content2: "By generating a payment link or API request:",
      bulletPoints: [
        "You instruct the customer to transfer cryptocurrency directly to your wallet",
        "You agree that blockchain confirmations may take time",
        "You acknowledge that crypto asset values fluctuate",
      ],
      content3: "We do not guarantee price stability, instant settlement, or refundability of crypto transactions.",
    },
    {
      title: "Fees",
      content1: "",
      content2: "Our fees may include:",
      bulletPoints: [
        "Transaction processing fees",
        "Subscription fees",
        "Custom enterprise fees"
      ],
      content3: "All fees are shown in the dashboard and may be updated with notice. You are responsible for blockchain network fees unless explicitly configured otherwise.",
    },
    {
      title: "Prohibited Activities",
      content1: "",
      content2: "You may NOT use the Service for:",
      bulletPoints: [
        "Money laundering or terrorism financing",
        "Fraud, scams, or Ponzi-type schemes",
        "Sale of illegal goods or services",
        "Obscured mixers/tumblers",
        "High-risk activities violating applicable law",
        "Malicious API use"
      ],
      content3: "We may suspend or terminate accounts involved in prohibited activities.",
    },
    {
      title: "API Usage",
      content1: "You may use the API to create and manage crypto payment requests.",
      content2: "You agree not to:",
      bulletPoints: [
        "Reverse-engineer the API",
        "Exploit vulnerabilities",
        "Exceed rate limits",
        "Use the API for unauthorized scraping or automation"
      ],
      content3: "We may throttle or restrict API access to maintain platform stability.",
    },
    {
      title: "Data & Privacy",
      content1: "We collect and process data as described in our Privacy Policy.",
      content2: "By using the Service, you consent to:",
      bulletPoints: [
        "Collection of usage data",
        "Processing of account and wallet metadata",
        "Storage of logs for security and compliance"
      ],
      content3: "We do not sell personal data to third parties.",
    },
    {
      title: "Service Availability",
      content1: "",
      content2: "We strive for reliable uptime but do not guarantee:",
      bulletPoints: [
        "Continuous, uninterrupted service",
        "Zero errors or bugs",
        "Zero downtime for maintenance"
      ],
      content3: "We may modify or discontinue features without liability.",
    },
    {
      title: "Intellectual Property",
      content1: "All Service content, UI elements, branding, and code belong to {{PRODUCT_NAME}}.",
      content2: "",
      bulletPoints: [],
      content3: "You may not copy, resell, modify, or distribute our materials without permission.",
    },
    {
      title: "Limitation of Liability",
      content1: "",
      content2: "To the maximum extent allowed by law:",
      bulletPoints: [
        "We are not liable for lost profits, lost crypto, business interruption, or indirect damages",
        "Blockchain delays, volatility, or network failures are outside our control",
        "You use the Service “as is,” without guarantees",
      ],
      content3: "Our total liability will not exceed the amount you paid for the Service in the last 3 months.",
    },
    {
      title: "Indemnification",
      content1: "",
      content2: "You agree to indemnify and hold {{PRODUCT_NAME}} harmless from any claims, losses, liabilities, or expenses arising from:",
      bulletPoints: [
        "Your misuse of the Service",
        "Your violation of the law",
        "Your disputes with customers",
        "Transactions executed through your connected wallets"
      ],
      content3: "",
    },
    {
      title: "Termination",
      content1: "",
      content2: "We may suspend or terminate your account if:",
      bulletPoints: [
        "You violate these Terms",
        "You engage in prohibited activity",
        "You pose a security or compliance risk",
        "You request account deletion"
      ],
      content3: "Upon termination, your access to the dashboard and API will be revoked.",
    },
    {
      title: "Changes to These Terms",
      content1: "We may update these Terms at any time.",
      content2: "Changes become effective when published.",
      bulletPoints: [],
      content3: "Continued use of the Service means you accept the updated Terms.",
    },
    {
      title: "Governing Law",
      content1: "These Terms are governed by the laws of {{JURISDICTION}}.",
      content2: "Disputes shall be resolved in the courts of {{LOCATION}}.",
      bulletPoints: [],
      content3: "",
    },
    {
      title: "Contact Information",
      content1: "For questions or concerns, contact us at:",
      content2: "{{SUPPORT_EMAIL}}",
      bulletPoints: [],
      content3: "",
    }
  ];

  const isMobile = useIsMobile("md");

  return (
    <Box sx={{ minWidth: isMobile ? "360px" : "1280px", mt: "63px", mb: "93px", display: "flex", justifyContent: "center", paddingX: isMobile ? "auto" : 32, fontFamily: "UrbanistMedium" }}>
      <Box sx={{ minWidth: isMobile ? "360px" : "768px" }}>

        <Typography variant="h3" component="div" sx={{ fontSize: isMobile ? "45px" : "60px", textAlign: "center", mb: "15px", fontFamily: "UrbanistMedium" }}>
          Terms &
          {isMobile ? <br /> : " "}
          Conditions
        </Typography>

        <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "24px", lineHeight: "25px" }}>
          {data.map((section, index) => (
            <li key={index} style={{ fontWeight: "600", color: "#676B7E" }}>
              <Typography variant="body1" sx={{ fontSize: "18px", color: "#676B7E", fontWeight: "600", fontFamily: "UrbanistMedium" }}>{section.title}</Typography>
              {section.content1 && (
                <Typography variant="body1" sx={{ fontSize: "18px", color: "#676B7E", fontWeight: "400", fontFamily: "UrbanistMedium" }}>
                  {section.content1}
                </Typography>
              )}
              {section.content2 && (
                <Typography variant="body1" sx={{ fontSize: "18px", color: "#676B7E", fontWeight: "400", fontFamily: "UrbanistMedium" }}>
                  {section.content2}
                </Typography>
              )}
              {section.bulletPoints.length > 0 && (
                <ul style={{ paddingLeft: "20px", marginTop: "8px", marginBottom: "8px", marginLeft: "8px" }}>
                  {section.bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex} style={{ listStyle: "disc", fontSize: "18px", color: "#676B7E", fontWeight: "400" }}>{point}</li>
                  ))}
                </ul>
              )}
              {section.content3 && (
                <Typography variant="body1" sx={{ fontSize: "18px", color: "#676B7E", fontWeight: "400", fontFamily: "UrbanistMedium" }}>
                  {section.content3}
                </Typography>
              )}
            </li>
          ))}
        </ol>
      </Box>
    </Box>
  );
};

export default TermsConditions;