import Link from "next/link";
import { CONTAINER } from "./Section";

const NAV_LINK = "text-brand-muted hover:text-brand-accent transition-colors";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-brand-border bg-brand-bg/80 backdrop-blur">
      <div className={`${CONTAINER} flex h-full items-center justify-between`}>
        <Link href="/" className="font-semibold tracking-tight hover:text-brand-accent transition-colors">
          Anmol Verma
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/#projects" className={NAV_LINK}>
            Projects
          </Link>
          <Link href="/resume.pdf" className={NAV_LINK}>
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
