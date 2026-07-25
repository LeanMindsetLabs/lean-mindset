import Link from "next/link";
import { recipes } from "@/data/recipes";
import { AiBadge, MediaCard, SectionHeader, ImageBanner } from "@/components/ui/VisualKit";
import { media, recipeThumbs } from "@/lib/media";

export default function RecipesPage() {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/more" className="text-sm text-accent">
          ← More
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Recipes</h1>
        <p className="text-sm text-foreground-muted">Plate ideas for the 4-meal system</p>
      </header>

      <ImageBanner
        src={media.cards.mealEggs}
        position="center"
        heightClass="aspect-[21/9] min-h-[100px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Kitchen</p>
        <p className="text-sm font-semibold text-white">High-protein plates · timed meals</p>
      </ImageBanner>

      <SectionHeader title="AI suggested" href="/recipes/ai" linkLabel="View all" />
      <div className="flex gap-3 overflow-x-auto pb-1">
        {recipes
          .filter((r) => r.aiSuggested)
          .map((r, i) => (
            <div key={r.id} className="w-[200px] shrink-0">
              <MediaCard
                href={`/recipes/${r.id}`}
                gradient={r.imageGradient}
                image={recipeThumbs[i % recipeThumbs.length]}
                imagePosition={`${20 + i * 15}% ${30 + i * 10}%`}
                title={r.title}
                subtitle={`${r.minutes} min · ${r.proteinG}g P`}
                badge={<AiBadge />}
              />
            </div>
          ))}
      </div>

      <h2 className="text-sm font-semibold">All recipes</h2>
      <div className="grid grid-cols-2 gap-3">
        {recipes.map((r, i) => (
          <MediaCard
            key={r.id}
            href={`/recipes/${r.id}`}
            gradient={r.imageGradient}
            image={recipeThumbs[i % recipeThumbs.length]}
            imagePosition={`${15 + (i % 4) * 20}% ${25 + (i % 3) * 15}%`}
            title={r.title}
            subtitle={`${r.calories} kcal · ${r.proteinG}g`}
            badge={r.aiSuggested ? <AiBadge /> : undefined}
          />
        ))}
      </div>
    </div>
  );
}
