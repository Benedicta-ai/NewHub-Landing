import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollHint() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 z-30"
      animate={{
        y: [0, 10, 0],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="w-8 h-8" />
    </motion.div>
  );
}
