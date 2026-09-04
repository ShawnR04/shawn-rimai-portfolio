'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { ActivityCalendar, type Activity, type ThemeInput } from 'react-activity-calendar';

const tealTheme: ThemeInput = {
  light: ['#ebedf0', '#80deea', '#26c6da', '#00acc1', '#006064'],
  dark: ['#161b22', '#004f5e', '#008b9e', '#00e5ff', '#e0ffff'],
};

interface CommitMapProps {
  username?: string;
}

export default function CommitMap({ username = 'ShawnR04' }: CommitMapProps) {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    const currentYear = new Date().getFullYear();

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}&t=${Date.now()}`,
      { cache: 'no-store' }
    )
      .then((res) => res.json())
      .then((res) => {
        if (isMounted) {
          setData(Array.isArray(res?.contributions) ? res.contributions : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch contributions:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="h-44 w-full animate-pulse rounded-2xl border border-border bg-card/40" />
    );
  }

  if (!data.length) return null;

  // Resolve active theme safely (defaults to 'dark' before hydration)
  const currentScheme = mounted && resolvedTheme === 'light' ? 'light' : 'dark';

  return (
    <div className="w-full rounded-2xl border border-border bg-card/40 p-4 shadow-xl backdrop-blur-md transition-colors duration-300 sm:p-6">
      <div className="flex w-full justify-center [&_svg]:h-auto [&_svg]:max-w-full [&_rect]:stroke-border/50 [&_rect]:stroke-[0.6] [&_text]:fill-muted-foreground">
        <ActivityCalendar
          data={data}
          theme={tealTheme}
          colorScheme={currentScheme}
          blockSize={12}
          blockRadius={3}
          blockMargin={4}
          fontSize={12}
          showWeekdayLabels={false}
        />
      </div>
    </div>
  );
}