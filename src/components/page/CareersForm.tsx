"use client";

import { useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  arrangementIds,
  careerFileLimits,
  educationIds,
  employmentIds,
  experienceIds,
  graduationYears,
  interestIds,
  localePath,
  regionZones,
  type Locale,
  type SiteContent,
} from "@/content";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { Field, Select } from "./ProjectForm";
import base from "./ProjectForm.module.css";
import styles from "./CareersForm.module.css";

/** The handler on the host (public/api/careers.php); it sends the application to ORVANN's CRM and inbox. */
export const CAREERS_FORM_ACTION = "/api/careers.php";

type Status = "idle" | "sending" | "sent" | "failed";

const noSubscription = () => () => {};
const redirectResult = (): Status => {
  const params = new URLSearchParams(window.location.search);
  return params.has("sent") ? "sent" : params.has("failed") ? "failed" : "idle";
};
const noRedirectResult = (): Status => "idle";

/** The formats each upload takes; careers.php and the CRM check the same, by content too. */
const fileTypes = { cv: [".pdf", ".doc", ".docx"], portfolio: [".pdf"] } as const;

type Props = {
  locale: Locale;
  copy: SiteContent["pages"]["careers"]["form"];
  /** Governorates and countries, named as on the contact form. */
  places: Pick<SiteContent["pages"]["contact"]["form"], "zones" | "regions">;
};

/**
 * Careers & Internships application. Works like the project form: with JavaScript it posts
 * in the background (files included) and reports the result in a live region; without it,
 * the handler redirects back with ?sent=1 or ?failed=1. "website" is the honeypot.
 *
 * Its lists send the CRM's own ids (content/career-options.ts), so each application arrives
 * there already sorted. Analytics records an accepted application as `apply_job`.
 */
export function CareersForm({ locale, copy, places }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setStatus] = useState<Status>("idle");
  const redirected = useSyncExternalStore(noSubscription, redirectResult, noRedirectResult);
  const status = submitted === "idle" ? redirected : submitted;
  const [fileNames, setFileNames] = useState<{ cv?: string; portfolio?: string }>({});
  const years = graduationYears();

  /** Checks a chosen file's size and format at once, before minutes of uploading. */
  const checkFile = (kind: keyof typeof fileTypes) => (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    setFileNames((names) => ({ ...names, [kind]: file?.name }));
    let problem = "";
    if (file) {
      const name = file.name.toLowerCase();
      if (!fileTypes[kind].some((ext) => name.endsWith(ext))) problem = copy.fileType;
      else if (file.size > careerFileLimits[kind] * 1024 * 1024) problem = copy.fileTooLarge.replace("{mb}", String(careerFileLimits[kind]));
    }
    input.setCustomValidity(problem);
    if (problem) input.reportValidity();
  };

  /** At least one work arrangement: the browser has no "required" for a group of checkboxes. */
  const checkArrangements = (form: HTMLFormElement) => {
    const boxes = [...form.querySelectorAll<HTMLInputElement>('input[name="arrangements[]"]')];
    const first = boxes[0];
    first?.setCustomValidity(boxes.some((box) => box.checked) ? "" : copy.arrangementsRequired);
    return first?.checkValidity() ?? true;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!checkArrangements(form)) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch(CAREERS_FORM_ACTION, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = (await response.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      if (!response.ok || !result.ok) throw new Error("Not sent");
      form.reset();
      setFileNames({});
      setStatus("sent");
      trackEvent("apply_job", { form: "careers", interest: String(data.get("interest") ?? ""), language: locale });
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form
      ref={formRef}
      action={CAREERS_FORM_ACTION}
      method="post"
      encType="multipart/form-data"
      className={cn(base.form, styles.form)}
      onSubmit={submit}
      onChange={(event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.name === "arrangements[]") checkArrangements(event.currentTarget);
      }}
    >
      <input type="hidden" name="lang" value={locale} />
      <div className={base.honeypot} aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Group title={copy.groups.personal} step={1}>
        <Field label={copy.name} required>
          <input type="text" name="name" required maxLength={120} autoComplete="name" className={base.input} />
        </Field>
        <div className={base.row}>
          <Field label={copy.phone} required>
            <input type="tel" name="phone" required maxLength={60} autoComplete="tel" dir="ltr" className={base.input} />
          </Field>
          <Field label={copy.email} required>
            <input type="email" name="email" required maxLength={200} autoComplete="email" dir="ltr" className={base.input} />
          </Field>
        </div>
        <div className={base.row}>
          <Field label={copy.region} required>
            <Select name="region" required placeholder={copy.select}>
              {regionZones.map((zone) => (
                <optgroup key={zone.id} label={places.zones[zone.id]}>
                  {zone.regions.map((id) => (
                    <option key={id} value={id}>
                      {places.regions[id]}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </Field>
          <Field label={copy.city}>
            <input type="text" name="city" maxLength={120} autoComplete="address-level2" className={base.input} />
          </Field>
        </div>
      </Group>

      <Group title={copy.groups.background} step={2}>
        <Choices label={copy.education} name="education" type="radio" required options={educationIds.map((id) => [id, copy.educations[id]])} />
        <div className={base.row}>
          <Field label={copy.graduationYear} hint={copy.graduationYearHint} required>
            <Select name="graduation_year" required placeholder={copy.select}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={copy.specialization} hint={copy.specializationHint} required>
            <input type="text" name="specialization" required maxLength={160} className={base.input} />
          </Field>
        </div>
        <div className={base.row}>
          <Field label={copy.experience} required>
            <Select name="experience" required placeholder={copy.select}>
              {experienceIds.map((id) => (
                <option key={id} value={id}>
                  {copy.experiences[id]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={copy.employment} required>
            <Select name="employment" required placeholder={copy.select}>
              {employmentIds.map((id) => (
                <option key={id} value={id}>
                  {copy.employments[id]}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Group>

      <Group title={copy.groups.preferences} step={3}>
        <Choices label={copy.interest} name="interest" type="radio" required options={interestIds.map((id) => [id, copy.interests[id]])} />
        <Choices
          label={copy.arrangements}
          hint={copy.arrangementsHint}
          name="arrangements[]"
          type="checkbox"
          required
          options={arrangementIds.map((id) => [id, copy.arrangementOptions[id]])}
        />
      </Group>

      <Group title={copy.groups.documents} step={4}>
        <Field label={copy.cv} hint={copy.cvHint} required>
          <FileInput
            name="cv"
            required
            accept={fileTypes.cv.join(",")}
            chosen={fileNames.cv}
            onChange={checkFile("cv")}
            choose={copy.chooseFile}
            none={copy.noFile}
          />
        </Field>
        <p className={base.hint}>{copy.portfolioHint}</p>
        <div className={base.row}>
          <Field label={copy.portfolioUrl} hint={copy.optional}>
            <input type="url" name="portfolio_url" maxLength={300} dir="ltr" placeholder="https://" className={base.input} />
          </Field>
          <Field label={copy.portfolioFile} hint={copy.optional}>
            <FileInput
              name="portfolio"
              accept={fileTypes.portfolio.join(",")}
              chosen={fileNames.portfolio}
              onChange={checkFile("portfolio")}
              choose={copy.chooseFile}
              none={copy.noFile}
            />
          </Field>
        </div>
        <Field label={copy.linkedin} hint={copy.optional}>
          <input
            type="url"
            name="linkedin"
            maxLength={300}
            dir="ltr"
            placeholder="https://www.linkedin.com/in/…"
            className={base.input}
          />
        </Field>
      </Group>

      <div className={base.footer}>
        <p className={styles.consent}>
          {copy.consent.before}
          <Link href={localePath(locale, site.privacyPolicyUrl)}>{copy.consent.link}</Link>
          {copy.consent.after}
        </p>
        <button type="submit" className={base.submit} disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </button>
        <p className={base.status} role="status" aria-live="polite" data-status={status}>
          {status === "sent" ? copy.sent : status === "failed" ? copy.failed : ""}
        </p>
      </div>
    </form>
  );
}

/** One numbered part of the form. */
function Group({ title, step, children }: { title: string; step: number; children: ReactNode }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>
        <span className={styles.step} aria-hidden="true">
          {String(step).padStart(2, "0")}
        </span>
        {title}
      </legend>
      <div className={styles.fields}>{children}</div>
    </fieldset>
  );
}

/** A short list as pills: radios (one) or checkboxes (several). */
function Choices({
  label,
  hint,
  name,
  type,
  required,
  options,
}: {
  label: string;
  hint?: string;
  name: string;
  type: "radio" | "checkbox";
  required?: boolean;
  options: [value: string, label: string][];
}) {
  return (
    <fieldset className={base.choices}>
      <legend className={base.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </legend>
      {hint && <span className={base.hint}>{hint}</span>}
      <div className={base.options}>
        {options.map(([value, text]) => (
          <label key={value} className={base.option}>
            {/* Checkboxes are checked as a group on submit; a radio group can use the browser's own "required". */}
            <input type={type} name={name} value={value} required={required && type === "radio"} className={base.radio} />
            <span>{text}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** A file field that shows the chosen file's name, styled like the other inputs. */
function FileInput({
  chosen,
  choose,
  none,
  ...props
}: {
  name: string;
  required?: boolean;
  accept: string;
  chosen?: string;
  choose: string;
  none: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <span className={cn(base.input, styles.file)} data-chosen={chosen ? "" : undefined}>
      <input type="file" className={styles.fileInput} {...props} />
      <span className={styles.fileButton} aria-hidden="true">
        {choose}
      </span>
      <span className={styles.fileName} aria-hidden="true">
        {chosen ?? none}
      </span>
    </span>
  );
}
