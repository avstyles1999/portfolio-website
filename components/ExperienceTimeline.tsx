import { experience } from "@/content/experience";
import Section from "./Section";

export default function ExperienceTimeline() {
  return (
    <Section id="experience" eyebrow="Where I've worked" title="Experience">
      <ol className="relative space-y-12 border-l-2 border-brand-border pl-8">
        {experience.map((entry) => (
          <li key={`${entry.company}-${entry.title}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-brand-bg bg-brand-accent"
            />
            <h3 className="font-semibold text-lg">{entry.title}</h3>
            <p className="mt-0.5 text-sm text-brand-muted">
              <span className="font-medium text-brand-accentDark">{entry.company}</span> · {entry.dates}
            </p>
            <ul className="mt-3 space-y-2 text-sm sm:text-base leading-relaxed">
              {entry.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-muted" />
                  <span className="sm:text-justify">{h}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
