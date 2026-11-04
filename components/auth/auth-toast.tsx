"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// Shows the "logged in" toast after a Google login, once the session is ready.
export function AuthToast() {
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending || !data?.user) return;

    const message = sessionStorage.getItem("auth-toast");
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("auth-toast");
    }
  }, [data, isPending]);

  return null;
}