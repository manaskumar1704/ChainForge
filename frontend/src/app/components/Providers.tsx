// src/components/Providers.tsx
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Create a TanStack Query client
const queryClient = new QueryClient();

// 2. Create a Wagmi config
export const config = createConfig({
  chains: [sepolia], // We are only supporting the Sepolia testnet
  connectors: [
    injected(), // This supports browser wallets like MetaMask
  ],
  transports: {
    [sepolia.id]: http(), // This sets up a connection to the blockchain
  },
});

// 3. Create the Providers component
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}