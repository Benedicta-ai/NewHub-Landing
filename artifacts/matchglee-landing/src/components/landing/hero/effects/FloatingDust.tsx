import { motion } from "framer-motion";

const dust = Array.from({ length: 50 });

export default function FloatingDust() {
  return (
    <>
      {dust.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
          }}
        />
      ))}
    </>
  );
}
