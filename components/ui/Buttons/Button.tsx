import React from "react";

interface ButtonProps {
  name: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  name,
  className = "",
  onClick,
  type = "button",
}) => (
  <button
    className={`bg-primary-500 text-[#fff] px-6 py-2 rounded-full hover:bg-primary-600 transition-colors duration-300 font-poppins font-normal text-sm leading-normal ${className}`}
    onClick={onClick}
    type={type}
  >
    {name}
  </button>
);

export default Button;
