import ContactForm from "@/components/contact/contact-form";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

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
            </div>
          </div>
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
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Form Column */}
              <div className="w-full lg:flex-[1.4]">
                <ContactForm />
              </div>

              {/* Info & Details Column */}
              <div className="w-full lg:flex-1 flex flex-col gap-6 rounded-2xl border border-border bg-card/30 p-6 md:p-8">
                {/* Content */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}