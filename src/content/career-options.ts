/**
 * The lists the Careers & Internships form shares with ORVANN's CRM. As with the project
 * form (./lead-options.ts), the ids are the CRM's own ('applications' in its
 * app/config.php) and are what the form sends. A list changed in the CRM must change here,
 * in each language's names (careers.form in en-pages.ts / ar-pages.ts) and in
 * public/api/careers.php, which names each id in the email. Residence uses the CRM's
 * governorates and countries (regionZones in ./lead-options.ts).
 */

export const educationIds = ["student", "graduate"] as const;

export const experienceIds = ["none", "lt-1", "1-3", "3-5", "5-plus"] as const;

/** متفرغ / ملتزم بعمل آخر / freelance */
export const employmentIds = ["available", "employed", "freelance"] as const;

/** A job or an internship. */
export const interestIds = ["job", "internship"] as const;

/** Several may be ticked. */
export const arrangementIds = ["full-time", "part-time", "on-site", "remote"] as const;

/**
 * Graduation years, newest first: a few years ahead for students' expected year, then
 * back far enough for experienced applicants. Fixed when the site is built.
 */
export function graduationYears(thisYear = new Date().getFullYear()): number[] {
  const first = thisYear + 6;
  return Array.from({ length: 6 + 36 }, (_, index) => first - index);
}

/** Upload limits, in MB; careers.php and the CRM hold the same ones. */
export const careerFileLimits = { cv: 5, portfolio: 10 } as const;

export type EducationId = (typeof educationIds)[number];
export type ExperienceId = (typeof experienceIds)[number];
export type EmploymentId = (typeof employmentIds)[number];
export type InterestId = (typeof interestIds)[number];
export type ArrangementId = (typeof arrangementIds)[number];
