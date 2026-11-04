"use client";

export interface CurrentUser {
  name: string;
  email: string;
  image?: string | null;
}

// TEMPORARY STUB. Replaced by Better Auth's useSession() in the auth step.
export function useCurrentUser() {
  const user = null as CurrentUser | null;
  // To preview the logged-in navbar, comment the line above and use this one:
  // const user: CurrentUser | null = { name: "Demo User", email: "demo@example.com", image: null };

  return {
    user,
    isPending: false,
    logout: async () => {},
  };
}