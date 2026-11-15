import Link from "next/link";
import { PostForm } from "@/components/admin/PostForm";

export default function NewPost() {
  return (
    <>
      <header className="ahead">
        <div><h1>New post</h1></div>
        <Link className="abtn ghost" href="/admin/posts">← All posts</Link>
      </header>
      <PostForm />
    </>
  );
}
