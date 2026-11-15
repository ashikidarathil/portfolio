import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { cloudinaryConfigured, uploadBuffer } from "@/lib/cloudinary";

const MAX = 4 * 1024 * 1024; // Vercel limits request bodies to about 4.5 MB
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif", "image/svg+xml"];

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Your session has expired. Log in again." }, { status: 401 });
  if (!cloudinaryConfigured()) {
    return NextResponse.json({ error: "Uploads need Cloudinary. Add the CLOUDINARY_* variables, or paste an image URL." }, { status: 500 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });

  const isPdf = file.type === "application/pdf";
  if (!isPdf && !IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Upload a PNG, JPG, WebP, GIF, AVIF, SVG or PDF file." }, { status: 400 });
  }
  if (file.size > MAX) return NextResponse.json({ error: "That file is over 4 MB. Compress it and try again." }, { status: 400 });

  try {
    const url = await uploadBuffer(Buffer.from(await file.arrayBuffer()), isPdf ? "raw" : "image", file.name);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Cloudinary upload failed", err);
    return NextResponse.json({ error: "The upload failed. Check your Cloudinary keys." }, { status: 500 });
  }
}
