'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SiPostgresql, SiDrizzle } from 'react-icons/si';

interface SubSkill {
  name: string;
  level: number;
  deviconPath?: string;
  customSvg?: React.ReactNode;
}

interface SkillCategory {
  id: string;
  number: string;
  title: string;
  skills: SubSkill[];
}

// Inline SVGs for tools needing specific brand treatments or that lack devicon SVGs
const FigmaLogo = () => (
  <svg className="size-5" viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
  </svg>
);

const FramerLogo = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="#0055FF">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
);

const VercelLogo = () => (
  <svg className="size-4 fill-white" viewBox="0 0 24 24">
    <path d="M24 22.525H0l12-21.05 12 21.05z" />
  </svg>
);

const DrizzleLogo = () => (
  <SiDrizzle className="size-5 text-[#C5F74F]" />
);

const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    number: '01',
    title: 'Languages',
    skills: [
      { name: 'TypeScript', level: 90, deviconPath: 'typescript/typescript-original.svg' },
      { name: 'JavaScript', level: 90, deviconPath: 'javascript/javascript-original.svg' },
      { name: 'Python', level: 85, deviconPath: 'python/python-original.svg' },
      { name: 'Java', level: 80, deviconPath: 'java/java-original.svg' },
    ],
  },
  {
    id: 'software',
    number: '02',
    title: 'Software & Tools',
    skills: [
      { name: 'Next.js', level: 90, deviconPath: 'nextjs/nextjs-original.svg' },
      { name: 'Node.js', level: 50, deviconPath: 'nodejs/nodejs-original.svg' },
      { name: 'React Native', level: 55, deviconPath: 'react/react-original.svg' },
      { name: 'Tailwind CSS', level: 95, deviconPath: 'tailwindcss/tailwindcss-original.svg' },
      { name: 'PostgreSQL', level: 70, deviconPath: 'postgresql/postgresql-original.svg' },
      { name: 'MySQL', level: 20, deviconPath: 'mysql/mysql-original.svg' },
      { name: 'DrizzleKit ORM', level: 35, customSvg: <DrizzleLogo /> },
      { name: 'Vite', level: 46, deviconPath: 'vitejs/vitejs-original.svg' },
      { name: 'Vercel', level: 85, customSvg: <VercelLogo /> },
      { name: 'Git', level: 50, deviconPath: 'git/git-original.svg' },
      { name: 'GitHub', level: 76, deviconPath: 'github/github-original.svg' },
    ],
  },
];

export default function SkillsAccordion() {
  const [openCategory, setOpenCategory] = useState<string | null>('languages');

  const toggleCategory = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {skillCategories.map((category) => {
        const isOpen = openCategory === category.id;
        const avg =
          category.skills.length > 0
            ? Math.round(
                category.skills.reduce((acc, skill) => acc + skill.level, 0) /
                  category.skills.length
              )
            : 0;

        return (
          <div
            key={category.id}
            className={`w-full rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-border bg-card/40 shadow-2xl backdrop-blur-md'
                : 'border-transparent bg-transparent hover:border-border/40 hover:bg-card/20'
            }`}
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors sm:p-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                    isOpen
                      ? 'bg-primary/15 text-primary'
                      : 'bg-muted/40 text-muted-foreground'
                  }`}
                >
                  {category.number}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground">
                    {category.skills.length} skills{' '}
                    <span className="text-muted-foreground/50">·</span>{' '}
                    <span className="font-semibold text-primary">avg {avg}%</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 sm:gap-7">
                <div className="hidden items-center gap-3 sm:flex">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted/40">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${avg}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-xs font-medium text-muted-foreground">
                    {avg}%
                  </span>
                </div>

                <div className="flex size-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-transform">
                  {isOpen ? (
                    <ChevronUp className="size-4 text-foreground" />
                  ) : (
                    <ChevronDown className="size-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>

            {/* Skills Grid */}
            {isOpen && (
              <div className="border-t border-border/40 px-4 pb-6 pt-4 sm:px-6">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative flex flex-col justify-between rounded-xl border border-border/40 bg-card/30 p-4 transition-all hover:border-border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Neutral icon wrapper frame that doesn't override SVG fill colors */}
                          <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-1.5 shadow-sm">
                            {skill.customSvg ? (
                              skill.customSvg
                            ) : skill.deviconPath ? (
                              <img
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.deviconPath}`}
                                alt={skill.name}
                                className="size-5 object-contain"
                                loading="lazy"
                              />
                            ) : null}
                          </div>
                          <span className="text-sm font-semibold text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}