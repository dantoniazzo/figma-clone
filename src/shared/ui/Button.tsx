import { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  classNames?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, classNames, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`p-2 text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${classNames}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
