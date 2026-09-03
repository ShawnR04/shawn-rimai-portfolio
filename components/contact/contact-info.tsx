import { Mail, MapPin } from 'lucide-react';
import React from 'react'

export default function ContactInfo() {
  return (
    <>
        {/* Availability Status Badge */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 w-fit px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Co-op & Full-time Roles
          </div>
          
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Let&apos;s build something great
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you have a specific project, an internship opportunity, or just want to chat about architecture and tech, my inbox is always open.
          </p>
        </div>

        {/* Direct Info Items */}
        <div className="flex flex-col gap-5 text-sm">
          {/* Email */}
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card/60 text-primary">
              <Mail className="h-5 w-5"/>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </span>
              <a href="mailto:shawnrimai04@gmail.com" className="text-xs font-semibold text-foreground hover:text-primary transition-colors mt-0.5">
                shawnrimai04@gmail.com
              </a>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card/60 text-primary">
              <MapPin className="h-5 w-5"/>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </span>
              <p className="text-xs font-semibold text-foreground hover:text-primary transition-colors mt-0.5">
                Welland, Ontario, CA
              </p>
            </div>
          </div>
          {/*  */}
        </div>
    </>
  )
}
