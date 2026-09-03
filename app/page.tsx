import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-20">
        <section 
          id="home" 
          className="min-h-[calc(100vh-5rem)] scroll-mt-20"
        >
          Home
        </section>

        <section 
          id="about" 
          className="min-h-screen scroll-mt-20"
        >
          About
        </section>

        <section 
          id="skills" 
          className="min-h-screen scroll-mt-20"
        >
          Skills
        </section>

        <section 
          id="projects" 
          className="min-h-screen scroll-mt-20"
        >
          Projects
        </section>

        <section 
          id="contact" 
          className="min-h-screen scroll-mt-20"
        >
          Contact
        </section>
      </main>

      <Footer/>
    </>
  );
}