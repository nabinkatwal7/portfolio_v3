/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

const options = { next: { revalidate: 60 } };

const Page = async () => {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Post index</h1>
      <ul className="grid grid-cols-1 divide-y divide-blue-100">
        {posts.map((post: any) => (
          <li key={post._id}>
            <Link
              className="block p-4 hover:text-blue-500"
              href={`/blog/${post?.slug?.current}`}
            >
              {post?.title}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <Link href="/">&larr; Return home</Link>
    </main>
  );
};

export default Page;
