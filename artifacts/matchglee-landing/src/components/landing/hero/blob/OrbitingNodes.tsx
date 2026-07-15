import { motion } from "framer-motion";

const rings = [
  { radius: 240, count: 10 },
  { radius: 300, count: 8 },
  { radius: 360, count: 6 },
];

export default function OrbitingNodes() {
  return (
    <>
      {rings.map((ring, index) => (
        <motion.div
          key={ring.radius}
          className="absolute"
          animate={{
            rotate: index % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 35 + index * 12,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: ring.count }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                transform: `rotate(${(360 / ring.count) * i}deg) translateX(${ring.radius}px)`,
              }}
            >
              <motion.div
                className="rounded-full bg-white"
                style={{
                  width: 5 + Math.random() * 5,
                  height: 5 + Math.random() * 5,
                  boxShadow: "0 0 14px rgba(255,255,255,.45)",
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                }}
              />
            </div>
          ))}
        </motion.div>
      ))}
    </>
  );
}
