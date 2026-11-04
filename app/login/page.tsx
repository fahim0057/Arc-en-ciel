import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
      <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}