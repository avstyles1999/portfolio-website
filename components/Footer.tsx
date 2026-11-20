import { CONTAINER } from "./Section";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border py-8 text-sm text-brand-muted">
      <div className={`${CONTAINER} text-center`}>© {new Date().getFullYear()} Anmol Verma</div>
    </footer>
  );
}
