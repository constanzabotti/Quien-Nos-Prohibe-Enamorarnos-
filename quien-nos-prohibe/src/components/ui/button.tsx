import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "newspaper";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "ink-btn relative inline-flex items-center justify-center font-serif overflow-hidden " +
      "transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-primary text-primary-foreground border-2 border-foreground font-bold " +
        "shadow-[4px_4px_0_0_rgba(26,26,27,1)] hover:shadow-[1px_1px_0_0_rgba(26,26,27,1)] " +
        "hover:translate-y-[2px] hover:translate-x-[2px]",
      outline:
        "border-2 border-foreground bg-transparent text-foreground " +
        "shadow-[4px_4px_0_0_rgba(26,26,27,1)] hover:shadow-[1px_1px_0_0_rgba(26,26,27,1)] " +
        "hover:translate-y-[2px] hover:translate-x-[2px]",
      ghost:
        "hover:bg-foreground/10 text-foreground underline decoration-1 underline-offset-4",
      newspaper:
        "newspaper-cutout hover:bg-foreground hover:text-background font-sans cursor-pointer",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-16 px-10 text-lg md:text-xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Ink blot pseudo-layer (CSS handles the animation via .ink-btn::before) */}
        <span className="ink-blob" aria-hidden="true" />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";
