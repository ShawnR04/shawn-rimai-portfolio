"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
      const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

      // Fallback if browser doesn't support View Transitions or prefers reduced motion
      if (
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTheme(nextTheme);
        return;
      }

      const { clientX: x, clientY: y } = e;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: resolvedTheme === "dark" ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 450,
            easing: "ease-in-out",
            pseudoElement:
              resolvedTheme === "dark"
                ? "::view-transition-old(root)"
                : "::view-transition-new(root)",
          }
        );
      });
    };
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/50 text-foreground transition-colors hover:bg-card cursor-pointer"
    >
        <Sun className="hidden h-5 w-5 text-yellow-400 dark:block" />
        <Moon className="block h-5 w-5 text-gray-600 dark:hidden" />
    </button>
  )
}
