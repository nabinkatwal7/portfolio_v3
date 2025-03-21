import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const TechComponent = ({ name, image }: { name: string; image: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={name}
      className="bg-white/5 p-8 sm:p-10 rounded-xl shadow-xl relative flex items-center justify-center"
      // variants={itemVariants}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 15px 40px rgba(255, 255, 255, 0.15)",
      }}
      animate="floating"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
    </motion.div>
  );
};

export default TechComponent;
