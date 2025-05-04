import * as React from 'react';
import { cn } from '@/lib/utils';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    className={cn(
      'text-sm font-semibold text-gray-300 leading-none tracking-tight',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-opacity',
      className
    )}
    ref={ref}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };