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
export const arrangementIds = ["full-time", "part-time", "remote"] as const;

/** A current student's year of study, first to sixth. */
export const studyYearIds = ["1", "2", "3", "4", "5", "6"] as const;

/**
 * Graduates' graduation years, newest first: this year back far enough for experienced
 * applicants. Fixed when the site is built.
 */
export function graduationYears(thisYear = new Date().getFullYear()): number[] {
  return Array.from({ length: 37 }, (_, index) => thisYear - index);
}

/** Upload limits, in MB; careers.php and the CRM hold the same ones. */
export const careerFileLimits = { cv: 5, portfolio: 10 } as const;

export type EducationId = (typeof educationIds)[number];
export type ExperienceId = (typeof experienceIds)[number];
export type EmploymentId = (typeof employmentIds)[number];
export type InterestId = (typeof interestIds)[number];
export type StudyYearId = (typeof studyYearIds)[number];
export type ArrangementId = (typeof arrangementIds)[number];
