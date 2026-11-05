"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProfileForm } from "@/components/profile/profile-form";
import { useCurrentUser } from "@/hooks/use-current-user";

export function ProfileView() {
  const { user, isPending } = useCurrentUser();

  if (isPending || !user) {
    return <Skeleton className="h-[34rem] w-full rounded-xl" />;
  }

  // key resets the form if a different user ever signs in
  return <ProfileForm key={user.email} user={user} />;
}