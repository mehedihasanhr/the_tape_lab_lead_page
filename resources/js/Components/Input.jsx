import { cn } from "@/Utils/lib";
import * as React from "react";

export const Input = React.forwardRef(function Input(
    { className, onChange, value, ...props },
    ref
) {
    return (
        <input
            className={cn(
                "h-11 border border-border outline-primary outline-offset-0 focus:outline-offset-8 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted rounded-md transition-all duration-300 ease-linear disabled:bg-muted/20 placeholder:text-sm",
                className
            )}
            ref={ref}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
});
