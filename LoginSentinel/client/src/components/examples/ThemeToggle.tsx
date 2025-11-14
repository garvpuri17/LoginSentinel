import ThemeToggle from "../ThemeToggle";

export default function ThemeToggleExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">Click to toggle theme</p>
        <ThemeToggle />
      </div>
    </div>
  );
}
