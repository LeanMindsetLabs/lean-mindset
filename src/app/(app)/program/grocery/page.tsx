import { GroceryChecklist } from "@/components/GroceryChecklist";
import { ProgramPage } from "@/components/ProgramPage";
import { groceryList } from "@/data/program";

export default function GroceryPage() {
  return (
    <ProgramPage title={groceryList.title} subtitle={groceryList.subtitle}>
      <GroceryChecklist sections={[...groceryList.sections]} />
    </ProgramPage>
  );
}
