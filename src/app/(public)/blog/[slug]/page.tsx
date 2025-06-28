"use client";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  return <div>Post dinámico: {params.slug}</div>;
}
