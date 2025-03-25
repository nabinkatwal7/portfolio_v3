/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostCard } from "@/components/blog/PostCard";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import CTA from "@/components/home/CTA";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

const Page = async () => {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <CommonWrapper className="common-layout max-w-[1350px]">
      <h2 className="text-4xl font-semibold tracking-tight text-pretty  sm:text-5xl">
        Blog
      </h2>
      <div className="flex flex-wrap justify-start gap-8 py-12 mx-auto">
        {posts.map((post: any) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>

      <CTA />
    </CommonWrapper>
  );
};

export default Page;
