"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={isInitialMount.current ? false : { opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
