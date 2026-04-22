import { z } from "zod";

export const STAGES = [
  "Idea",
  "Whitepaper",
  "Prototype",
  "Raising",
  "Post-raise",
  "Live product",
] as const;

export const CHAINS = [
  "Ethereum",
  "Bitcoin",
  "Polygon",
  "Arbitrum",
  "Base",
  "Solana",
  "Not sure yet",
] as const;

export const BUDGETS = [
  "<$10k",
  "$10-25k",
  "$25-50k",
  "$50k+",
  "Retainer only",
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
  stage: z.enum(STAGES),
  chain: z.enum(CHAINS),
  budget: z.enum(BUDGETS),
  timeline: z.enum(TIMELINES),
  description: z.string().trim().min(20, "Tell us a bit more").max(500),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ApplyInput = z.infer<typeof applySchema>;
