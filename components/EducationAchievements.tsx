import { education } from "@/content/education";

export default function EducationAchievements() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-6">Education &amp; Achievements</h2>
      <h3 className="font-semibold">{education.degree}</h3>
      <p className="text-brand-muted text-sm">
        {education.institution}, {education.location} · {education.dates}
      </p>
      <ul className="mt-4 space-y-2 list-disc list-inside text-sm sm:text-base">
        {education.achievements.map((a) => (
          <li key={a.title}>{a.title}</li>
        ))}
      </ul>
    </section>
  );
}
