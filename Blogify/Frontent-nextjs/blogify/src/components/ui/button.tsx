import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-purple-500 text-white hover:from-blue-700 hover:to-purple-600",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white",
        ghost:
          "text-gray-300 hover:bg-gray-800 hover:text-white",
        link: "text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-11 px-8 rounded-md text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };