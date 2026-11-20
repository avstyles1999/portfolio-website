import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationAchievements from "@/components/EducationAchievements";
import ProjectsGrid from "@/components/ProjectsGrid";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Contact />
      <ExperienceTimeline />
      <EducationAchievements />
      <ProjectsGrid />
      <Skills />
    </main>
  );
}
