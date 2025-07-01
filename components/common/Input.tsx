"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text...",
  value,
  onChange,
  icon: Icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  required = false,
  name,
  id,
}) => {
  const baseClasses =
    "w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-300 bg-white shadow-sm";
  const paddingClasses = Icon
    ? iconPosition === "left"
      ? "pl-9 sm:pl-12 pr-3 sm:pr-4"
      : "pl-3 sm:pl-4 pr-9 sm:pr-12"
    : "px-3 sm:px-4";
  const pyClasses = "py-2";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const inputClasses = `${baseClasses} ${paddingClasses} ${pyClasses} ${disabledClasses} ${className}`;

  return (
    <div className="relative w-full">
      {Icon && iconPosition === "left" && (
        <Icon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        name={name}
        id={id}
        className={inputClasses}
      />
      {Icon && iconPosition === "right" && (
        <Icon className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      )}
    </div>
  );
};

export default Input;
