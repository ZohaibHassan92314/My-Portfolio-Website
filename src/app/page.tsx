import Navbar from "@/components/Navbar"
import MascotPortfolioHero from "@/components/ui/mascot-portfolio-hero"
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection"
import ProjectsSection from "@/components/ProjectsSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* ── Hero: Animated Mascot ── */}
      <section id="profile">
        <MascotPortfolioHero
          height="100svh"
          minHeight="520px"
          index="01/DE"
          discipline="Data Engineering"
          tagline="Build with data"
          collection={["Selected", "Projects"]}
          reel={["Portfolio @ 2025", "Data Engineer"]}
          year="2025"
          initials="ZH"
          badge="Hire me"
          line2="Portfolio"
          line3="Hassan"
          word="Data"
          verticalTag="Engineer"
          bracketed="++"
          seekingLabel="Available*"
          seeking="Full-time"
          href="mailto:zohaiblatif29@gmail.com"
          services={["ETL Pipelines", "Data Modeling", "Snowflake", "Power BI", "Python"]}
          greetings={[
            "Hi there! I'm Zohaib!",
            "Let's build something with data.",
            "Psst — I'm open to work!",
            "Data pipelines are my superpower :)",
          ]}
          skin="#f7cfb0"
          beanie="#0f1220"
          shirt="#161928"
          tag="#00d4ff"
          accent="#00d4ff"
          paper="#070810"
          ink="#dde4f0"
        />
      </section>

      {/* ── Remaining sections ── */}
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
