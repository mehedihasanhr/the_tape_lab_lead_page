import { cn } from "@/Utils/lib";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export const ChangePasswordButton = () => {
    const commonClasses = "duration-200 transition-all pointer-events-none";

    return (
        <a
            href="#"
            className="overflow-hidden relative text-sm w-fit flex items-center gap-2 group"
        >
            <div className="flex">
                <span
                    className={cn(
                        "group-hover:absolute opacity-100 group-hover:-translate-y-4 group-hover:opacity-0",
                        commonClasses
                    )}
                >
                    Change password
                </span>
                <span
                    className={cn(
                        "absolute translate-y-4 opacity-0 group-hover:relative group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-primary",
                        commonClasses
                    )}
                >
                    Change password
                </span>
            </div>
            <div className="relative w-fit overflow-hidden">
                <span
                    className={cn(
                        "opacity-100 left-0 group-hover:absolute group-hover:-left-10 group-hover:opacity-0",
                        commonClasses
                    )}
                >
                    <IconArrowNarrowRight size={21} stroke={1.5} />
                </span>
                <span
                    className={cn(
                        "absolute left-full opacity-0 group-hover:relative group-hover:left-0 group-hover:opacity-100 group-hover:text-primary",
                        commonClasses
                    )}
                >
                    <IconArrowNarrowRight size={21} stroke={1.5} />
                </span>
            </div>
        </a>
    );
};
