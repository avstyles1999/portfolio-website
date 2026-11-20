import type { ReactNode } from "react";

/** Shared inner container: every homepage section uses this so left/right edges align. */
export const CONTAINER = "mx-auto w-full max-w-5xl px-6 sm:px-10";

type Tone = "plain" | "surface" | "accent";

const TONES: Record<Tone, string> = {
  plain: "bg-brand-bg",
  surface: "bg-brand-surface border-y border-brand-border",
  accent: "bg-brand-accentSoft border-y border-emerald-100",
};

export default function Section({
  id,
  eyebrow,
  title,
  tone = "plain",
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-16 py-20 sm:py-24 ${TONES[tone]}`}>
      <div className={CONTAINER}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
