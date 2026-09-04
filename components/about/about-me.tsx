'use client';

import React, { useEffect, useState } from 'react';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiPostgresql, 
  SiReact, 
  SiDrizzle 
} from 'react-icons/si';

const CORE_STACK = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Drizzle ORM', icon: SiDrizzle },
  { name: 'React Native', icon: SiReact },
];

export default function AboutMe({ username = 'ShawnR04' }: { username?: string }) {
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const year = '2nd';

  useEffect(() => {
    let isMounted = true;

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data?.public_repos === 'number') {
          setRepoCount(data.public_repos);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch public repo count:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 lg:gap-24">
      {/* Main Grid */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left: Interactive Code Terminal Card */}
        <div className="flex flex-col items-center gap-6 lg:col-span-5">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card/40 shadow-xl backdrop-blur-md">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-border/80 bg-muted/40 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-full bg-red-500/80" />
                <div className="size-3 rounded-full bg-amber-500/80" />
                <div className="size-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">shawn.config.ts</span>
              <div className="size-3 opacity-0" />
            </div>

            {/* Terminal Code Body */}
            <div className="p-5 font-mono text-xs leading-relaxed text-foreground/90">
              <p className="text-muted-foreground">{'// Developer Profile'}</p>
              <p className="pt-2">
                <span className="text-pink-400">const</span>{' '}
                <span className="text-cyan-300">developer</span> = &#123;
              </p>
              <div className="space-y-1 pl-4 pt-1 text-muted-foreground">
                <p>
                  name:{' '}
                  <span className="text-emerald-300">&apos;Shawn Rimai&apos;</span>,
                </p>
                <p>
                  role:{' '}
                  <span className="text-emerald-300">&apos;Full-Stack Engineer&apos;</span>,
                </p>
                <p>
                  status:{' '}
                  <span className="text-emerald-300">&apos;Seeking Co-op&apos;</span>,
                </p>
                <p>
                  interests: [
                  <span className="text-amber-200">&apos;TypeScript&apos;</span>,{' '}
                  <span className="text-amber-200">&apos;Design Systems&apos;</span>
                  ],
                </p>
                <p>
                  openSource:{' '}
                  <span className="text-purple-400">true</span>,
                </p>
              </div>
              <p>&#125;;</p>
              <p className="pt-2">
                <span className="text-pink-400">export default</span> developer;
              </p>
            </div>
          </div>

          {/* Quick Stats Pill Grid */}
          <div className="grid w-full max-w-sm grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-card/30 p-4 text-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-foreground">{year}</span>
              <p className="text-xs text-muted-foreground">Year CS Student</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/30 p-4 text-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-primary">
                {repoCount !== null ? `${repoCount}` : '...'}
              </span>
              <p className="text-xs text-muted-foreground">Shipped Projects</p>
            </div>
          </div>
        </div>

        {/* Right: Narrative Story */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Hi, I’m <span className="font-semibold text-foreground">Shawn Rimai</span>. 
              I’m a Computer Science student and software developer focused on crafting type-safe, resilient applications that balance performance with fluid user interfaces.
            </p>
            <p>
              My development philosophy centers on modular architecture and thoughtful developer experience. Whether I’m designing personal finance platforms like <span className="font-medium text-foreground">Cash Canopy</span>, authoring open-source component systems like <span className="font-medium text-foreground">@marv3l/canopy-ui</span>, or exploring offline-first mobile synchronizations, I care deeply about the details—from clean relational database schemas to smooth micro-interactions.
            </p>
            <p>
              When I’m not coding or refactoring UI components, you can usually find me studying system design, gaming, reading novels and manga, or experimenting with new web toolkits and workflow optimizations.
            </p>
          </div>

          {/* Core Technologies Bar */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {CORE_STACK.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3.5 py-2 text-sm font-medium text-foreground/90 backdrop-blur-sm"
                  >
                    <Icon className="size-4 text-primary" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}