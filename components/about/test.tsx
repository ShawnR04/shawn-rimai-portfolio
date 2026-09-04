'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Cpu, 
  GraduationCap, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiPostgresql, 
  SiReact, 
  SiDrizzle 
} from 'react-icons/si';

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "Computer Science Co-op",
    description: "Second-year undergraduate student exploring algorithms, systems architecture, and software design patterns.",
  },
  {
    icon: Code2,
    title: "Full-Stack Web",
    subtitle: "Modern TypeScript",
    description: "Building production-ready applications with Next.js, relational schemas, type-safe APIs, and responsive design systems.",
  },
  {
    icon: Layers,
    title: "UI Architecture",
    subtitle: "Component Systems",
    description: "Creating accessible, modular component libraries and developer tooling published to the open-source community.",
  },
  {
    icon: Cpu,
    title: "Mobile & Systems",
    subtitle: "Offline-First Sync",
    description: "Designing resilient cross-platform mobile apps with local database caching and background synchronization.",
  },
];

const CORE_STACK = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Drizzle ORM', icon: SiDrizzle },
  { name: 'React Native', icon: SiReact },
];

export default function AboutMeTest({ username = 'ShawnR04' }: { username?: string }) {
  const [repoCount, setRepoCount] = useState<number | null>(null);

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
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:gap-24 lg:py-20">
      {/* Section Header */}
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          About Me
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Bridging solid architecture with polished design.
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
          A closer look at my background, the tools I build with, and what drives my development process.
        </p>
      </div>

      {/* Main Grid: Portrait & Bio */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left: Portrait / Visual Card */}
        <div className="flex flex-col items-center gap-6 lg:col-span-5">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card/40 p-2 shadow-xl backdrop-blur-md">
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted/20">
              <Image
                src="/profile.jpg"
                alt="Shawn Rimai"
                fill
                priority
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 384px, 420px"
              />
            </div>
          </div>

          {/* Quick Stats Pill Grid */}
          <div className="grid w-full max-w-sm grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-card/30 p-4 text-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-foreground">2nd</span>
              <p className="text-xs text-muted-foreground">Year CS Student</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/30 p-4 text-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-primary">
                {repoCount !== null ? `${repoCount}+` : '...'}
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
              When I’m not coding or refactoring UI components, you can usually find me studying system design, gaming, or experimenting with new web toolkits and workflow optimizations.
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

      {/* Focus Areas & Milestones Grid */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            What I Focus On
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Key areas of software development where I spend the majority of my time building and learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card/30 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/50"
              >
                <div className="space-y-4">
                  <div className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card/80 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-primary">
                      {item.subtitle}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}