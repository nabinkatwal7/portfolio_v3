import { floatIn } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const TechComponent = ({ name, image }: { name: string; image: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={name}
      variants={floatIn}
      className="bg-white backdrop-blur-md backdrop-saturate-200 p-8 sm:p-10 rounded-xl shadow-sm border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40 relative flex items-center justify-center transition-all duration-300 group"
      // variants={itemVariants}
      whileHover={{
        scale: 1.05,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <span className="text-[var(--color-text-main)] text-xl font-semibold z-10">{name}</span>
      ) : (
        <Image
          alt={name}
          src={image}
          width={158}
          height={48}
          className="max-h-12 w-full object-contain z-10 drop-shadow-[0_0_1px_rgba(0,0,0,0.1)]"
        />
      )}
    </motion.div>
  );
};

export default TechComponent;
