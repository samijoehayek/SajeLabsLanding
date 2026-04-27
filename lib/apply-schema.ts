import { z } from "zod";

// RWA-first qualification fields. The asset value + jurisdiction + budget triple
// pre-qualifies leads — a $5M asset owner shouldn't be entering a $60K
// tokenization conversation. Keep these in sync with components/sections/apply.tsx.

export const ASSET_TYPES = [
  "Real estate",
  "Private credit",
  "Commodities",
  "Fund",
  "Other",
  "Not RWA — general blockchain dev",
] as const;

export const ASSET_VALUES = [
  "<$5M",
  "$5M-$50M",
  "$50M-$500M",
  "$500M+",
  "Not applicable",
] as const;

export const JURISDICTIONS = [
  "UAE",
  "KSA",
  "Qatar",
  "Other GCC",
  "Switzerland",
  "Singapore",
  "Other",
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

export const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email"),
  whatsapp: z
    .string()
    .trim()
    .min(6, "Include country code")
    .max(32, "Too long")
    .regex(/^\+?[\d\s().-]+$/, "Digits, spaces, and + only"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  assetType: z.enum(ASSET_TYPES),
  assetValue: z.enum(ASSET_VALUES),
  jurisdiction: z.enum(JURISDICTIONS),
  stage: z.enum(STAGES),
  timeline: z.enum(TIMELINES),
  budget: z.enum(BUDGETS),
  description: z.string().trim().min(20, "Tell us a bit more").max(500),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ApplyInput = z.infer<typeof applySchema>;
