import { cn } from "@/Utils/lib";
import { motion } from "framer-motion";
import * as React from "react";

export const LeftContentAnimation = ({
    isSidebarVisitable,
    children,
    className,
    ...props
}) => {
    const [width, setWidth] = React.useState(0);

    const [outerAnimate, setOuterAnimate] = React.useState({ width: "100%" });
    const [innerAnimate, setInnerAnimate] = React.useState({ x: 0 });

    const [x, setX] = React.useState(0);
    const [isSmallDevice, setIsSmallDevice] = React.useState(false);
    const ref = React.useRef(null);

    React.useLayoutEffect(() => {
        if (ref && ref.current) {
            // const innerWidth = window?.innerWidth;
            // const containerWidth =
            //     innerWidth < 576 ? innerWidth - 32 : ref.current.offsetWidth;
            // const calc = Math.abs(innerWidth - containerWidth);
            // const w = containerWidth - 450;
            // if (innerWidth < 450) {
            // }
            // if (innerWidth)
            //     if (calc < 450 && isSidebarVisitable) {
            //         setX(-450);
            //         setIsSmallDevice(true);
            //         setWidth(w);
            //     } else {
            //         setX(0);
            //         setIsSmallDevice(false);
            //         setWidth("100%");
            //     }

            const innerWidth = window?.innerWidth;
            // get container width
            const containerWidth = ref.current.offsetWidth;
            const calc = Math.abs(innerWidth - containerWidth);

            const sidebarWidth = innerWidth < 450 ? innerWidth : 450;

            if (isSidebarVisitable && calc < sidebarWidth) {
                setInnerAnimate({
                    x: -sidebarWidth + 200,
                    position: "absolute",
                });
                setOuterAnimate({ width: containerWidth - sidebarWidth });
            } else {
                setInnerAnimate({ x: 0, position: "relative" });
            }
        }
    }, [isSidebarVisitable, ref]);

    return (
        <motion.div
            animate={outerAnimate}
            transition={{ type: "easeInOut" }}
            className="h-full flex flex-col items-center"
        >
            <motion.div
                animate={innerAnimate}
                transition={{ type: "easeInOut" }}
                className="h-full relative"
            >
                <div ref={ref} className={cn("h-full", className)} {...props}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};
