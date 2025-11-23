import React from "react";

function Button({ children, className = "", variant = "primary", ...rest }) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "border border-gray-300 dark:border-gray-600 bg-transparent",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`px-3 py-2 rounded-md text-sm ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
