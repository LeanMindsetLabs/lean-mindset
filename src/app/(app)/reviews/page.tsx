import { CoachReviews } from "@/components/CoachReviews";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-3 pt-1">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Coaching</p>
        <h1 className="text-xl font-bold">Coach reviews</h1>
        <p className="text-xs text-foreground-muted">Ratings · filters · verified member feedback</p>
      </header>
      <CoachReviews />
    </div>
  );
}
