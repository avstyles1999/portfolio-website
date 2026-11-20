import { skills } from "@/content/skills";

export default function Skills() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-8">Skills</h2>
      <div className="space-y-6">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="font-semibold text-sm text-brand-muted uppercase tracking-wide">{group.category}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="text-sm rounded-full border border-brand-border px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
