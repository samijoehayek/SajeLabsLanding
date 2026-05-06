import { z } from "zod";
import { COUNTRY_CODE_VALUES } from "./country-codes";

// Lightweight qualification fields. The budget bracket pre-qualifies leads —
// a $5M asset owner shouldn't be entering a $60K tokenization conversation.
// Keep these in sync with components/sections/apply.tsx.

export const ASSET_TYPES = [
  "Real estate",
  "Private credit",
  "Commodities",
  "Fund",
  "Other",
  "Not RWA — general blockchain dev",
] as const;

export const STAGES = [
  "Concept",
  "Legal structuring",
  "Ready to build",
  "Already engaged another firm",
] as const;

export const BUDGETS = [
  "$60K-$95K",
  "$95K-$150K",
  "$150K+",
  "Not RWA — different budget",
] as const;

export const TIMELINES = ["ASAP", "1 month", "2-3 months", "Flexible"] as const;

// Shared fields used by both the form and the API.
const baseFields = {
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  assetType: z.enum(ASSET_TYPES),
  stage: z.enum(STAGES),
  timeline: z.enum(TIMELINES),
  budget: z.enum(BUDGETS),
  description: z.string().trim().min(20, "Tell us a bit more").max(500),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
};

// FORM-SIDE schema. The WhatsApp input is split visually into:
//   - countryCode: a Select populated from lib/country-codes.ts
//   - whatsapp:    digits + spaces only (the local number)
// On submit the form combines them into a single international string and
// posts that as `whatsapp` to /api/apply, which validates against applySchema.
export const applyFormSchema = z.object({
  ...baseFields,
  countryCode: z
    .string()
    .refine((v) => COUNTRY_CODE_VALUES.includes(v), {
      message: "Pick a country code",
    }),
  whatsapp: z
    .string()
    .trim()
    .min(4, "Enter your number")
    .max(20, "Too long")
    .regex(
      /^[\d\s().-]+$/,
      "Digits and spaces only — country code is selected separately",
    ),
});

// API-SIDE schema. The whatsapp field arrives already-combined as a single
// international-format string (e.g. "+971 50 123 4567").
export const applySchema = z.object({
  ...baseFields,
  whatsapp: z
    .string()
    .trim()
    .min(8, "Include country code (e.g. +971)")
    .max(40, "Too long")
    .regex(
      /^\+\d[\d\s().-]*$/,
      "Must start with country code (e.g. +971)",
    ),
});

export type ApplyFormInput = z.infer<typeof applyFormSchema>;
export type ApplyInput = z.infer<typeof applySchema>;
