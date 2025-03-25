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
      <h1 className="text-5xl font-extrabold text-center mb-10">Blog</h1>
      <div className="flex flex-col gap-24 py-12">
        {posts.map((post: any) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
      <CTA />
    </CommonWrapper>
  );
};

export default Page;
