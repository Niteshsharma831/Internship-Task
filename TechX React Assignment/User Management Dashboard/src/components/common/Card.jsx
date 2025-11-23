import React from "react";

function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 border rounded-lg p-4 
                  shadow-sm dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
