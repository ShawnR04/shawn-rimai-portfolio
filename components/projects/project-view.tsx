import { MoveUpRight, ShieldCheck, Mail, Database, Smartphone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiPostgresql, 
  SiDrizzle, 
  SiReact, 
  SiNpm ,
  SiVercel
} from 'react-icons/si';

const PROJECTS = [
  {
    id: 1,
    type: "Full-Stack Web App",
    projectName: "Cash Canopy",
    desc: "A comprehensive personal finance platform featuring real-time budget analytics, expense tracking with leaf/coin visual themes, and recurring bill notifications.",
    technologies: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "Tailwind CSS", icon: SiTailwindcss },
      { id: 4, name: "Drizzle ORM", icon: SiDrizzle },
      { id: 5, name: "Neon Postgres", icon: SiPostgresql },
      { id: 6, name: "Better Auth", icon: ShieldCheck },
      { id: 7, name: "Resend", icon: Mail },
    ],
    githubRepo: "https://github.com/ShawnR04/cash-canopy-v6",
    demoLink: "https://cashcanopy.dev",
    image: "/projects/cash-canopy.png",
  },
  {
    id: 2,
    type: "Open-Source / NPM Package",
    projectName: "@marv3l/canopy-ui",
    desc: "Published React component library and CLI distributed via npm, designed for rapid scaffolding of animated notifications and accessible UI primitives.",
    technologies: [
      { id: 1, name: "React", icon: SiReact },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "Tailwind CSS", icon: SiTailwindcss },
      { id: 4, name: "NPM Registry", icon: SiNpm },
    ],
    githubRepo: "https://github.com/ShawnR04/canopy-ui",
    demoLink: "https://www.npmjs.com/package/@marv3l/canopy-ui",
    image: "/projects/canopy-ui-npm.png",
  },
  {
    id: 3,
    type: "Documentation Platform",
    projectName: "Canopy UI Docs",
    desc: "Official documentation site and interactive playground for Canopy UI, featuring live component previews, API references, and CLI installation guides.",
    technologies: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "Tailwind CSS", icon: SiTailwindcss },
      { id: 4, name: "Vercel", icon: SiVercel },
    ],
    githubRepo: "https://github.com/ShawnR04/canopy-ui-web",
    demoLink: "https://canopy-ui-web.vercel.app/",
    image: "/projects/canopy-ui.png",
  },
  {
    id: 4,
    type: "Client / E-Commerce Web App",
    projectName: "Ali Bakes Cakes",
    desc: "A custom bakery showcase and inquiry portal featuring interactive product catalogs, custom order request flows, and responsive visual branding.",
    technologies: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "Tailwind CSS", icon: SiTailwindcss },
      { id: 4, name: "Vercel", icon: SiVercel },
    ],
    githubRepo: "https://github.com/ShawnR04/ali-bakes-cakes",
    demoLink: "https://ali-bakes-cakes.vercel.app",
    image: "/projects/ali-bakes-cakes.png",
  },
];

export default function ProjectView() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {PROJECTS.map((project) => (
        <div
          key={project.id}
          className="flex flex-col overflow-hidden rounded-2xl border-2 border-border bg-card/30 transition-all duration-300 hover:border-primary/40"
        >
          {/* Top: Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
            <Image
              src={project.image}
              alt={project.projectName}
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Body: flex-1 ensures it fills full card height */}
          <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
            {/* Project Details */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {project.type}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {project.projectName}
                </h3>
                <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.id}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {Icon && <Icon className="size-3.5" />}
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Corner Actions: mt-auto anchors to the very bottom */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 pt-2">
              {project.githubRepo && (
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card/80 active:scale-95"
                >
                  <FaGithub className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                    View on GitHub
                  </span>
                </a>
              )}

              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                >
                  <span>Demo</span>
                  <MoveUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
