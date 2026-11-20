import Section from "./Section";

const LINK =
  "inline-flex items-center rounded-md border border-brand-accent bg-brand-surface px-5 py-2.5 font-medium text-brand-accent hover:bg-brand-accent hover:text-white transition";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Get in touch" title="Let's talk" tone="accent">
      <p className="max-w-2xl text-base sm:text-lg text-brand-muted">
        Open to conversations about real-time systems, engineering leadership, and automation.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <a href="mailto:avstyles1999@gmail.com" className={LINK}>
          Email
        </a>
        <a href="https://linkedin.com/in/anmol-verma-966955170" className={LINK}>
          LinkedIn
        </a>
        <a href="https://github.com/avstyles1999" className={LINK}>
          GitHub
        </a>
      </div>
    </Section>
  );
}
