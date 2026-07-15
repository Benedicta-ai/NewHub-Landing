import { motion } from "framer-motion";
import BlobCore from "./blob/BlobCore";
import BlobGlow from "./blob/BlobGlow";
import BlobParticles from "./blob/BlobParticles";
import OrbitingNodes from "./blob/OrbitingNodes";

export default function HeroBlob() {
  return (
    <motion.div
      className="relative flex justify-center items-center w-[760px] h-[760px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 1.2 },
        scale: { duration: 1.2 },
        y: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* Ambient Glow */}
      <div
        className="absolute w-[760px] h-[760px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,25,154,.08), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <BlobGlow />
      <OrbitingNodes />
      <BlobParticles />
      <BlobCore />
    </motion.div>
  );
}
