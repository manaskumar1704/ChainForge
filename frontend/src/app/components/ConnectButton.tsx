// src/components/ConnectButton.tsx
'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function ConnectButton() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Show the user's formatted address and a disconnect button
  if (account.isConnected) {
    const formattedAddress = `${account.address?.slice(0, 6)}...${account.address?.slice(-4)}`;
    return (
      <div>
        <p className="mb-2 text-gray-400">Connected as: {formattedAddress}</p>
        <button
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Show a "Connect Wallet" button
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      onClick={() => connect({ connector: connectors[0] })}
    >
      Connect Wallet
    </button>
  );
}