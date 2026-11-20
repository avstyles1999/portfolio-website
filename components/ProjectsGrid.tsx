import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  return (
    <section id="projects" className="px-6 sm:px-12 max-w-5xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
