import { cn } from "@/Utils/lib";
import { cva } from "class-variance-authority";
import * as React from "react";

export const buttonVariants = cva(
    "w-fit overflow-hidden relative group font-medium flex items-center justify-center disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary-hover data-[active=true]:bg-primary-active",
                secondary: "bg-white text-primary border border-primary",
                outline: "bg-white border border-border",
                ghost: "bg-transparent hover:bg-slate-100",
            },
            size: {
                default: "h-11 px-4 py-2 rounded-md",
                sm: "h-9 rounded-md px-3 text-sm",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10 rounded-md",
                "icon-sm": "h-8 w-8 rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const ButtonContent = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "flex items-center space-x-2 transition-all duration-400 ease-linear",
                className
            )}
            {...props}
        />
    );
};

export const Button = React.forwardRef(function Button(
    { children, variant, size, className, ...props },
    ref
) {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            <ButtonContent className="relative translate-y-0 opacity-1 group-hover:absolute group-hover:opacity-0 group-hover:-translate-y-2 pointer-events-none">
                {children}
            </ButtonContent>
            <ButtonContent className="absolute translate-y-4 opacity-0 group-hover:relative group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
                {children}
            </ButtonContent>
        </button>
    );
});
