import { motion } from "framer-motion";

export default function BlobGlow() {
  return (
    <>
      <motion.div
        className="absolute w-[620px] h-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,25,154,.22), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(113,50,200,.35), transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.18, 0.42, 0.18],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </>
  );
}
