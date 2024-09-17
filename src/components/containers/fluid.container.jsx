import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`h-screen w-screen overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
