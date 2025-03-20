"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Overlay = () => {
  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-[999] flex overflow-hidden items-center justify-center">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-1/2 h-full background-gradient flex items-center justify-center"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-1/2 h-full background-gradient flex items-center justify-center"
      />
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute flex items-center justify-center"
      >
        <Image src="/images/logo.png" alt="Logo" width={400} height={200} />
      </motion.div>
    </div>
  );
};

export default Overlay;
