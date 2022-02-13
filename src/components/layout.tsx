import React, { FunctionComponent } from "react";
/**
 * Layout with basic styles to contain all other components on a screen
 */
const Layout: FunctionComponent = ({ children }) => {
  return <div className="bg-[#1E003C] h-screen">{children}</div>;
};

export default Layout;
