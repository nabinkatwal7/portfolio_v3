import { Post } from "@/components/blog/Post";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
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
    <CommonWrapper className=" grid grid-cols-1  gap-6 common-layout max-w-[1350px]">
      <Post {...post} />
    </CommonWrapper>
  );
}
