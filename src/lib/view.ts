import type { Post } from "./types";
import { monthYear, readMinutes } from "./utils";

export const postRow = (p: Post) => ({
  slug: p.slug,
  title: p.title,
  date: monthYear(p.publishedAt ?? p.createdAt),
  read: `${readMinutes(p.content)} min`,
  tag: p.tag,
});
