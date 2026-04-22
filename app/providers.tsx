"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// wagmi + rainbowkit poke at browser-only APIs (indexedDB, localStorage) even
// during server render. Load them client-side only to keep static generation
// clean and LCP fast.
const WalletProviders = dynamic(
  () => import("@/components/wallet-providers").then((m) => m.WalletProviders),
  { ssr: false, loading: () => null },
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, staleTime: 60_000 },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <WalletProviders>{children}</WalletProviders>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
