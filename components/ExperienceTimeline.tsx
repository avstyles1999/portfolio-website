import { experience } from "@/content/experience";

export default function ExperienceTimeline() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-8">Experience</h2>
      <div className="space-y-10 border-l border-brand-border pl-6">
        {experience.map((entry) => (
          <div key={`${entry.company}-${entry.title}`}>
            <h3 className="font-semibold text-lg">{entry.title}</h3>
            <p className="text-brand-muted text-sm">
              <span>{entry.company}</span> · {entry.dates}
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm sm:text-base">
              {entry.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
