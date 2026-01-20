import { BlogListing } from "@/components/blog/BlogListing";
import { ClientMotionDiv } from "@/components/common/animation/ClientMotionDiv";
import { TextReveal } from "@/components/common/animation/TextReveal";
import { WaveBackground } from "@/components/common/animation/WaveBackground";
import CTA from "@/components/home/CTA";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { slideUp, staggerContainer } from "@/utils/motion-variants";


const Page = async () => {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <div className="flex flex-col relative min-h-screen pt-24">
      <div className="relative common-layout max-w-[1350px] py-24 px-6 overflow-hidden">
        <WaveBackground />
        <ClientMotionDiv
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative text-center max-w-4xl mx-auto space-y-8"
        >
          <ClientMotionDiv variants={slideUp}>
            <p className="text-label opacity-50 uppercase tracking-[0.4em]">Insights & Stories</p>
          </ClientMotionDiv>

          <TextReveal
            text="The Engineering & Design Blog"
            className="heading-section text-5xl md:text-7xl"
          />

          <ClientMotionDiv variants={slideUp}>
            <p className="text-body text-xl md:text-2xl text-[var(--color-text-main)]/70 max-w-2xl mx-auto leading-relaxed">
              Thoughts on development, design, and the occasional deep dive into tech.
            </p>
          </ClientMotionDiv>
        </ClientMotionDiv>
      </div>

      <div className="bg-alternate py-24 border-t border-[var(--color-primary)]/10">
        <div className="common-layout max-w-[1350px]">
          <BlogListing posts={posts} />
        </div>
      </div>

      <CTA />
    </div>
  );
};

export default Page;
