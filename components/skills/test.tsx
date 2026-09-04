'use client';

import { useEffect, useState } from 'react';
import { ActivityCalendar, type Activity, type ThemeInput } from 'react-activity-calendar';

const tealTheme: ThemeInput = {
  dark: [
    '#171b22', // Level 0: dark pill
    '#004f5e', // Level 1
    '#008b9e', // Level 2
    '#00e5ff', // Level 3: neon cyan
    '#e0ffff', // Level 4: bright white-cyan
  ],
};

interface UserData {
  contributions: Activity[];
  totalContributions: number;
  followers: number;
  createdAt: string;
}

export default function CommitCard({ username = 'ShawnR04' }: { username?: string }) {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
    ])
      .then(([contribRes, userRes]) => {
        if (!isMounted) return;

        const currentYear = new Date().getFullYear();
        const total =
          contribRes?.total?.[currentYear] ??
          contribRes?.total?.['lastYear'] ??
          contribRes?.contributions?.reduce((acc: number, c: Activity) => acc + c.count, 0) ??
          0;

        setData({
          contributions: contribRes.contributions ?? [],
          totalContributions: total,
          followers: userRes.followers ?? 0,
          createdAt: userRes.created_at
            ? new Date(userRes.created_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })
            : 'Sep 2024',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="h-64 w-full animate-pulse rounded-2xl border border-white/10 bg-[#0a0d14]/90" />
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#090d14]/95 p-6 text-white shadow-2xl backdrop-blur-xl">
      {/* Subtle background star flecks */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '40px 40px, 70px 70px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="relative z-10 space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <span className="block text-xs font-medium text-neutral-400">Followers</span>
            <span className="mt-1 block text-2xl font-bold tracking-tight">
              {data?.followers ?? 0}
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <span className="block text-xs font-medium text-neutral-400">Contributions</span>
            <span className="mt-1 block text-2xl font-bold tracking-tight text-white">
              {data?.totalContributions ?? 0}+
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <span className="block text-xs font-medium text-neutral-400">Member since</span>
            <span className="mt-1 block text-2xl font-bold tracking-tight">
              {data?.createdAt ?? 'Sep 2024'}
            </span>
          </div>
        </div>

        {/* Scaled Heatmap Container */}
        <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-black/30 p-4 pt-6">
          <div className="w-full overflow-x-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:min-w-[650px] [&_rect]:stroke-[#262c36] [&_rect]:stroke-[0.6]">
            {data?.contributions && (
              <ActivityCalendar
                data={data.contributions}
                theme={tealTheme}
                colorScheme="dark"
                blockSize={13}
                blockRadius={3}
                blockMargin={4}
                fontSize={12}
                showWeekdayLabels={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}