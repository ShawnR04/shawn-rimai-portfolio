import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import CommitHistory from "@/components/skills/commit-history";
import CommitMap from "@/components/skills/commit-map";
import GitHubHeatmap from "@/components/skills/commit-map";
import SkillView from "@/components/skills/skill-view";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-20 w-full  max-w-5xl lg:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-8 md:px-20 lg:px-24">
        <section 
          id="home" 
          className="min-h-[calc(100vh-5rem)] scroll-mt-20"
        >
          Home
        </section>

        <section 
          id="about" 
          className="min-h-screen scroll-mt-20 flex flex-col py-10"
        >
          <div className="w-full">
            {/* Section Header */}
            <div className="mb-8 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                About
              </p>
            </div>
          </div>
        </section>

        <section 
          id="skills" 
          className="min-h-screen scroll-mt-20 flex flex-col py-10"
        >
          <div className="w-full">
            {/* Section Header */}
            <div className="mb-8 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Skills
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Skills and Expertise
              </h2>
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                A curated collection of tools, frameworks, and technologies I use to build scalable full-stack applications and intuitive interfaces.
              </p>
            </div>

            <SkillView/>
          </div>

          <CommitHistory/>

          <CommitMap/>
        </section>

        <section 
          id="projects" 
          className="min-h-screen scroll-mt-20 flex flex-col py-10"
        >
          <div className="w-full">
            {/* Section Header */}
            <div className="mb-8 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Projects
              </p>
            </div>
          </div>
        </section>

        <section 
          id="contact" 
          className="min-h-screen scroll-mt-20 flex flex-col py-10"
        >
          <div className="w-full">
            {/* Section Header */}
            <div className="mb-8 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Get In Touch
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Let&apos;s Connect
              </h2>
              <p className="max-w-xl text-base text-muted-foreground">
                Have a question, a project idea, or just want to talk tech? Drop me a message and I&apos;ll get back to you soon.
              </p>
            </div>

            {/* Two-Column Grid: Form + Info */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
              {/* Form Column */}
              <div className="w-full lg:flex-[1.4]">
                <ContactForm />
              </div>

              {/* Info & Details Column */}
              <div className="w-full lg:flex-1 flex flex-col gap-6 rounded-2xl border border-border bg-card/30 p-6 md:p-8">
                <ContactInfo/>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}