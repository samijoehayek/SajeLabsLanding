"use client";

import * as React from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import { wagmiConfig } from "@/lib/wagmi";

import "@rainbow-me/rainbowkit/styles.css";

function RainbowSkin({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const theme =
    resolvedTheme === "light"
      ? lightTheme({
          accentColor: "hsl(32, 95%, 52%)",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
        })
      : darkTheme({
          accentColor: "hsl(32, 100%, 58%)",
          accentColorForeground: "hsl(220, 20%, 4%)",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        });
  return (
    <RainbowKitProvider theme={theme} modalSize="compact">
      {children}
    </RainbowKitProvider>
  );
}

export function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowSkin>{children}</RainbowSkin>
    </WagmiProvider>
  );
}
