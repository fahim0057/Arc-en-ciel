"use client";

import { useRouter } from "next/navigation";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CurrentUser } from "@/hooks/use-current-user";
import { authClient } from "@/lib/auth-client";
import { profileSchema, type ProfileValues } from "@/lib/validations/auth";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function ProfileForm({ user }: { user: CurrentUser }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, photoURL: user.image ?? "" },
  });

  const name = useWatch({ control, name: "name" }) ?? "";
  const photoURL = useWatch({ control, name: "photoURL" }) ?? "";

  async function onSubmit(values: ProfileValues) {
    const { error } = await authClient.updateUser({
      name: values.name,
      image: values.photoURL,
    });

    if (error) {
      toast.error(error.message ?? "Could not update your profile.");
      return;
    }

    toast.success("Profile updated successfully!");
    reset(values); // the saved values become the new baseline, so Save disables again
    router.refresh();
  }

  function onInvalid(errs: FieldErrors<ProfileValues>) {
    const first = Object.values(errs)[0];
    if (first?.message) toast.error(String(first.message));
  }

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={photoURL || undefined} alt={name} referrerPolicy="no-referrer" />
          <AvatarFallback className="text-2xl">{initials(name || user.name)}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-3 text-2xl">{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled readOnly />
            <p className="text-xs text-muted-foreground">Your email cannot be changed.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoURL">Photo URL</Label>
            <Input id="photoURL" placeholder="https://..." {...register("photoURL")} />
            {errors.photoURL && (
              <p className="text-sm text-destructive">{errors.photoURL.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              The picture above updates as you type, so you can check it before saving.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || !isDirty}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}