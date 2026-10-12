"use client";

import { useState, useSyncExternalStore, type ComponentProps, type FormEvent, type ReactNode } from "react";
import {
  budgetIds,
  jobTitleIds,
  regionZones,
  serviceIds,
  timelineIds,
  type Locale,
  type ServiceId,
  type SiteContent,
} from "@/content";
import { cn } from "@/lib/cn";
import styles from "./ProjectForm.module.css";

/** The handler on the host (public/api/project.php); it sends the details to ORVANN's CRM and inbox. */
export const PROJECT_FORM_ACTION = "/api/project.php";

type Status = "idle" | "sending" | "sent" | "failed";

/** The result of a submission made without JavaScript, from the handler's redirect (?sent=1). */
const noSubscription = () => () => {};
const redirectResult = (): Status => {
  const params = new URLSearchParams(window.location.search);
  return params.has("sent") ? "sent" : params.has("failed") ? "failed" : "idle";
};
const noRedirectResult = (): Status => "idle";

type Props = {
  locale: Locale;
  copy: SiteContent["pages"]["contact"]["form"];
  serviceNames: Record<ServiceId, string>;
};

/**
 * Start a Project. With JavaScript it posts in the background and reports the result in a
 * live region; without it, the handler redirects back here with ?sent=1 or ?failed=1. The
 * "website" field is a honeypot: hidden from people, filled in by bots, and ignored.
 *
 * The fields are the CRM's: its lists (job title, region, timeline, budget) send the CRM's
 * own ids (content/lead-options.ts), so each lead arrives there already sorted.
 */
export function ProjectForm({ locale, copy, serviceNames }: Props) {
  const [submitted, setStatus] = useState<Status>("idle");
  const redirected = useSyncExternalStore(noSubscription, redirectResult, noRedirectResult);
  const status = submitted === "idle" ? redirected : submitted;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(PROJECT_FORM_ACTION, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = (await response.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      if (!response.ok || !result.ok) throw new Error("Not sent");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const needs: { value: string; label: string }[] = [
    ...serviceIds.map((id) => ({ value: id, label: serviceNames[id] })),
    { value: "multiple", label: copy.multiple },
    { value: "unsure", label: copy.unsure },
  ];

  return (
    <form action={PROJECT_FORM_ACTION} method="post" className={styles.form} onSubmit={submit}>
      <input type="hidden" name="lang" value={locale} />
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.row}>
        <Field label={copy.name} required>
          <input type="text" name="name" required maxLength={120} autoComplete="name" className={styles.input} />
        </Field>
        <Field label={copy.jobTitle} required>
          <Select name="job_title" required placeholder={copy.select}>
            {jobTitleIds.map((id) => (
              <option key={id} value={id}>
                {copy.jobTitles[id]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label={copy.company}>
        <input type="text" name="company" maxLength={160} autoComplete="organization" className={styles.input} />
      </Field>

      <div className={styles.row}>
        <Field label={copy.email} required>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            dir="ltr"
            className={styles.input}
          />
        </Field>
        <Field label={copy.phone} required>
          <input
            type="tel"
            name="phone"
            required
            maxLength={60}
            autoComplete="tel"
            dir="ltr"
            className={styles.input}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label={copy.region} required>
          <Select name="region" required placeholder={copy.select}>
            {regionZones.map((zone) => (
              <optgroup key={zone.id} label={copy.zones[zone.id]}>
                {zone.regions.map((id) => (
                  <option key={id} value={id}>
                    {copy.regions[id]}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </Field>
        <Field label={copy.city}>
          <input type="text" name="city" maxLength={120} autoComplete="address-level2" className={styles.input} />
        </Field>
      </div>

      <fieldset className={styles.choices}>
        <legend className={styles.label}>
          {copy.need}
          <span aria-hidden="true"> *</span>
        </legend>
        <div className={styles.options}>
          {needs.map((need) => (
            <label key={need.value} className={styles.option}>
              <input type="radio" name="need" value={need.value} required className={styles.radio} />
              <span>{need.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label={copy.goal} hint={copy.goalHint} required>
        <textarea name="goal" required rows={5} maxLength={4000} className={cn(styles.input, styles.textarea)} />
      </Field>

      <div className={styles.row}>
        <Field label={copy.start}>
          <Select name="timeline" placeholder={copy.select}>
            {timelineIds.map((id) => (
              <option key={id} value={id}>
                {copy.timelines[id]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={copy.budget} hint={copy.optional}>
          <Select name="budget" placeholder={copy.select}>
            {budgetIds.map((id) => (
              <option key={id} value={id}>
                {copy.budgets[id]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className={styles.footer}>
        <button type="submit" className={styles.submit} disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </button>
        <p className={styles.status} role="status" aria-live="polite" data-status={status}>
          {status === "sent" ? copy.sent : status === "failed" ? copy.failed : ""}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {hint && <span className={styles.hint}>{hint}</span>}
      {children}
    </label>
  );
}

/** A list that starts on an empty line, so nothing is chosen for the visitor. */
function Select({ placeholder, children, ...props }: ComponentProps<"select"> & { placeholder: string }) {
  return (
    <span className={styles.select}>
      <select defaultValue="" className={styles.input} {...props}>
        <option value="">{placeholder}</option>
        {children}
      </select>
    </span>
  );
}
