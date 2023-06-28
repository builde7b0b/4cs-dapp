import { ConnectButton, } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useBalance, useAccount,
  useConnect,
  useContractWrite,
  useNetwork,
  useWaitForTransaction, } from 'wagmi'
import { useContractRead } from 'wagmi'
import { ethers } from "ethers";
import { useState, useEffect } from "react";



const ABI = 
[
  {"inputs":[{"internalType":"uint256","name":"_supplyPerYear","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SupplyDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BLOCK_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUPPLY_PER_BLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUPPLY_PER_YEAR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_teamAddresses","type":"address[]"},{"internalType":"uint256[]","name":"_teamAmounts","type":"uint256[]"}],"name":"distributeSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextDistributionTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextDistributionWindow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}
]

const croABI = 
[

  {

      "inputs": [

          {

              "internalType": "string",

              "name": "_name",

              "type": "string"

          },

          {

              "internalType": "string",

              "name": "_symbol",

              "type": "string"

          },

          {

              "internalType": "string",

              "name": "_initBaseURI",

              "type": "string"

          },

          {

              "internalType": "string",

              "name": "_initNotRevealedUri",

              "type": "string"

          }

      ],

      "stateMutability": "nonpayable",

      "type": "constructor"

  },

  {

      "anonymous": false,

      "inputs": [

          {

              "indexed": true,

              "internalType": "address",

              "name": "owner",

              "type": "address"

          },

          {

              "indexed": true,

              "internalType": "address",

              "name": "approved",

              "type": "address"

          },

          {

              "indexed": true,

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "Approval",

      "type": "event"

  },

  {

      "anonymous": false,

      "inputs": [

          {

              "indexed": true,

              "internalType": "address",

              "name": "owner",

              "type": "address"

          },

          {

              "indexed": true,

              "internalType": "address",

              "name": "operator",

              "type": "address"

          },

          {

              "indexed": false,

              "internalType": "bool",

              "name": "approved",

              "type": "bool"

          }

      ],

      "name": "ApprovalForAll",

      "type": "event"

  },

  {

      "anonymous": false,

      "inputs": [

          {

              "indexed": true,

              "internalType": "address",

              "name": "previousOwner",

              "type": "address"

          },

          {

              "indexed": true,

              "internalType": "address",

              "name": "newOwner",

              "type": "address"

          }

      ],

      "name": "OwnershipTransferred",

      "type": "event"

  },

  {

      "anonymous": false,

      "inputs": [

          {

              "indexed": true,

              "internalType": "address",

              "name": "from",

              "type": "address"

          },

          {

              "indexed": true,

              "internalType": "address",

              "name": "to",

              "type": "address"

          },

          {

              "indexed": true,

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "Transfer",

      "type": "event"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "to",

              "type": "address"

          },

          {

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "approve",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "owner",

              "type": "address"

          }

      ],

      "name": "balanceOf",

      "outputs": [

          {

              "internalType": "uint256",

              "name": "",

              "type": "uint256"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "baseExtension",

      "outputs": [

          {

              "internalType": "string",

              "name": "",

              "type": "string"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "cost",

      "outputs": [

          {

              "internalType": "uint256",

              "name": "",

              "type": "uint256"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "getApproved",

      "outputs": [

          {

              "internalType": "address",

              "name": "",

              "type": "address"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "owner",

              "type": "address"

          },

          {

              "internalType": "address",

              "name": "operator",

              "type": "address"

          }

      ],

      "name": "isApprovedForAll",

      "outputs": [

          {

              "internalType": "bool",

              "name": "",

              "type": "bool"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "maxMintAmount",

      "outputs": [

          {

              "internalType": "uint256",

              "name": "",

              "type": "uint256"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "maxSupply",

      "outputs": [

          {

              "internalType": "uint256",

              "name": "",

              "type": "uint256"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "uint256",

              "name": "_mintAmount",

              "type": "uint256"

          }

      ],

      "name": "mint",

      "outputs": [],

      "stateMutability": "payable",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "name",

      "outputs": [

          {

              "internalType": "string",

              "name": "",

              "type": "string"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "notRevealedUri",

      "outputs": [

          {

              "internalType": "string",

              "name": "",

              "type": "string"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "owner",

      "outputs": [

          {

              "internalType": "address",

              "name": "",

              "type": "address"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "ownerOf",

      "outputs": [

          {

              "internalType": "address",

              "name": "",

              "type": "address"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "bool",

              "name": "_state",

              "type": "bool"

          }

      ],

      "name": "pause",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "paused",

      "outputs": [

          {

              "internalType": "bool",

              "name": "",

              "type": "bool"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "renounceOwnership",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "reveal",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "revealed",

      "outputs": [

          {

              "internalType": "bool",

              "name": "",

              "type": "bool"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "from",

              "type": "address"

          },

          {

              "internalType": "address",

              "name": "to",

              "type": "address"

          },

          {

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "safeTransferFrom",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "from",

              "type": "address"

          },

          {

              "internalType": "address",

              "name": "to",

              "type": "address"

          },

          {

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          },

          {

              "internalType": "bytes",

              "name": "_data",

              "type": "bytes"

          }

      ],

      "name": "safeTransferFrom",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "operator",

              "type": "address"

          },

          {

              "internalType": "bool",

              "name": "approved",

              "type": "bool"

          }

      ],

      "name": "setApprovalForAll",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "string",

              "name": "_newBaseExtension",

              "type": "string"

          }

      ],

      "name": "setBaseExtension",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "string",

              "name": "_newBaseURI",

              "type": "string"

          }

      ],

      "name": "setBaseURI",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "uint256",

              "name": "_newCost",

              "type": "uint256"

          }

      ],

      "name": "setCost",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "string",

              "name": "_notRevealedURI",

              "type": "string"

          }

      ],

      "name": "setNotRevealedURI",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "uint256",

              "name": "_newmaxMintAmount",

              "type": "uint256"

          }

      ],

      "name": "setmaxMintAmount",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "bytes4",

              "name": "interfaceId",

              "type": "bytes4"

          }

      ],

      "name": "supportsInterface",

      "outputs": [

          {

              "internalType": "bool",

              "name": "",

              "type": "bool"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "symbol",

      "outputs": [

          {

              "internalType": "string",

              "name": "",

              "type": "string"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "uint256",

              "name": "index",

              "type": "uint256"

          }

      ],

      "name": "tokenByIndex",

      "outputs": [

          {

              "internalType": "uint256",

              "name": "",

              "type": "uint256"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "owner",

              "type": "address"

          },

          {

              "internalType": "uint256",

              "name": "index",

              "type": "uint256"

          }

      ],

      "name": "tokenOfOwnerByIndex",

      "outputs": [

          {

              "internalType": "uint256",

              "name": "",

              "type": "uint256"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "tokenURI",

      "outputs": [

          {

              "internalType": "string",

              "name": "",

              "type": "string"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "totalSupply",

      "outputs": [

          {

              "internalType": "uint256",

              "name": "",

              "type": "uint256"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "from",

              "type": "address"

          },

          {

              "internalType": "address",

              "name": "to",

              "type": "address"

          },

          {

              "internalType": "uint256",

              "name": "tokenId",

              "type": "uint256"

          }

      ],

      "name": "transferFrom",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "newOwner",

              "type": "address"

          }

      ],

      "name": "transferOwnership",

      "outputs": [],

      "stateMutability": "nonpayable",

      "type": "function"

  },

  {

      "inputs": [

          {

              "internalType": "address",

              "name": "_owner",

              "type": "address"

          }

      ],

      "name": "walletOfOwner",

      "outputs": [

          {

              "internalType": "uint256[]",

              "name": "",

              "type": "uint256[]"

          }

      ],

      "stateMutability": "view",

      "type": "function"

  },

  {

      "inputs": [],

      "name": "withdraw",

      "outputs": [],

      "stateMutability": "payable",

      "type": "function"

  }

]


const cro_contract = '0x230Bb7ce185CD0042973202f5F38B7072440e2C9'

const CONTRACT_ADDRESS = '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03'

const Home: NextPage = () => {
  

  const addRecentTransaction = useAddRecentTransaction();

  const  account = useAccount();
  console.log("Account address: ", account.address);
  const { data: balance, isLoading, isError } = useContractRead({
    abi: croABI,
    address: cro_contract,
    functionName: 'balanceOf',
    args:["0x4B7051619d0AAa0EC056A18eceD5D8E06Dd55F33"]
    
  });
  console.log(balance);



  let balanceContent: React.ReactNode;

  if (isLoading) {
    balanceContent = "Loading balance...";
  } else if (isError) {
    balanceContent = "Error occurred while fetching balance.";
  } else {
    balanceContent = balance.toString() as React.ReactNode;
    console.log(balanceContent)
  }


  

  // if (isLoading) return <div>Fetching balance…</div>
  // if (isError) return <div>Error fetching balance</div>
  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
        <div>
      
    </div>

        <button
      onClick={() => {
        addRecentTransaction({
          hash: '0x...',
          description: '...',
        });
      }}
    >
      Add recent transaction
    </button>
    <div>
    Your balance is: {balanceContent}
      <br />
      Your Cro Crook NFT Balance is: {balanceContent}
          
        </div>

        

        
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
