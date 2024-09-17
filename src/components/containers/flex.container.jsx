import React from "react";

const FlexContainer = ({ children, className = "w-full" }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default FlexContainer;
