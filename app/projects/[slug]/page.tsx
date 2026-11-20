import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { projects } from "@/content/projects";
import CaseStudyNav from "@/components/CaseStudyNav";
import { CONTAINER } from "@/components/Section";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Anmol Verma`,
    description: project.oneLiner,
    openGraph: { title: project.title, description: project.oneLiner },
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

const PROSE = "text-base sm:text-lg leading-relaxed sm:text-justify";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main>
      <header className="border-b border-brand-border bg-[radial-gradient(ellipse_at_top_left,_#D1FAE5_0%,_transparent_55%)]">
        <div className={`${CONTAINER} py-16 sm:py-20`}>
          <Link href="/#projects" className="text-sm font-medium text-brand-muted hover:text-brand-accent">
            ← Projects
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Case study</p>
          <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-lg sm:text-xl text-brand-muted">{project.oneLiner}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className={`${CONTAINER} py-16 sm:py-20`}>
        <div className="max-w-3xl">
          <Block title="Overview">
            <p className={PROSE}>{project.overview}</p>
          </Block>
          <Block title="Problem">
            <p className={PROSE}>{project.problem}</p>
          </Block>
          <Block title="Approach">
            <p className={PROSE}>{project.approach}</p>
          </Block>
          <section className="mt-12 rounded-xl border border-emerald-100 bg-brand-accentSoft p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight">Impact</h2>
            <ul className="mt-4 space-y-3">
              {project.impact.map((i) => (
                <li key={i} className="flex gap-3 font-medium text-brand-accentDark tabular-nums">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <CaseStudyNav currentOrder={project.order} />
      </div>
    </main>
  );
}
