"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      className="fixed bottom-8 right-8"
    >
      <div className="bg-card/50 backdrop-blur-lg rounded-full p-3 shadow-lg">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    </motion.div>
  );
}