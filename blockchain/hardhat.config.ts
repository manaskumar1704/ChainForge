import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      // --- Add this line ---
      type: "http", 
      url: process.env.SEPOLIA_URL || "",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;