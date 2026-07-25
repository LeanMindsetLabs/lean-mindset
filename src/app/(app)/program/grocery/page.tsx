import { ProgramPage } from "@/components/ProgramPage";
import { groceryList } from "@/data/program";

export default function GroceryPage() {
  return (
    <ProgramPage title={groceryList.title} subtitle={groceryList.subtitle}>
      <div className="flex flex-col gap-3">
        {groceryList.sections.map((section) => (
          <section
            key={section.aisle}
            className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4"
          >
            <h2 className="mb-3 font-semibold text-accent">{section.aisle}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-border/60 py-2 text-sm last:border-0"
                >
                  <span className="inline-block h-4 w-4 rounded border border-foreground-subtle" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ProgramPage>
  );
}
