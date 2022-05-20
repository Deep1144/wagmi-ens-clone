/* eslint-disable no-unused-vars */
/* eslint-disable no-process-exit */
const hre = require("hardhat");
const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("ninja");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("banana", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain banana.ninja");

  txn = await domainContract.setRecord("banana", "Am I a banana or a ninja??");
  await txn.wait();
  console.log("Set record for banana.ninja");

  const address = await domainContract.getAddress("banana");
  console.log("Owner of domain banana:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// Contract deployed to: 0x189CA34cC22d2C0E25Cb7B507Aa8F545Ccc9eF61
// Minted domain banana.ninja
// Set record for banana.ninja
// Owner of domain banana: 0x97445634323E6180C91D0ce33a1BFCC5C29A3cF9
// Contract balance: 0.1
