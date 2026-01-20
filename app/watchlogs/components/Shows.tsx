"use client";
import { slideData, slideDataBook } from "@/data/showsData";
import { scaleIn, slideUp, staggerContainer } from "@/utils/motion-variants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const MediaCard = ({ title, src }: { title: string; src: string }) => (
  <motion.div
    layout
    variants={scaleIn}
    whileHover="hover"
    className="group relative overflow-hidden rounded-2xl bg-[var(--color-primary)]/5 backdrop-blur-md border border-[var(--color-primary)]/10 p-4 transition-all duration-500 hover:border-[var(--color-primary)]/30 hover:shadow-2xl"
  >
    <div className="aspect-[2/3] relative w-full overflow-hidden rounded-xl mb-6">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    <h3 className="heading-card text-center line-clamp-1 text-sm md:text-base group-hover:text-[var(--color-primary)] transition-colors duration-300">
      {title}
    </h3>
  </motion.div>
);

const SectionHeader = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => (
  <motion.div
    variants={staggerContainer}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 border-b border-[var(--color-primary)]/10 pb-8"
  >
    <motion.div variants={slideUp} className="flex flex-col gap-2">
      <h2 className="heading-section text-4xl">My Collection</h2>
      <p className="text-body opacity-60">A curated list of stories and cinema that have left an impression.</p>
    </motion.div>
    <motion.div variants={slideUp} className="flex p-1.5 bg-[var(--color-primary)]/5 rounded-full border border-[var(--color-primary)]/10 backdrop-blur-md">
      <button
        onClick={() => onTabChange("shows")}
        className={`px-8 py-2.5 rounded-full text-label transition-all duration-500 cursor-pointer ${activeTab === "shows" ? "bg-[var(--color-primary)] text-[var(--primary-foreground)] shadow-xl scale-105" : "hover:bg-[var(--color-primary)]/10 text-[var(--color-text-main)]/50 dark:text-[var(--color-text-main)]/50"}`}
      >
        Cinema & Shows ({slideData.length})
      </button>
      <button
        onClick={() => onTabChange("books")}
        className={`px-8 py-2.5 rounded-full text-label transition-all duration-500 cursor-pointer ${activeTab === "books" ? "bg-[var(--color-primary)] text-[var(--primary-foreground)] shadow-xl scale-105" : "hover:bg-[var(--color-primary)]/10 text-[var(--color-text-main)]/50 dark:text-[var(--color-text-main)]/50"}`}
      >
        Reading List ({slideDataBook.length})
      </button>
    </motion.div>
  </motion.div>
);

const LibraryContent = () => {
  const [activeTab, setActiveTab] = useState("shows");
  const displayData = activeTab === "shows" ? slideData : slideDataBook;

  return (
    <div className="common-layout max-w-[1350px] py-20">
      <SectionHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {displayData.map((item, idx) => (
            <MediaCard key={`${activeTab}-${idx}`} {...item} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LibraryContent;
