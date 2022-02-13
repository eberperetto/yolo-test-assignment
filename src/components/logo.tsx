import React, { FunctionComponent } from "react";
import logo from "../assets/logo.svg";

/**
 * Logo image component
 */
const Logo: FunctionComponent = () => {
  return <img src={logo} className="w-40 h-40" alt="Bitcasino icon" />;
};

export default Logo;
