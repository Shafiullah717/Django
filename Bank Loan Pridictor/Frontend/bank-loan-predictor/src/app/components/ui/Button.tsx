import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        "px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;