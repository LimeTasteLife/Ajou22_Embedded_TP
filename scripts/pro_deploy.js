const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  /*
  const APIConsumer = await hre.ethers.getContractFactory('APIConsumer');
  const apiConsumer = await APIConsumer.deploy();
  await apiConsumer.deployed();
  console.log('APIConsumer contract deployed to:', apiConsumer.address);

  const WinnerGet = await hre.ethers.getContractFactory('WinnerGet');
  const winnerGet = await WinnerGet.deploy();
  await apiConsumer.deployed();
  console.log('WinnerGet contract deployed to:', winnerGet.address);
*/
  const StructBase = await hre.ethers.getContractFactory('StructBase');
  const structBase = await StructBase.deploy();
  await structBase.deployed();
  console.log('structBase contract deployed to:', structBase.address);

  const ProcessBase = await hre.ethers.getContractFactory('ProcessBase');
  const processBase = await ProcessBase.deploy();
  await processBase.deployed();
  console.log('processBase contract deployed to:', processBase.address);

  const GameProcess = await hre.ethers.getContractFactory('GameProcess');
  const gameProcess = await GameProcess.deploy();
  await gameProcess.deployed();
  console.log('gameProcess contract deployed to:', gameProcess.address);

  const GameManager = await hre.ethers.getContractFactory('GameManager');
  const gameManager = await GameManager.deploy();
  await gameManager.deployed();
  console.log('gameManager contract deployed to:', gameManager.address);

  /*
    export const apiConsumerAddress = "${apiConsumer.address}"
    export const winnerGetAddress = "${winnerGet.address}"
  */

  fs.writeFileSync(
    './config.js',
    `
    export const structBaseAddress = "${structBase.address}"
    export const processBaseAddress = "${processBase.address}"
    export const gameProcessAddress = "${gameProcess.address}"
    export const gameManagerAddress = "${gameManager.address}"

    `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
