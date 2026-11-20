import Link from "next/link";
import { projects } from "@/content/projects";

const CARD =
  "flex h-full flex-col rounded-xl border border-brand-border bg-brand-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-md";

export default function CaseStudyNav({ currentOrder }: { currentOrder: number }) {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const prev = ordered.find((p) => p.order === currentOrder - 1);
  const next = ordered.find((p) => p.order === currentOrder + 1);

  return (
    <nav aria-label="Case studies" className="mt-16 border-t border-brand-border pt-10">
      <div className="grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className={CARD}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">← Previous</span>
            <span className="mt-2 font-semibold leading-snug text-brand-accent">{prev.title}</span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className={`${CARD} sm:items-end sm:text-right`}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Next →</span>
            <span className="mt-2 font-semibold leading-snug text-brand-accent">{next.title}</span>
          </Link>
        )}
      </div>
      <Link href="/#projects" className="mt-8 inline-block font-medium text-brand-accent hover:underline">
        ← Back to all projects
      </Link>
    </nav>
  );
}
