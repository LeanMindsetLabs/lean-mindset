import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/data/blogs";

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="flex flex-col gap-4 pt-2">
      <Link href="/blog" className="text-sm text-accent">
        ← Blog
      </Link>

      <div
        className="overflow-hidden rounded-[var(--lm-radius-xl)] border border-border"
        style={{ background: post.imageGradient }}
      >
        <div className="aspect-[16/10] p-5">
          <div className="flex h-full flex-col justify-end">
            <span className="w-fit rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
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

      <div className="space-y-4">
        {post.body.map((para) => (
          <p key={para.slice(0, 24)} className="text-sm leading-relaxed text-foreground-muted">
            {para}
          </p>
        ))}
      </div>

      <Link
        href="/check-in"
        className="mt-2 rounded-full bg-accent py-3 text-center text-sm font-bold text-white"
      >
        Apply it — daily check-in →
      </Link>
    </article>
  );
}
