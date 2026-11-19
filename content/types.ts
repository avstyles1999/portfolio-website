export interface ExperienceEntry {
  title: string;
  company: string;
  dates: string;
  highlights: string[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  dates: string;
  location: string;
  achievements: Achievement[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  techStack: string[];
  standoutMetric: string;
  overview: string;
  problem: string;
  approach: string;
  impact: string[];
  order: number;
}
