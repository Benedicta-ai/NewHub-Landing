import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export default function BlobCore() {
  const mouse = useMousePosition();

  const x = (mouse.x - window.innerWidth / 2) * 0.02;
  const y = (mouse.y - window.innerHeight / 2) * 0.02;

  return (
    <motion.div
      animate={{
        x,
        y,
        rotate: [0, 3, -3, 0],
        scale: [1, 1.03, 0.99, 1],
      }}
      transition={{
        x: {
          type: "spring",
          stiffness: 45,
          damping: 18,
        },
        y: {
          type: "spring",
          stiffness: 45,
          damping: 18,
        },
        rotate: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: 6,
          repeat: Infinity,
        },
      }}
      className="relative"
    >
      {/* Outer Glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(240,25,154,.45), rgba(113,50,200,.18), transparent 75%)",
          transform: "scale(1.45)",
        }}
      />

      {/* Glass Shell */}
      <div
        className="
          w-72
          h-72
          rounded-full
          border
          border-white/10
          backdrop-blur-3xl
          relative
          overflow-hidden
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.02))",
          boxShadow:
            "0 0 120px rgba(240,25,154,.25), inset 0 0 40px rgba(255,255,255,.06)",
        }}
      >
        {/* Liquid Core */}
        <motion.div
          className="absolute inset-8 rounded-full"
          style={{
            background: "linear-gradient(135deg,#F0199A,#8B5CF6,#5B21B6)",
            filter: "blur(2px)",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Highlight */}
        <div
          className="absolute left-12 top-10 w-24 h-10 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom,rgba(255,255,255,.35),transparent)",
            filter: "blur(6px)",
            transform: "rotate(-20deg)",
          }}
        />
      </div>
    </motion.div>
  );
}
