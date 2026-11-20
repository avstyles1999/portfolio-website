import Link from "next/link";
import type { Project } from "@/content/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="h-full border border-brand-border rounded-lg p-6 flex flex-col">
      <h3 className="font-semibold text-lg">{project.title}</h3>
      <p className="mt-2 text-sm text-brand-muted flex-1">{project.oneLiner}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="text-xs rounded-full border border-brand-border px-2 py-1">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-brand-accentDark">{project.standoutMetric}</p>
      <Link href={`/projects/${project.slug}`} className="mt-4 text-brand-accent font-medium hover:underline">
        Read case study →
      </Link>
    </div>
  );
}
