// src/app/page.tsx

import { ConnectButton } from "./components/ConnectButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center text-center p-8">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to ChainForge
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Your platform to forge ideas on the blockchain.
        </p>

        {/* This is our new connect button component */}
        <ConnectButton />
      </div>
    </main>
  );
}