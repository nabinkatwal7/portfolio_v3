"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface TechItem {
  name: string;
  image: string;
}

interface OrbitProps {
  items: TechItem[];
  radius: number;
  duration?: number;
  reverse?: boolean;
}

const OrbitRing = ({ items, radius, duration = 20, reverse = false }: OrbitProps) => {
  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full border border-[var(--color-bg-light)]/30"
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {items.map((item, index) => {
        const angle = (index / items.length) * 360;
        const radian = (angle * Math.PI) / 180;

        // We position items on the ring using trigonometry, but since the ring rotates,
        // we can just place them statically relative to the container and the container rotation does the rest.
        // Actually, to make them upright, they need to counter-rotate.

        return (
          <motion.div
            key={item.name}
            className="absolute flex items-center justify-center bg-white dark:bg-[var(--color-primary)]/20 backdrop-blur-xl backdrop-saturate-200 rounded-full shadow-sm p-2 w-10 h-10 sm:w-12 sm:h-12 border border-[var(--color-primary)]/20 dark:border-[var(--color-primary)]/25 overflow-hidden"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
              // The above transform places them on the circle but they are static relative to the ring container.
              // As the ring container rotates, these will rotate with it.
              // To keep them upright relative to the screen, we need to counter-rotate the ICON itself.
            }}
          >
            <motion.div
               animate={{ rotate: reverse ? 360 : -360 }}
               transition={{
                 duration: duration,
                 repeat: Infinity,
                 ease: "linear",
               }}
               className="w-full h-full flex items-center justify-center"
            >
             <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={40}
              className="w-full h-full object-contain z-10 drop-shadow-[0_0_1px_rgba(0,0,0,0.1)] dark:drop-shadow-none"
            />
            </motion.div>
             {/* Tooltip on hover could go here */}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export const TechOrbit = ({ code, tools, web }: { code: TechItem[], tools: TechItem[], web: TechItem[] }) => {
    // Slice huge lists to avoid visual clutter in the orbit
    // We can show the full list below or in a marquee if needed.
    // For now, let's try to fit most important ones or reasonable chunks.

    const webCore = web.slice(0, 10); // Top 10 web
    // Note: User might want ALL. But 37 is too many for one ring.
    // Let's do 3 rings.

  return (
    <div className="relative flex items-center justify-center w-[800px] h-[800px] overflow-hidden">
      {/* Core - Me or Logo */}
      <div className="z-10 bg-[var(--color-primary)]/20 backdrop-blur-2xl backdrop-saturate-200 p-4 rounded-full shadow-lg border-4 border-[var(--color-primary)]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]/10 animate-pulse" />
         <div className="w-20 h-20 flex items-center justify-center text-[var(--color-primary)] font-bold text-xl">
             Tech
         </div>
         {/* Ping animation effect */}
         <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] opacity-20 animate-ping"></div>
      </div>

      {/* Rings */}
      {/* Inner: Code (8 items) */}
      <OrbitRing items={code} radius={160} duration={30} />

      {/* Middle: Tools (8 items) */}
      <OrbitRing items={tools} radius={260} duration={45} reverse />

      {/* Outer: Web (12 items) */}
      {/* We select a subset or maybe we can make a 3rd and 4th ring?
          260px radius is already 520px wide. Container is 800px.
          We have room for max ~350px radius (700px wide).
      */}
      <OrbitRing items={webCore} radius={350} duration={60} />

      {/* Background decorations removed for clarity */}
    </div>
  );
};
