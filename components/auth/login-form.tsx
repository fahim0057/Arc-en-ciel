"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/social-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));

  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message ?? "Login failed. Please check your details.");
      return;
    }

    toast.success("Welcome back! You are now logged in.");
    router.push(redirectTo);
    router.refresh();
  }

  function onInvalid(errs: FieldErrors<LoginValues>) {
    const first = Object.values(errs)[0];
    if (first?.message) toast.error(String(first.message));
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    // Google sends the user away and back, so the page reloads.
    // Leave a note so a "logged in" toast can show after we return.
    sessionStorage.setItem("auth-toast", "Logged in with Google. Welcome!");

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });

    if (error) {
      sessionStorage.removeItem("auth-toast");
      toast.error(error.message ?? "Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Log in to create, join and manage events.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || googleLoading}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogle}
          disabled={googleLoading || isSubmitting}
        >
          {googleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-4 w-4" />
          )}
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link
            href={
              redirectTo === "/" ? "/register" : `/register?redirect=${encodeURIComponent(redirectTo)}`
            }
            className="font-medium text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}