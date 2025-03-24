import Link from "next/link";
import { client } from "../../tina/__generated__/client";

export type PostConnection = {
  postConnection: {
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    totalCount: number;
    edges: Array<{
      cursor: string;
      node: {
        _sys: {
          filename: string; // Added filename type based on usage
        };
        id: string;
        __typename: string;
        title: string;
        body: Record<string, unknown>;
      };
    }>;
  };
};

async function Page() {
  // Type the response data using the PostConnection type
  const { data } = await client.queries.postConnection();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {data?.postConnection?.edges?.map((post) => (
          <div key={post?.node?.id}>
            <Link href={`/blog/${post?.node?._sys.filename}`}>
              {post?.node?._sys.filename}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
