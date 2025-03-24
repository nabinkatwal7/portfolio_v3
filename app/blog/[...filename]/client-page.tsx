"use client";
import { useTina } from "tinacms/dist/react";
import { PostQuery } from "../../../tina/__generated__/types";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PostQuery;
}

export default function Post(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  return (
    <code>
      <pre>{JSON.stringify(data.post, null, 2)}</pre>
    </code>
  );
}
