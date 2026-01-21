"use client";
import { PostCard } from "@/components/blog/PostCard";
import { WaveBackground } from "@/components/common/animation/WaveBackground";
import { staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";


export function BlogListing({ posts }: { posts: any[] }) {
  return (
    <div className="relative overflow-hidden">
      <WaveBackground />
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        {posts?.length > 0 ? (

          posts.map((post: any) => <PostCard key={post._id} {...post} />)
        ) : (
          <div className="col-span-full text-center py-24 text-[var(--color-text-main)]/50">
            No posts found. Check back later!
          </div>
        )}
      </motion.div>
    </div>
  );
}
