import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/work`, changeFrequency: "weekly" },
    { url: `${base}/blog`, changeFrequency: "weekly" },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.publishedAt ?? undefined })),
  ];
}
