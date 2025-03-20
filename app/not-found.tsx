"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="flex flex-col gap-8 items-center justify-center content-center common-layout"
    >
      <div className="shadow-2xl">
        <Image
          src="/images/not-found.jpg"
          alt="404"
          width={800}
          height={350}
          className="rounded-lg"
        />
      </div>
      <h1 className="text-4xl text-center max-w-[1000px] text-balance text-white sm:text-5xl">
        This page didn’t just break… it broke bad.
      </h1>
      <Link
        href="/"
        className="text-base font-semibold text-white bg-primary px-3.5 py-2.5 rounded-md shadow-sm hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Get back home
      </Link>
    </motion.div>
  );
};

export default NotFound;
