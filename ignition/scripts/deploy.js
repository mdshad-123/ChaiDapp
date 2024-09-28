const hre = require("hardhat");

async function main() {
    const Chai = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI
    const chai = await Chai.deploy(); //creating an instance of our smart contract

    await chai.waitForDeployment(); //deploying your smart contract

    console.log("Deployed contract address:", await chai.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//0x5FbDB2315678afecb367f032d93F642f64180aa3  1.
//0xF232cD9325F1F73b80E8263B6f0db6F6b8135e90  2.