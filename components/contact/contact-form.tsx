import React from "react";

export default function ContactForm() {
  return (
    <form className="flex-1 space-y-5 rounded-2xl border border-border bg-card/30 p-6 md:p-10">
      {/* First Name & Last Name / Email */}
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label
            htmlFor="name"
            className="px-2 text-sm font-medium text-muted-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label
            htmlFor="email"
            className="px-2 text-sm font-medium text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="px-2 text-sm font-medium text-muted-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Project Inquiry / Collaboration"
          className="w-full rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="px-2 text-sm font-medium text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project or inquiry..."
          className="w-full resize-none rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.99] sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}