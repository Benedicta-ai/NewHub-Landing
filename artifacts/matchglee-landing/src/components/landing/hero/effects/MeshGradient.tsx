import { motion } from "framer-motion";

export default function MeshGradient() {
  return (
    <>
      {/* Purple Mesh */}
      <motion.div
        className="absolute -top-80 -left-80 w-[1100px] h-[1100px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(113,50,200,0.25) 0%, rgba(113,50,200,0) 70%)",
          filter: "blur(140px)",
        }}
        animate={{
          x: [-80, 60, -80],
          y: [-50, 40, -50],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pink Mesh */}
      <motion.div
        className="absolute -bottom-96 -right-80 w-[1000px] h-[1000px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,25,154,0.22) 0%, rgba(240,25,154,0) 70%)",
          filter: "blur(140px)",
        }}
        animate={{
          x: [60, -60, 60],
          y: [40, -40, 40],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center Ambient Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
