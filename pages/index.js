import Layout from '../components/layout';
import Link from 'next/link';
import Image from 'next/image'
import { useWallet } from './walletContext';
import LoginComponent from './login';
import { AuthProvider } from '../components/auth';
import { BrowserRouter } from 'react-router-dom';
import React, {useState, useEffect, useCallback} from 'react';
import { ethers } from "ethers";


export default function Home() {

  const {account, connectWallet, disconnectWallet} = useWallet(null);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const newAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        connectWallet(newAccounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('MetaMask not found. Please install it to use this feature.');
    }
  };


  // 주소
  const PawEverFriends_CA = "0x56Ad0b54F72AC30f5554b3959bea4552f6e41C28";

  // 지갑 연결
  // 이더스 프로바이더: create an ethers provider
  /*let ethersProvider;
  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any"); //ethers.BrowserProvider in v6
  }

  let Web3 = require('web3'); 

  
  function Index() {
      
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [contract, setContract] = useState(null)
    const [totalSupply, setTotalSupply] = useState(0)
  
    
    let contractAddress = "0xe3Ca5426245fD7fF43e0f1533b36FB8E46E21F49"
  
    useEffect(() => {
      window.ethereum ?
        ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
          setAddress(accounts[0])
          let w3 = new Web3(ethereum)
          setWeb3(w3)
        
          let c = new w3.eth.Contract(abi, contractAddress)
          setContract(c)
        
          
          c.methods.totalSupply().call().then((_supply) => {
            // Optionally set it to the state to render it using React
            setTotalSupply(_supply)
          }).catch((err) => console.log(err))


        }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
      
      
    }, [])
    
    function mint(){
      let _price = web3.utils.toWei("1");
      let encoded = contract.methods.safeMint().encodeABI()
  
      let tx = {
          from: address,
          to : YOUR_CONTRACT_ADDRESS,
          data : encoded,
          nonce: "0x00",
          value: web3.utils.numberToHex(_price)
      }
  
      let txHash = ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
      }).then((hash) => {
          alert("You can now view your transaction with hash: " + hash)
      }).catch((err) => console.log(err))
      
      return txHash
    }
  }  */


  return (
   
  <Layout>
        <div className="flex items-center justify-center bg-gradient-to-t via-[#c8ebfd] to-[#e7e9fe] h-screen p-6">
            <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                  <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Pawever Friend
                    </h1>
                    <p className="mb-8 leading-relaxed">
                    반려견 입양 플랫폼
                    </p>
                    <div className="flex justify-center">
                      
                    
                     {account ? 
                     <>
                     <span>{'Wallet Connected: ' + account }</span>
                     <button onClick={disconnectWallet}>disconnectWallet</button></>
                     
                    : <button onClick={connectWalletHandler}>connectWallet </button>}
                    
                    </div>
                  </div>
                  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <Image alt="profil" src="/images/profile/hand-illustration.png" width="500" height="500" className="mx-auto object-cover "/>
                  </div>
                </div>
            </section>
        </div>    
    </Layout>
    
    
  );
}
