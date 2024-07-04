import { AnimatePresence, motion } from "framer-motion";

export const SidebarAnimation = ({ children, isOpen, className, ...props }) => {
    const sidebarWidth = innerWidth < 450 ? innerWidth : 450;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: sidebarWidth }}
                    exit={{ width: 0 }}
                    transition={{ type: "easeInOut" }}
                    className="h-full z-10"
                >
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ type: "easeInOut" }}
                        className="h-full bg-white"
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
