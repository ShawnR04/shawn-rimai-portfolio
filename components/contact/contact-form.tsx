"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 space-y-5 rounded-2xl border border-border bg-card/30 p-6 md:p-10"
    >
      {/* Success Notification */}
      {status === "success" && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-5 shrink-0" />
          <span>Message sent successfully! I&apos;ll get back to you soon.</span>
        </div>
      )}

      {/* Error Notification */}
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="size-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* First Name & Email */}
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
            disabled={loading}
            placeholder="John Doe"
            className="w-full rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
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
            disabled={loading}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
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
          disabled={loading}
          placeholder="Project Inquiry / Collaboration"
          className="w-full rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
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
          disabled={loading}
          placeholder="Tell me about your project or inquiry..."
          className="w-full resize-none rounded-xl border border-border bg-card/50 p-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        <span>{loading ? "Sending..." : "Send Message"}</span>
      </button>
    </form>
  );
}