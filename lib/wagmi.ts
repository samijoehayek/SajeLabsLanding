"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, polygon } from "wagmi/chains";
import { http } from "viem";
import { siteConfig } from "@/config/site";

const projectId =
  process.env["NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID"] ?? "";

export const wagmiConfig = getDefaultConfig({
  appName: siteConfig.name,
  projectId: projectId || "sajelabs-local",
  chains: [mainnet, arbitrum, base, polygon],
  transports: {
    [mainnet.id]: http(process.env["NEXT_PUBLIC_ETH_RPC"]),
    [arbitrum.id]: http(process.env["NEXT_PUBLIC_ARB_RPC"]),
    [base.id]: http(process.env["NEXT_PUBLIC_BASE_RPC"]),
    [polygon.id]: http(),
  },
  ssr: true,
});
