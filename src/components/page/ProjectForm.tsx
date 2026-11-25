"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  budgetIds,
  jobTitleIds,
  regionZones,
  timelineIds,
  topicIds,
  type Locale,
  type SiteContent,
} from "@/content";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { SentDialog } from "./SentDialog";
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
};

/**
 * The contact form (a free discovery session). With JavaScript it posts in the background and reports the result in a
 * live region; without it, the handler redirects back here with ?sent=1 or ?failed=1. The
 * "website" field is a honeypot: hidden from people, filled in by bots, and ignored.
 *
 * Only the name, email and need are required. The lists (topic, then the optional job title,
 * region, timeline and budget) send the CRM's own ids (content/lead-options.ts), so each lead
 * arrives there already sorted. A solution page's link (?need=<topic>) chooses that topic. Analytics records a form the
 * handler accepted as generate_lead: a click on the button alone is not a lead.
 */
export function ProjectForm({ locale, copy }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setStatus] = useState<Status>("idle");
  const redirected = useSyncExternalStore(noSubscription, redirectResult, noRedirectResult);
  const status = submitted === "idle" ? redirected : submitted;
  // The thank-you pop-up stays open until it is closed; a new submission can open it again.
  const [dismissed, setDismissed] = useState(false);
  const closeSent = () => {
    setDismissed(true);
    setStatus("idle");
    // Without JavaScript the handler came back with ?sent=1; drop it so a reload does not reopen.
    if (window.location.search) window.history.replaceState(null, "", window.location.pathname + window.location.hash);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setDismissed(false);
    setStatus("sending");
    try {
      const response = await fetch(PROJECT_FORM_ACTION, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = (await response.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      if (!response.ok || !result.ok) throw new Error("Not sent");
      form.reset();
      setStatus("sent");
      trackEvent("generate_lead", { form: "start_project", service: String(data.get("need") || "unsure"), language: locale });
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form ref={formRef} action={PROJECT_FORM_ACTION} method="post" className={styles.form} onSubmit={submit}>
      <Suspense fallback={null}>
        <NeedFromLink form={formRef} values={[...topicIds]} />
      </Suspense>
      <input type="hidden" name="lang" value={locale} />
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.row}>
        <Field label={copy.name} required>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            className={styles.input}
          />
        </Field>
        <Field label={copy.company}>
          <input
            type="text"
            name="company"
            maxLength={160}
            autoComplete="organization"
            placeholder={copy.companyPlaceholder}
            className={styles.input}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label={copy.email} required>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            dir="ltr"
            placeholder={copy.emailPlaceholder}
            className={styles.input}
          />
        </Field>
        <Field label={copy.phone}>
          <input
            type="tel"
            name="phone"
            maxLength={60}
            autoComplete="tel"
            dir="ltr"
            placeholder={copy.phonePlaceholder}
            className={styles.input}
          />
        </Field>
      </div>

      <Field label={copy.topic}>
        <Select name="need" placeholder={copy.topicPlaceholder}>
          {topicIds.map((id) => (
            <option key={id} value={id}>
              {copy.topics[id]}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={copy.need} required>
        <textarea
          name="goal"
          required
          rows={5}
          maxLength={4000}
          placeholder={copy.needPlaceholder}
          className={cn(styles.input, styles.textarea)}
        />
      </Field>

      {/* What the CRM sorts leads by: optional, so they never stand between a visitor and the button. */}
      <fieldset className={styles.choices}>
        <legend className={styles.label}>{copy.more}</legend>
        <div className={styles.more}>
          <div className={styles.row}>
            <Field label={copy.jobTitle}>
              <Select name="job_title" placeholder={copy.select}>
                {jobTitleIds.map((id) => (
                  <option key={id} value={id}>
                    {copy.jobTitles[id]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={copy.region}>
              <Select name="region" placeholder={copy.select}>
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
          </div>
          <div className={styles.row}>
            <Field label={copy.city}>
              <input type="text" name="city" maxLength={120} autoComplete="address-level2" className={styles.input} />
            </Field>
            <Field label={copy.start}>
              <Select name="timeline" placeholder={copy.select}>
                {timelineIds.map((id) => (
                  <option key={id} value={id}>
                    {copy.timelines[id]}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label={copy.budget}>
            <Select name="budget" placeholder={copy.select}>
              {budgetIds.map((id) => (
                <option key={id} value={id}>
                  {copy.budgets[id]}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </fieldset>

      <div className={styles.footer}>
        <button type="submit" className={styles.submit} disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </button>
        <p className={styles.note}>{copy.note}</p>
        <p className={styles.status} role="status" aria-live="polite" data-status={status}>
          {status === "failed" ? copy.failed : ""}
        </p>
        <SentDialog open={status === "sent" && !dismissed} title={copy.sentTitle} message={copy.sent} close={copy.close} onClose={closeSent} />
      </div>
    </form>
  );
}

/** Chooses the topic named in the link that opened the form (?need=strategy), if it is one. */
function NeedFromLink({ form, values }: { form: RefObject<HTMLFormElement | null>; values: string[] }) {
  const need = useSearchParams().get("need");
  const known = need !== null && values.includes(need) ? need : null;
  useEffect(() => {
    if (!known) return;
    const select = form.current?.querySelector<HTMLSelectElement>('select[name="need"]');
    if (select) select.value = known;
  }, [form, known]);
  return null;
}

export function Field({
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
export function Select({ placeholder, children, ...props }: ComponentProps<"select"> & { placeholder: string }) {
  return (
    <span className={styles.select}>
      <select defaultValue="" className={styles.input} {...props}>
        <option value="">{placeholder}</option>
        {children}
      </select>
    </span>
  );
}
