import hre from "hardhat";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import "dotenv/config";

async function main() {
  // 1. Define your contract's address and metadata URI
  const contractAddress = "0xffa3d002a4dab0564a5c294741f712e1bf0413c9"; // 👈 PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE
  const tokenURI = "https://jsonkeeper.com/b/PTRSR."; // 👈 PASTE YOUR JSON KEEPER URL HERE

  // 2. Get the contract's ABI
  const myNFT = await hre.artifacts.readArtifact("MyNFT");

  // 3. Create Viem clients
  const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY!}`);
  
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(process.env.SEPOLIA_URL!),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(process.env.SEPOLIA_URL!),
  });

  // 4. Call the safeMint function
  console.log(`Minting a new NFT to your wallet: ${account.address}`);
  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: myNFT.abi,
    functionName: "safeMint",
    args: [tokenURI],
  });

  console.log(`Transaction sent! Hash: ${hash}`);
  console.log("Waiting for confirmation...");

  // 5. Wait for the transaction to be mined
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log(`Successfully minted your NFT! See the transaction at: https://sepolia.etherscan.io/tx/${receipt.transactionHash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});