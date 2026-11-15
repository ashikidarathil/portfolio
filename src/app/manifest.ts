import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Muhammed Ashik · Full Stack Developer",
    short_name: "Ashik",
    description: "Portfolio, projects and blog of Muhammed Ashik, full stack developer from Kerala.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#111111",
    theme_color: "#111111",
    categories: ["portfolio", "developer"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Work", url: "/work", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Blog", url: "/blog", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
