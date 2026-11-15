import { v2 as cloudinary } from "cloudinary";

export function cloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
  );
}

export function uploadBuffer(buf: Buffer, resourceType: "image" | "raw", filename: string): Promise<string> {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "portfolio", resource_type: resourceType, filename_override: filename, use_filename: true },
        (err, result) => (err || !result ? reject(err ?? new Error("Upload failed")) : resolve(result.secure_url)),
      )
      .end(buf);
  });
}
