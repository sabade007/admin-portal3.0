import React from "react";

type TinyProps = {
  children: React.ReactNode;
  className?: string;
};

const Tiny = ({ children, className = "" }: TinyProps) => {
  return <p className={`text-xs ${className}`}>{children}</p>;
};

export default Tiny;
