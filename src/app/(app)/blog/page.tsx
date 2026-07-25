import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { blogThumbs, media } from "@/lib/media";
import { ImageBanner } from "@/components/ui/VisualKit";

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

      <ImageBanner
        src={media.ui.blog}
        position="40% 20%"
        heightClass="aspect-[21/9] min-h-[100px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Reads</p>
        <p className="text-sm font-semibold text-white">Mindset that sticks</p>
      </ImageBanner>

      <ul className="flex flex-col gap-4">
        {blogPosts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="lm-card-lift block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={blogThumbs[i % blogThumbs.length]}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: `${25 + i * 12}% ${20 + i * 8}%` }}
                  sizes="512px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
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
