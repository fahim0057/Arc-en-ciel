"use client";

import { authClient } from "@/lib/auth-client";

export interface CurrentUser {
  name: string;
  email: string;
  image?: string | null;
}

export function useCurrentUser() {
  const { data, isPending } = authClient.useSession();

  const user: CurrentUser | null = data?.user
    ? { name: data.user.name, email: data.user.email, image: data.user.image }
    : null;

  return {
    user,
    isPending,
    logout: async () => {
      await authClient.signOut();
    },
  };
}