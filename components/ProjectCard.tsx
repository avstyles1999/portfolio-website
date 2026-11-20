import Link from "next/link";
import type { Project } from "@/content/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-md">
      <h3 className="font-semibold text-lg leading-snug">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{project.oneLiner}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 border-t border-brand-border pt-4 text-sm font-medium text-brand-accentDark">
        {project.standoutMetric}
      </p>
      <Link href={`/projects/${project.slug}`} className="mt-3 font-medium text-brand-accent hover:underline">
        Read case study →
      </Link>
    </div>
  );
}
