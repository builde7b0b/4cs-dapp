import { useBalance, useAccount,
    useConnect,
    useContractWrite,
    useNetwork,
    useWaitForTransaction, } from 'wagmi'
  import { useContractRead } from 'wagmi'
  import { ethers } from "ethers";
  import { useState, useEffect } from "react";


const  account = useAccount();
const cGOLD_ABI = 

const cGOLD_CONTRACT = '0x10e18383a6B02D19a21478c4F13C30E889a9218e';


const RewardsContract = () => {
  const { data: balance, isLoading, isError } = useContractRead({
    abi: cGOLD_ABI,
    address: cGOLD_CONTRACT,
    functionName: 'balanceOf',
    args: [account.address]
  });

  console.log(balance);

  const { execute: writeFunction } = useContractWrite({
    abi: cGOLD_ABI,
    address: cGOLD_CONTRACT,
    functionName: 'writeFunctionName'
  });

  const handleWrite = async () => {
    try {
      const result = await writeFunction(arg1, arg2); // Pass the required arguments
      console.log(result);
    } catch (error) {
      console.error('Error executing write function:', error);
    }
  };

  return (
    <div>
      <div>Balance: {isLoading ? 'Loading...' : isError ? 'Error occurred while fetching balance.' : balance}</div>
      <button onClick={handleWrite}>Execute Write Function</button>
    </div>
  );
};

export default RewardsContract;
