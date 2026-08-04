import Link from "next/link";

export type WorkflowStepId = "meals" | "train" | "checkin" | "program";

const STEPS: { id: WorkflowStepId; label: string; href: string; short: string }[] = [
  { id: "meals", label: "Meals", href: "/nutrition", short: "Fuel" },
  { id: "train", label: "Train", href: "/train", short: "Move" },
  { id: "checkin", label: "Check-in", href: "/check-in", short: "Coach" },
  { id: "program", label: "Program", href: "/program", short: "Lab" },
];

/** Compact daily loop strip - highlights current step */
export function DailyWorkflowStrip({ active }: { active: WorkflowStepId }) {
  const activeIndex = STEPS.findIndex((s) => s.id === active);

  return (
    <nav
      className="rounded-[14px] border border-[#64748b]/28 bg-[#0d1118]/90 px-2 py-2"
      aria-label="Daily workflow"
    >
      <ol className="grid grid-cols-4 gap-1">
        {STEPS.map((step, i) => {
          const isActive = step.id === active;
          const isDone = i < activeIndex;
          return (
            <li key={step.id}>
              <Link
                href={step.href}
                className={`flex flex-col items-center rounded-[10px] px-1 py-1.5 text-center transition ${
                  isActive
                    ? "bg-[#2563eb]/20 text-[#60a5fa]"
                    : isDone
                      ? "text-[#94a3b8]"
                      : "text-[#64748b] hover:text-[#94a3b8]"
                }`}
              >
                <span
                  className={`mb-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-[#2563eb] text-white"
                      : isDone
                        ? "bg-[#2563eb]/30 text-[#bfdbfe]"
                        : "bg-white/8 text-[#64748b]"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </span>
                <span className="text-[10px] font-semibold leading-tight">{step.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type TodayTask = {
  label: string;
  detail: string;
  href: string;
  step: WorkflowStepId;
  done?: boolean;
};

/** Home “what your lab wants today” card */
export function TodayLabPlan({
  mealsDone,
  mealsTarget,
  workoutsDone,
  workoutsTarget,
  checkInDone = false,
}: {
  mealsDone: number;
  mealsTarget: number;
  workoutsDone: number;
  workoutsTarget: number;
  checkInDone?: boolean;
}) {
  const mealsLeft = Math.max(0, mealsTarget - mealsDone);
  const workoutsLeft = Math.max(0, workoutsTarget - workoutsDone);

  const tasks: TodayTask[] = [
    {
      step: "meals",
      label: mealsLeft === 0 ? "Meals on plan" : `${mealsLeft} meal${mealsLeft === 1 ? "" : "s"} left`,
      detail: "Daily meal plan · tap to log on Meals",
      href: "/nutrition",
      done: mealsLeft === 0,
    },
    {
      step: "train",
      label: workoutsLeft === 0 ? "Training complete" : "Today's Workout Session",
      detail: workoutsLeft === 0 ? "Week target hit" : "Foundation → acceleration",
      href: "/train",
      done: workoutsLeft === 0,
    },
    {
      step: "checkin",
      label: checkInDone ? "Check-in sent" : "Daily check-in",
      detail: "Weight · meals · coach chat",
      href: "/check-in",
      done: checkInDone,
    },
  ];

  return (
    <section className="rounded-[18px] border border-[#64748b]/28 bg-[#0d1118]/95 p-3.5">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <h2 className="text-[13px] font-semibold text-white">Your lab today</h2>
        <Link href="/program" className="text-[11px] font-semibold text-[#60a5fa]">
          Program →
        </Link>
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.step}>
            <Link
              href={task.href}
              className={`flex items-center gap-3 rounded-[12px] border px-3 py-2.5 transition ${
                task.done
                  ? "border-[#2563eb]/25 bg-[#2563eb]/10"
                  : "border-[#64748b]/22 bg-black/20 hover:border-[#60a5fa]/40"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  task.done ? "bg-[#2563eb] text-white" : "bg-white/10 text-[#94a3b8]"
                }`}
              >
                {task.done ? "✓" : task.step === "meals" ? "1" : task.step === "train" ? "2" : "3"}
              </span>
              <span className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white">{task.label}</p>
                <p className="text-[10px] text-[#64748b]">{task.detail}</p>
              </span>
              <span className="text-[#64748b]">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { STEPS as WORKFLOW_STEPS };
