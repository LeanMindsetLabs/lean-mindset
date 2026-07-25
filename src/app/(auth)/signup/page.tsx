import { AuthForm } from "@/components/AuthForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex flex-1 flex-col justify-center gap-6">
      <div>
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Join Lean Mindset to unlock grocery lists, workouts, schedules, and
          more.
        </p>
      </div>
      <AuthForm mode="signup" next={next || "/program"} />
    </div>
  );
}
