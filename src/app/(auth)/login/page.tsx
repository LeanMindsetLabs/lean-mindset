import { AuthForm } from "@/components/AuthForm";
import { MEMBER_APP_HOME } from "@/lib/device/mobile-preview";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex flex-1 flex-col justify-center gap-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Log in to access your Lean Mindset lab materials.
        </p>
      </div>
      <AuthForm mode="login" next={next || MEMBER_APP_HOME} />
    </div>
  );
}
