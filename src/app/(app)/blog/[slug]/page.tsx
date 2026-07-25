import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "@/data/blogs";
import { blogThumbs } from "@/lib/media";

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const idx = Math.max(0, blogPosts.findIndex((p) => p.slug === slug));
  const thumb = blogThumbs[idx % blogThumbs.length];

  return (
    <article className="flex flex-col gap-4 pt-2">
      <Link href="/blog" className="text-sm text-accent">
        ← Blog
      </Link>

      <div className="relative overflow-hidden rounded-[var(--lm-radius-xl)] border border-border">
        <div className="relative aspect-[16/10]">
          <Image src={thumb} alt="" fill className="object-cover" sizes="512px" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <span className="w-fit rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase text-accent backdrop-blur">
              {post.category}
            </span>
            <h1 className="mt-2 font-display text-3xl uppercase leading-none text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <p className="text-xs text-foreground-subtle">
        {post.readMinutes} min read · {post.published}
      </p>
      <p className="text-sm text-foreground-muted">{post.excerpt}</p>

      <div className="space-y-3 text-sm leading-relaxed text-foreground">
        {post.body.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
    </article>
  );
}
