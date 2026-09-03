import Image from 'next/image';
import React from 'react'
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from 'react-icons/si';
import { FaInstagram } from 'react-icons/fa6';

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/ShawnR04",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shawn-rimai-a24249279",
    icon: FaLinkedinIn,
  },
  {
    name: "Email",
    href: "mailto:your-email@gmail.com",
    icon: SiGmail,
    isExternal: false,
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/40 py-10 px-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 text-center">
        {/* Logo & Name */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="Shawn Anotidaishe Rimai Logo"
            width={44}
            height={44}
            className="rounded-lg"
          />
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Shawn Anotidaishe Rimai
          </h3>
        </div>

        {/* Bio / Value Prop */}
        <p className="max-w-md text-base text-muted-foreground leading-relaxed">
          Software Engineer crafting scalable full-stack applications with a sharp eye for responsive, accessible user interfaces.
        </p>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ name, href, icon: Icon, isExternal = true }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              {...(isExternal && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-card hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Subtle Hairline Divider */}
        <div className="my-2 h-px w-200 bg-border" />

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-muted-foreground/70">
          &copy; 2026 Shawn Anotidaishe Rimai. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
