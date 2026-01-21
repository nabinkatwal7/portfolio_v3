
import dayjs from "dayjs";

type PublishedAtProps = {
  publishedAt: NonNullable<any>["publishedAt"];
};

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  return publishedAt ? (
    <p className="">{dayjs(publishedAt).format("D MMMM YYYY")}</p>
  ) : null;
}
