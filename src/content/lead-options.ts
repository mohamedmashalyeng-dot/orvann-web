/**
 * The lists the Start a Project form shares with ORVANN's CRM. The ids are the CRM's own
 * (config.js there) and are what the form sends, so the CRM can sort each lead by job
 * title, region, timeline and budget. A list changed in the CRM must change here, in each
 * language's names (contact.form in en-pages.ts / ar-pages.ts) and in
 * public/api/project.php, which names each id in the email.
 */

export const jobTitleIds = [
  "owner",
  "ceo",
  "marketing-head",
  "manager",
  "employee",
  "freelancer",
  "student",
  "other",
] as const;

/** Governorates and countries, grouped as the CRM groups them into zones. */
export const regionZones = [
  { id: "greater-cairo", regions: ["cairo", "giza", "qalyubia"] },
  { id: "alexandria-coast", regions: ["alexandria", "beheira", "matrouh"] },
  { id: "delta", regions: ["sharqia", "dakahlia", "gharbia", "monufia", "kafr-el-sheikh", "damietta"] },
  { id: "canal-sinai", regions: ["port-said", "ismailia", "suez", "north-sinai", "south-sinai"] },
  { id: "north-upper-egypt", regions: ["fayoum", "beni-suef", "minya"] },
  { id: "south-upper-egypt", regions: ["assiut", "sohag", "qena", "luxor", "aswan"] },
  { id: "red-sea-new-valley", regions: ["red-sea", "new-valley"] },
  { id: "gulf", regions: ["saudi", "uae", "kuwait", "qatar", "bahrain", "oman"] },
  { id: "other-countries", regions: ["other-country"] },
] as const;

export const timelineIds = ["asap", "month", "quarter", "exploring"] as const;

export const budgetIds = ["lt-10k", "10k-50k", "50k-200k", "gt-200k", "unknown"] as const;

export type JobTitleId = (typeof jobTitleIds)[number];
export type RegionZoneId = (typeof regionZones)[number]["id"];
export type RegionId = (typeof regionZones)[number]["regions"][number];
export type TimelineId = (typeof timelineIds)[number];
export type BudgetId = (typeof budgetIds)[number];
