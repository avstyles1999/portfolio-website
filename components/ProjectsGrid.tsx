import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard";
import Section from "./Section";

export default function ProjectsGrid() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  return (
    <Section id="projects" eyebrow="Selected work" title="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
        {ordered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
