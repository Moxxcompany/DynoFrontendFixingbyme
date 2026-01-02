import HomeSectionTitle from "@/Components/UI/SectionTitle";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      <HomeSectionTitle
        type="small"
        badgeText="Crypto Payments Made Simple"
        title="Accept Crypto Payments in Minutes"
        highlightText="Crypto Payments"
        subtitle="A modern crypto payment gateway that plugs into any e-commerce setup. Add your wallets, generate payment links, use the API, and receive crypto fast and securely."
      />
    </div>
  );
};

export default HeroSection;
