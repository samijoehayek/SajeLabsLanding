"use client";

import * as React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Reserve space so layout doesn't shift when the real button mounts.
    return (
      <div
        aria-hidden
        className={cn(
          "inline-flex items-center rounded-md border border-border bg-muted/40 font-mono text-xs text-muted-foreground",
          compact ? "h-9 px-3" : "h-10 px-4",
        )}
      >
        <Wallet className="mr-1.5 h-3.5 w-3.5" />
        Connect
      </div>
    );
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted, authenticationStatus }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
            })}
            className="flex items-center gap-2"
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="subtle"
                    size={compact ? "sm" : "default"}
                    onClick={openConnectModal}
                    className={cn("font-mono text-xs", compact ? "h-9" : "")}
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button variant="outline" size={compact ? "sm" : "default"} onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={openChainModal}
                    className="hidden items-center gap-1.5 rounded-md border border-border bg-background/80 px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
                    type="button"
                    aria-label="Switch chain"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={chain.iconUrl} alt={chain.name} className="h-3.5 w-3.5 rounded-full" />
                    )}
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-2.5 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent/50"
                    type="button"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
