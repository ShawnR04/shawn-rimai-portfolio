'use client';

import { useEffect, useState } from 'react';
import { ActivityCalendar, type Activity, type ThemeInput } from 'react-activity-calendar';

const tealTheme: ThemeInput = {
  dark: ['#161b22', '#004f5e', '#008b9e', '#00e5ff', '#e0ffff'],
};

interface CommitMapProps {
  username?: string;
}

export default function CommitMap({ username = 'ShawnR04' }: CommitMapProps) {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const currentYear = new Date().getFullYear();

    // Added cache: 'no-store' and a timestamp query parameter to bypass edge caching
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

  if (loading) {
    return (
      <div className="h-40 w-full max-w-212.5 animate-pulse rounded-2xl border border-neutral-800 bg-[#0d1117]/80" />
    );
  }

  if (!data.length) return null;

  return (
    <div className="w-full rounded-2xl border border-neutral-800 bg-[#0d1117]/90 p-4 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex w-full justify-center [&_svg]:h-auto [&_svg]:max-w-full [&_rect]:stroke-[#262c36] [&_rect]:stroke-[0.6]">
        <ActivityCalendar
          data={data}
          theme={tealTheme}
          colorScheme="dark"
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