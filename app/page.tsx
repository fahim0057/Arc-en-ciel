import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex items-center gap-4 p-10">
      <Button>Primary button</Button>
      <ThemeToggle />
    </div>
  );
}