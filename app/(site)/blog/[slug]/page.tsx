import { Post } from "@/components/blog/Post";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import CTA from "@/components/home/CTA";
import { getBlogPostBySlug } from "@/app/actions/common";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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
