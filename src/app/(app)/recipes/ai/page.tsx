import Link from "next/link";
import { aiRecipes } from "@/data/recipes";
import { AiBadge, MediaCard } from "@/components/ui/VisualKit";

export default function AiRecipesPage() {
  const list = aiRecipes();

  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/recipes" className="text-sm text-accent">
          ← Recipes
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <h1 className="font-display text-3xl uppercase">AI recipes</h1>
          <AiBadge />
        </div>
        <p className="mt-1 text-sm text-foreground-muted">
          High-protein picks matched to meal windows.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {list.map((r) => (
          <MediaCard
            key={r.id}
            href={`/recipes/${r.id}`}
            gradient={r.imageGradient}
            title={r.title}
            subtitle={`${r.minutes} min · Meal ${r.meal}`}
            badge={<AiBadge />}
          />
        ))}
      </div>
    </div>
  );
}
