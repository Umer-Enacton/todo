import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger'| 'simple'| 'edit'| 'delete';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseStyles = "flex items-center gap-2 px-4 py-2  rounded-lg transition text-sm";
  
  const variants = {
    simple:"text-black",
    primary: "bg-slate-900 text-white hover:shadow-md hover:bg-slate-800",
    secondary: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:shadow-md hover:bg-red-500 mx-2",
    edit:"p-1.5 text-slate-500 hover:bg-slate-100 hover:text-green-600 rounded transition",
    delete:"p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded transition"
  };
const isIconButton = variant === "edit" || variant === "delete";

return (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${!isIconButton ? baseStyles : ""}
      ${variants[variant]}
      ${className}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    {children}
  </button>
);
}

export default Button;