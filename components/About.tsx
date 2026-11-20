import Section from "./Section";

export default function About() {
  return (
    <Section id="about" eyebrow="Who I am" title="About" tone="surface">
      <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-brand-text">
        I&apos;m a software engineer with 5+ years of experience delivering real-time, safety-critical systems
        across transportation and fintech — currently leading backend development for a Personalized Rapid
        Transit platform and building AI-driven finance automation. I care about systems that have to be right
        the first time, and about building the teams and processes that make that possible. Outside of work, I
        follow financial markets closely — studying chart patterns and company fundamentals for fun — and
        I&apos;m a die-hard cricket and football fan.
      </p>
    </Section>
  );
}
