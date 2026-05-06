// Country dial codes for the WhatsApp field. GCC first (the primary buyer
// market), then secondary studio markets, then a curated global list.
// Add more as needed; keep the list short enough that the Select scrolls
// reasonably without a search input.

export type CountryCode = {
  code: string;     // e.g. "+971"
  country: string;  // short label, e.g. "UAE"
  flag: string;     // emoji
};

export const COUNTRY_CODES: readonly CountryCode[] = [
  // GCC — primary
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },

  // Studio's secondary markets
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },

  // Levant / wider MENA
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },

  // Western Europe
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },

  // North America
  { code: "+1", country: "USA / Canada", flag: "🇺🇸" },

  // Asia
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },

  // Oceania
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },

  // Africa beyond ZA
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },

  // LatAm
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
];

export const DEFAULT_COUNTRY_CODE = "+971";

// Set of allowed dial-code strings for Zod enum-like validation.
export const COUNTRY_CODE_VALUES: readonly string[] = COUNTRY_CODES.map(
  (c) => c.code,
);
