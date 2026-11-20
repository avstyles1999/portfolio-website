import { skills } from "@/content/skills";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills" tone="surface">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category} className="rounded-xl border border-brand-border bg-brand-bg p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{group.category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
