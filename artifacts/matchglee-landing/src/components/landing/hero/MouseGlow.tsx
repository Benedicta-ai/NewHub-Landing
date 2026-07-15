import { motion } from "framer-motion";
import useMousePosition from "./hooks/useMousePosition";
import useViewport from "./hooks/useViewport";

export default function MouseGlow() {
  const { x, y } = useMousePosition();
  const { width, height } = useViewport();

  return (
    <motion.div
      animate={{
          x: x - 250 + (x - width / 2) * 0.02,
          y: y - 250 + (y - height / 2) * 0.02,
      }}
      transition={{
        type: "spring",
        damping: 35,
        stiffness: 120,
      }}
      className="fixed pointer-events-none z-10 w-[500px] h-[500px]"
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,25,154,.12), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  );
}
