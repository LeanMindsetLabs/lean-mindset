import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipe, recipes } from "@/data/recipes";
import { AiBadge } from "@/components/ui/VisualKit";
import { MiniRing } from "@/components/ui/ProgressRing";
import { recipeThumbs } from "@/lib/media";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) notFound();
  const thumbIdx = Math.max(0, recipes.findIndex((r) => r.id === id));

  return (
    <div className="flex flex-col gap-4 pt-2">
      <Link href="/recipes" className="text-sm text-accent">
        ← Recipes
      </Link>

      <div className="relative overflow-hidden rounded-[var(--lm-radius-xl)] border border-border">
        <div className="relative aspect-[4/3]">
          <Image
            src={recipeThumbs[thumbIdx % recipeThumbs.length]}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: `${20 + (thumbIdx % 4) * 15}% center` }}
            sizes="512px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <div>{recipe.aiSuggested && <AiBadge />}</div>
            <div>
              <h1 className="font-display text-3xl uppercase text-white">{recipe.title}</h1>
              <p className="mt-1 text-sm text-white/85">{recipe.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Min", value: `${recipe.minutes}` },
          { label: "kcal", value: `${recipe.calories}` },
          { label: "Protein", value: `${recipe.proteinG}g` },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-[var(--lm-radius-md)] border border-border bg-background-card py-3 text-center"
          >
            <p className="font-display text-2xl text-accent">{m.value}</p>
            <p className="text-[10px] uppercase text-foreground-muted">{m.label}</p>
          </div>
        ))}
      </div>

      <section className="flex items-center gap-4 rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <div className="relative">
          <MiniRing percent={Math.min(100, recipe.proteinG * 2)} size={64} />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
            P
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold">Protein density</p>
          <p className="text-xs text-foreground-muted">
            Fits {recipe.meal === "any" ? "any meal" : `Meal · ${recipe.meal}`}
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">Ingredients</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing) => (
            <li
              key={ing}
              className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-2 text-sm"
            >
              {ing}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">Steps</h2>
        <ol className="space-y-2">
          {recipe.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-foreground-muted">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
