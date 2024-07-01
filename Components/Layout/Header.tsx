import React from "react";

interface HeaderProps {
  pageName: string;
  component: string;
}

const Header = ({ pageName, component }: HeaderProps) => {
  return <div>Header</div>;
};

export default Header;
