import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120 },
  },
  floating: {
    y: [0, -10, 0, 10, 0],
    transition: { repeat: Infinity, duration: 5, ease: "easeInOut" },
  },
};

const TechComponent = ({ name, image }: { name: string; image: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={name}
      className="bg-white/5 p-8 sm:p-10 rounded-xl shadow-xl relative flex items-center justify-center"
      variants={itemVariants}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 15px 40px rgba(255, 255, 255, 0.15)",
      }}
      animate="floating"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conditional Rendering */}
      {isHovered ? (
        <span className="text-white text-xl font-semibold">{name}</span>
      ) : (
        <Image
          alt={name}
          src={image}
          width={158}
          height={48}
          className="max-h-12 w-full object-contain"
        />
      )}

      {/* Water Reflection Effect */}
      <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-3/4 h-10 bg-white/10 blur-xl opacity-50 rounded-full"></div>
    </motion.div>
  );
};

export default TechComponent;
