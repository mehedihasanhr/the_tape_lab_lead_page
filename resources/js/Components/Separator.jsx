import { cn } from "@/Utils/lib";
import { cva } from "class-variance-authority";

const variants = cva("bg-border", {
    variants: {
        orientation: {
            vertical: "w-[1px] h-full",
            horizontal: "w-full h-[1px]",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const Separator = ({ className, orientation }) => {
    return <div className={cn(variants({ orientation, className }))} />;
};
