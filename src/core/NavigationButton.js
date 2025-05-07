import React from "react";
import { Link } from "react-router-dom";

const NavigationButton = ({ to, bgColor, label }) => {
  return (
    <Link
      to={to}
      className={`w-full max-w-xs p-4 mb-4 ${bgColor} rounded-lg shadow-md text-white font-semibold text-center hover:brightness-110 transition`}
    >
      {label}
    </Link>
  );
};

export default NavigationButton;
