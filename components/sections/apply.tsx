"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, Twitter } from "lucide-react";
import { Section, SectionEyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  applySchema,
  ASSET_TYPES,
  ASSET_VALUES,
  JURISDICTIONS,
  STAGES,
  BUDGETS,
  TIMELINES,
  type ApplyInput,
} from "@/lib/apply-schema";
import { trackLead } from "@/lib/analytics";
import { apply } from "@/content/site";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const MAX_DESC = 500;

// Budget bracket → numeric Lead value sent to Meta (browser Pixel + server CAPI).
// Drives ad-side ROAS reporting; not displayed anywhere on the page.
const BUDGET_TO_VALUE: Record<string, number> = {
  "$60K-$95K": 60000,
  "$95K-$150K": 95000,
  "$150K+": 150000,
  "Not RWA — different budget": 30000,
};
const DEFAULT_LEAD_VALUE = 60000;

export function Apply() {
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      company: "",
      description: "",
      website: "",
    },
  });

  const descLen = watch("description")?.length ?? 0;

  const onSubmit = async (values: ApplyInput) => {
    setServerError(null);
    // Same eventId travels to both the browser Pixel (4th-arg event_options)
    // and the server CAPI call (event_id) so Meta deduplicates the two Lead
    // events into a single conversion.
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const leadValue = BUDGET_TO_VALUE[values.budget] ?? DEFAULT_LEAD_VALUE;
    // eslint-disable-next-line no-console
    console.log("[apply form] eventId:", eventId, "value:", leadValue);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, eventId, value: leadValue }),
      });
      if (!res.ok && res.status !== 202) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setServerError(body.error ?? "Something went wrong. Email us directly.");
        return;
      }
      trackLead({
        email: values.email,
        budget: values.budget,
        value: leadValue,
        currency: "USD",
        contentCategory: "RWA tokenization",
        contentName: values.assetType,
        eventID: eventId,
      });
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please try again or email us directly.");
    }
  };

  return (
    <Section id="apply" bordered>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        {/* Left — closer */}
        <div>
          <SectionEyebrow>{apply.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-display-lg text-balance text-foreground">
            {apply.headline}
          </h2>
          <p className="mt-5 text-base text-muted-foreground text-pretty">{apply.body}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card/60 p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Starting at
              </dt>
              <dd className="mt-1 font-mono text-lg text-foreground">
                ${siteConfig.offer.headlinePrice.toLocaleString()}
              </dd>
            </div>
            <div className="rounded-lg border border-border bg-card/60 p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Delivery
              </dt>
              <dd className="mt-1 font-mono text-lg text-foreground">
                {siteConfig.offer.duration}
              </dd>
            </div>
            <div className="col-span-2 rounded-lg border border-border bg-card/60 p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Reply time
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                Within 48 hours — usually on WhatsApp.
              </dd>
            </div>
          </dl>
        </div>

        {/* Right — form or success */}
        <div>
          {submitted ? (
            <div className="rounded-xl border border-border bg-card p-8 md:p-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-semibold text-foreground">
                  {apply.successHeadline}
                </h3>
              </div>
              <p className="mt-4 text-base text-muted-foreground text-pretty">
                {apply.successBody}
              </p>
              <div className="mt-8 rounded-lg border border-border/70 bg-background/60 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  While you wait
                </p>
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
                >
                  <Twitter className="h-4 w-4" />
                  Follow {siteConfig.socials.twitterHandle}
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl border border-border bg-card p-6 md:p-8"
              noValidate
            >
              {/* Honeypot */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label>
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="name" error={errors.name?.message}>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Samijoe Hayek"
                    {...register("name")}
                  />
                </Field>
                <Field label="Email" htmlFor="email" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    {...register("email")}
                  />
                </Field>
                <Field label="WhatsApp (with country code)" htmlFor="whatsapp" error={errors.whatsapp?.message}>
                  <Input
                    id="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+971 …"
                    {...register("whatsapp")}
                  />
                </Field>
                <Field label="Company / project" htmlFor="company" error={errors.company?.message}>
                  <Input
                    id="company"
                    autoComplete="organization"
                    placeholder="Optional"
                    {...register("company")}
                  />
                </Field>

                <Field
                  label="Asset type to tokenize"
                  htmlFor="assetType"
                  error={errors.assetType?.message}
                >
                  <Controller
                    control={control}
                    name="assetType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="assetType">
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                        <SelectContent>
                          {ASSET_TYPES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field
                  label="Asset value range"
                  htmlFor="assetValue"
                  error={errors.assetValue?.message}
                >
                  <Controller
                    control={control}
                    name="assetValue"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="assetValue">
                          <SelectValue placeholder="Select asset value" />
                        </SelectTrigger>
                        <SelectContent>
                          {ASSET_VALUES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field
                  label="Jurisdiction"
                  htmlFor="jurisdiction"
                  error={errors.jurisdiction?.message}
                >
                  <Controller
                    control={control}
                    name="jurisdiction"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="jurisdiction">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          {JURISDICTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field label="Project stage" htmlFor="stage" error={errors.stage?.message}>
                  <Controller
                    control={control}
                    name="stage"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="stage">
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {STAGES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field label="Timeline" htmlFor="timeline" error={errors.timeline?.message}>
                  <Controller
                    control={control}
                    name="timeline"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="timeline">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIMELINES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field label="Budget bracket" htmlFor="budget" error={errors.budget?.message}>
                  <Controller
                    control={control}
                    name="budget"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUDGETS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label={`Brief project description (${descLen}/${MAX_DESC})`}
                    htmlFor="description"
                    error={errors.description?.message}
                  >
                    <Textarea
                      id="description"
                      rows={5}
                      maxLength={MAX_DESC}
                      placeholder="What's the asset, what jurisdiction is it sitting in, and what outcome do you care about?"
                      {...register("description")}
                    />
                  </Field>
                </div>
              </div>

              {serverError && (
                <p className="mt-5 text-sm text-destructive">{serverError}</p>
              )}

              <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  By applying you agree we may follow up by email or WhatsApp. We never share your details.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || (!isValid && Object.keys(errors).length > 0)}
                  className={cn(isSubmitting && "opacity-70")}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send application
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-[12px] text-destructive">{error}</p>}
    </div>
  );
}
