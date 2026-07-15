import { motion } from "framer-motion";

const nodes = [
  { x: "18%", y: "22%" },
  { x: "32%", y: "48%" },
  { x: "56%", y: "28%" },
  { x: "74%", y: "58%" },
  { x: "86%", y: "32%" },
  { x: "44%", y: "74%" },
];

export default function MoleculeNetwork() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Connecting Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="none"
      >
        <line x1="18%" y1="22%" x2="32%" y2="48%" stroke="#ffffff22" />
        <line x1="32%" y1="48%" x2="56%" y2="28%" stroke="#ffffff22" />
        <line x1="56%" y1="28%" x2="74%" y2="58%" stroke="#ffffff22" />
        <line x1="74%" y1="58%" x2="86%" y2="32%" stroke="#ffffff22" />
        <line x1="32%" y1="48%" x2="44%" y2="74%" stroke="#ffffff22" />
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: node.x,
            top: node.y,
            width: 6,
            height: 6,
            boxShadow: "0 0 16px rgba(255,255,255,.7)",
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
