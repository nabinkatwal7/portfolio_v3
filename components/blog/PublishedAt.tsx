/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";

type PublishedAtProps = {
  publishedAt: NonNullable<any>["publishedAt"];
};

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  return publishedAt ? (
    <p className="text-base ">{dayjs(publishedAt).format("D MMMM YYYY")}</p>
  ) : null;
}
