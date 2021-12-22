import Web3 from "web3";
import accessPass from "./contracts/BlackBoxAccessPass.json"


const contractAddr = "0xe7ca2cD6b0247D32f6d5aE1FD09Eb62539E010C4";
const web3 = new Web3("https://mainnet.infura.io/v3/bad8cc770bef49dc88683bf2290205c8");
let contract = new web3.eth.Contract(accessPass.abi, contractAddr);

export { 
    contractAddr, 
    contract
};