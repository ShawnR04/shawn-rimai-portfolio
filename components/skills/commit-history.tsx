'use client';

import React, { useEffect, useState } from 'react';
import { CalendarDays, Flame, GitFork, Users } from 'lucide-react';


interface GitHubStats {
  publicRepos: number;
  followers: number;
  contributions: number;
  memberSince: string;
}

export default function CommitHistory({ username = 'ShawnR04' }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const [userRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          // Fetch all contribution years across the account lifetime
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=all`),
        ]);

        const userData = await userRes.json();
        const contribData = await contribRes.json();

        if (!isMounted) return;

        // Sum contributions across all years from the API's total dictionary
        const allYearsTotal = contribData?.total
          ? Object.values(contribData.total).reduce(
              (acc: number, count) => acc + (typeof count === 'number' ? count : 0),
              0
            )
          : Array.isArray(contribData?.contributions)
          ? contribData.contributions.reduce(
              (acc: number, item: { count: number }) => acc + (item?.count || 0),
              0
            )
          : 0;

        const formattedDate = userData?.created_at
          ? new Date(userData.created_at).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })
          : '—';

        setStats({
          publicRepos: userData?.public_repos ?? 0,
          followers: userData?.followers ?? 0,
          contributions: allYearsTotal,
          memberSince: formattedDate,
        });
      } catch (err) {
        console.error('Failed to load GitHub stats:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Github Stats
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Repositories */}
        <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card/30 p-6 [perspective:800px]">
          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Repositories
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              {loading ? '—' : `${stats?.publicRepos ?? 0}`}
            </h1>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 -right-3 z-0 flex items-center justify-center opacity-[0.07] transform-gpu -rotate-12 [transform:rotateX(25deg)_rotateY(-35deg)]"
          >
            <GitFork className="size-36 text-foreground" strokeWidth={1} />
          </div>
        </div>

        {/* Followers */}
        <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card/30 p-6 [perspective:800px]">
          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Followers
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              {loading ? '—' : stats?.followers ?? 0}
            </h1>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 -right-3 z-0 flex items-center justify-center opacity-[0.07] transform-gpu -rotate-12 [transform:rotateX(25deg)_rotateY(-35deg)]"
          >
            <Users className="size-36 text-foreground" strokeWidth={1} />
          </div>
        </div>

        {/* Total Contributions */}
        <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card/30 p-6 [perspective:800px]">
          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Total Contributions
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              {loading ? '—' : `${stats?.contributions ?? 0}`}
            </h1>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 -right-3 z-0 flex items-center justify-center opacity-[0.07] transform-gpu -rotate-12 [transform:rotateX(25deg)_rotateY(-35deg)]"
          >
            <Flame className="size-36 text-foreground" strokeWidth={1} />
          </div>
        </div>

        {/* Member Since */}
        <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card/30 p-6 [perspective:800px]">
          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Member Since
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {loading ? '—' : stats?.memberSince ?? '—'}
            </h1>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 -right-3 z-0 flex items-center justify-center opacity-[0.07] transform-gpu -rotate-12 [transform:rotateX(25deg)_rotateY(-35deg)]"
          >
            <CalendarDays className="size-36 text-foreground" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className=""></div>
    </div>
  );
}