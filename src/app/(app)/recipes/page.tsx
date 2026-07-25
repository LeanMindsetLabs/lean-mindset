import Link from "next/link";
import { recipes } from "@/data/recipes";
import { AiBadge, MediaCard, SectionHeader } from "@/components/ui/VisualKit";

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

      <SectionHeader title="AI suggested" href="/recipes/ai" linkLabel="View all" />
      <div className="flex gap-3 overflow-x-auto pb-1">
        {recipes
          .filter((r) => r.aiSuggested)
          .map((r) => (
            <div key={r.id} className="w-[200px] shrink-0">
              <MediaCard
                href={`/recipes/${r.id}`}
                gradient={r.imageGradient}
                title={r.title}
                subtitle={`${r.minutes} min · ${r.proteinG}g P`}
                badge={<AiBadge />}
              />
            </div>
          ))}
      </div>

      <h2 className="text-sm font-semibold">All recipes</h2>
      <div className="grid grid-cols-2 gap-3">
        {recipes.map((r) => (
          <MediaCard
            key={r.id}
            href={`/recipes/${r.id}`}
            gradient={r.imageGradient}
            title={r.title}
            subtitle={`${r.calories} kcal · ${r.proteinG}g`}
            badge={r.aiSuggested ? <AiBadge /> : undefined}
          />
        ))}
      </div>
    </div>
  );
}
