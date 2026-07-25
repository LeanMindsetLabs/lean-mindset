import Link from "next/link";
import { blogPosts } from "@/data/blogs";

export default function BlogListPage() {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/more" className="text-sm text-accent">
          ← More
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Blog</h1>
        <p className="text-sm text-foreground-muted">Program mindset & habits</p>
      </header>

      <ul className="flex flex-col gap-4">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent"
            >
              <div
                className="relative aspect-[16/9]"
                style={{ background: post.imageGradient }}
              >
                <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase text-accent backdrop-blur">
                  {post.category}
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-semibold leading-snug">{post.title}</h2>
                <p className="mt-1 text-xs text-foreground-muted line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="mt-2 text-[10px] text-foreground-subtle">
                  {post.readMinutes} min · {post.published}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
