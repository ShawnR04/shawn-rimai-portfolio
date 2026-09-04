import React from 'react';
import Image from 'next/image';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { ArrowRight, Download } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/ShawnR04', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shawn-rimai-a24249279', icon: FaLinkedinIn },
  { name: 'Email', href: 'mailto:shawnrimai04@gmail.com', icon: SiGmail, isExternal: false },
];

export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-12 py-12 text-center lg:flex-row lg:gap-16 lg:py-24 lg:text-left">
      {/* Content Column */}
      <div className="flex flex-1 flex-col items-center gap-6 lg:items-start">
        {/* Status Pill - 100ms delay */}
        <div 
          className="animate-fade-in-up opacity-0 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md"
          style={{ animationDelay: '100ms' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for Co-op & Internships
        </div>

        {/* Intro Headings - 200ms delay */}
        <div 
          className="animate-fade-in-up space-y-2"
          style={{ animationDelay: '200ms' }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Shawn Rimai
          </h1>
          <h2 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl lg:text-3xl">
            Full-Stack Software Developer
          </h2>
        </div>

        {/* Body Paragraph - 300ms delay */}
        <p 
          className="animate-fade-in-up opacity-0 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: '300ms' }}
        >
          Building resilient web applications, modular UI components, and modern digital experiences using TypeScript, Next.js, and scalable database architectures.
        </p>

        {/* CTA Buttons - 400ms delay */}
        <div 
          className="animate-fade-in-up opacity-0 flex flex-wrap items-center justify-center gap-4 pt-1 lg:justify-start"
          style={{ animationDelay: '400ms' }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-95"
          >
            Get In Touch
            <ArrowRight className="size-4" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-card active:scale-95"
          >
            <Download className="size-4 text-muted-foreground" />
            Download Resume
          </a>
        </div>

        {/* Social Icons - 500ms delay */}
        <div 
          className="animate-fade-in-up opacity-0 flex items-center justify-center gap-3 pt-2 lg:justify-start"
          style={{ animationDelay: '500ms' }}
        >
          {SOCIAL_LINKS.map(({ name, href, icon: Icon, isExternal = true }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              {...(isExternal && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:text-foreground active:scale-95"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Hero Image - 250ms fade */}
      <div 
        className="animate-fade-in opacity-0 flex flex-1 items-center justify-center w-full max-w-md lg:max-w-none"
        style={{ animationDelay: '250ms' }}
      >
        <div className="relative aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-md overflow-hidden rounded-3xl border border-border bg-card/40 p-2 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted/20">
            <Image
              src="/profile.jpg"
              alt="Shawn Rimai"
              fill
              priority
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 450px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}