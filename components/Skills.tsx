import { skills } from "@/content/skills";
import type { SkillGroup } from "@/content/types";
import Section from "./Section";

/** Categories shown in the left column, in this order; everything else goes right. */
const LEFT = ["Programming Languages", "AI Tools & Low-Code", "Databases"];

function SkillCard({ group, grow }: { group: SkillGroup; grow: boolean }) {
  return (
    <div className={`rounded-xl border border-brand-border bg-brand-bg p-5 ${grow ? "flex-1" : ""}`}>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{group.category}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span key={item} className="rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Left column: the last card stretches so both columns end level.
 * Right column (sm+): equal-height rows, so Web Technologies and Frameworks & Tools match.
 * On mobile both are plain stacks and every card fits its content.
 */
function Column({ name, groups, equalRows }: { name: string; groups: SkillGroup[]; equalRows?: boolean }) {
  return (
    <div data-col={name} className={`flex flex-col gap-6 ${equalRows ? "sm:grid sm:auto-rows-fr" : ""}`}>
      {groups.map((g, i) => (
        <SkillCard key={g.category} group={g} grow={!equalRows && i === groups.length - 1} />
      ))}
    </div>
  );
}

export default function Skills() {
  const left = LEFT.map((c) => skills.find((s) => s.category === c)).filter((g): g is SkillGroup => !!g);
  const right = skills.filter((s) => !LEFT.includes(s.category));
  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills" tone="surface">
      <div className="grid gap-6 sm:grid-cols-2">
        <Column name="left" groups={left} />
        <Column name="right" groups={right} equalRows />
      </div>
    </Section>
  );
}
