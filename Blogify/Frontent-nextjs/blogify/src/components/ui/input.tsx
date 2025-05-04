import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-100',
      'ring-offset-gray-900 placeholder:text-gray-500',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'file:border-0 file:bg-transparent file:text-gray-300 file:text-sm file:font-medium',
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };