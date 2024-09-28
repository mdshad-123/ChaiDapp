import { useState,useEffect } from 'react'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from './component/Memos'
import Buy from './component/Buy'
//import chai from "./chai1.jpg";
import './App.css'

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not Connected');
  useEffect(()=>{
    const template=async()=>{
  
      const contractAddres="0xF232cD9325F1F73b80E8263B6f0db6F6b8135e90";
      const contractABI=abi.abi;
      //Metamask part
      //1. In order do transactions on sepolia testnet
      //2. Metmask consists of alchemy api which actually help in connectig to the blockhain
      try{

        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
 
        window.ethereum.on("accountsChanged",()=>{
        window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
      
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <div >
    <header className='chai'>
      <h1>Chai Dapp</h1>
      <p>Buy Chai</p>
      
    </header>
    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
  
      <Buy state={state} />
      <Memos state={state} />
  
  </div>
  )
}

export default App