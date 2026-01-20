import { Post } from "@/components/blog/Post";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import CTA from "@/components/home/CTA";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col relative min-h-screen">
      <CommonWrapper className="grid grid-cols-1 gap-6 common-layout w-full">
        <Post {...post} />
      </CommonWrapper>
      <div className="bg-alternate py-10">
        <CTA />
      </div>
    </div>
  );
}
