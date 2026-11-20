# Review follow-ups (deferred minor findings)

These came from the final whole-branch code review on 2026-11-20 (commits 0d166e4..159ad0f). They were rated minor and left for later. The four important fixes (trailing-slash URLs, case-study header contrast, homepage Open Graph tags, routing-engine metric wording) were made in the same session.

Tick each item when it is fixed.

- [ ] **1. `npm run start` does not work.** `package.json` maps `start` to `next start`, which refuses to run with `output: "export"`. Replace it with a static server for `out/` (for example `npx serve out`), or remove the script.
- [ ] **2. There is no README.** Document the commands (`dev`, `test`, `lint`, `build`), that the site is a static export in `out/`, where content lives (`content/*.ts`), and how to replace `public/resume.pdf`.
- [ ] **3. Six identical "Read case study →" link names** (`components/ProjectCard.tsx`). A screen reader's list of links shows six links with the same name. Add `<span className="sr-only"> about {project.title}</span>` inside the link, or an `aria-label`.
- [ ] **4. Mismatched card labels** (`components/EducationAchievements.tsx`). The "Education" label is a `<p>` but "Achievements" is an `<h3>`, so the heading outline is uneven. Make both `<h3>`, or neither.
- [ ] **5. No `<article>` element.** The spec's semantic-HTML list includes `<article>`. Wrap the case-study body in `app/projects/[slug]/page.tsx` in one.
- [ ] **6. Weak case-study test** (`app/projects/__tests__/slug.test.tsx`). It only checks section headings and the title, not that the overview text or `project.impact` items render. Also, `getByText(/Impact/i)` will break if any prose mentions "impact". Assert the impact items and use `getByRole("heading", { name: "Impact" })`.
- [ ] **7. Footer year is fixed at build time** (`components/Footer.tsx`). `new Date().getFullYear()` runs during the build, so the © year only updates when the site is rebuilt. Acceptable as is. Either rebuild yearly or hard-code the year.
- [ ] **8. No skip link.** With a sticky header, a "Skip to content" link as the first focusable element helps keyboard users. Add it to `app/layout.tsx`, targeting `<main id="main">`.
- [ ] **9. Plan Step 4 can't work as written** (`docs/superpowers/plans/2026-11-19-portfolio-website.md`, Task 8). It says to run `npm run start`, which fails with a static export. It should say to serve `out/` instead. Fix together with item 1.
- [ ] **10. Hero subtitle contrast is borderline** (`components/Hero.tsx`). It uses `text-brand-muted` over the same green gradient as the case-study header. The reviewer judged it far enough into the fade to pass, but it wasn't measured. Check it, and switch to `text-gray-600` if it is below 4.5:1.
