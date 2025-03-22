
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { getCharityContract } from './contracts';

// Initialize a Web3 Provider
let provider;
let signer;
let userAddress = null;
let chainId = null;

// Connect to the wallet
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      userAddress = accounts[0];
      
      // Get the chain ID
      const network = await provider.getNetwork();
      chainId = network.chainId;
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      // Listen for chain changes
      window.ethereum.on('chainChanged', handleChainChanged);
      
      toast.success('Wallet connected successfully');
      return { address: userAddress, chainId };
    } catch (error) {
      toast.error('Failed to connect wallet: ' + error.message);
      console.error('Error connecting to wallet:', error);
      return null;
    }
  } else {
    toast.error('Please install a Web3 wallet like MetaMask');
    console.error('No Ethereum browser extension detected');
    return null;
  }
};

// Disconnect wallet
export const disconnectWallet = async () => {
  userAddress = null;
  provider = null;
  signer = null;
  chainId = null;
  
  // Remove event listeners
  if (window.ethereum) {
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', handleChainChanged);
  }
  
  toast.success('Wallet disconnected');
  return null;
};

// Handle account changes
const handleAccountsChanged = (accounts) => {
  if (accounts.length === 0) {
    // User disconnected their wallet
    toast.info('Wallet disconnected');
    userAddress = null;
    window.location.reload();
  } else if (accounts[0] !== userAddress) {
    userAddress = accounts[0];
    toast.info('Account changed to ' + shortenAddress(userAddress));
    window.location.reload();
  }
};

// Handle chain changes
const handleChainChanged = (newChainId) => {
  chainId = parseInt(newChainId, 16);
  toast.info('Network changed, reloading...');
  window.location.reload();
};

// Check if wallet is connected
export const isWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAddress = accounts[0];
        
        // Get the chain ID
        const network = await provider.getNetwork();
        chainId = network.chainId;
        
        return { address: userAddress, chainId };
      }
      return null;
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return null;
    }
  }
  return null;
};

// Get the current provider
export const getProvider = () => {
  if (!provider && window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  return provider;
};

// Get the current signer
export const getSigner = () => {
  if (!signer && provider) {
    signer = provider.getSigner();
  }
  return signer;
};

// Get the connected address
export const getAddress = () => {
  return userAddress;
};

// Get the current chain ID
export const getChainId = () => {
  return chainId;
};

// Switch chain
export const switchChain = async (targetChainId) => {
  if (!window.ethereum) return false;
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${targetChainId.toString(16)}` }],
    });
    return true;
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      try {
        // Add the chain
        await addEduChain();
        return true;
      } catch (addError) {
        console.error('Error adding chain:', addError);
        toast.error('Failed to add EDU chain to wallet');
        return false;
      }
    }
    console.error('Error switching chain:', error);
    toast.error('Failed to switch network');
    return false;
  }
};

// Add EDU Chain to wallet
export const addEduChain = async () => {
  if (!window.ethereum) return false;
  
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x7A69', // 31337 in hex
        chainName: 'EDU Chain',
        nativeCurrency: {
          name: 'EDU',
          symbol: 'EDU',
          decimals: 18
        },
        rpcUrls: ['http://localhost:8545'],
        blockExplorerUrls: ['http://localhost:8545']
      }]
    });
    return true;
  } catch (error) {
    console.error('Error adding EDU chain:', error);
    toast.error('Failed to add EDU chain to wallet');
    return false;
  }
};

// Shorten an ethereum address
export const shortenAddress = (address) => {
  if (!address) return '';
  return address.slice(0, 6) + '...' + address.slice(-4);
};

// Donate to a project
export const donateToProject = async (projectId, amount) => {
  try {
    if (!userAddress || !signer) {
      throw new Error('Wallet not connected');
    }
    
    const charityContract = getCharityContract(signer);
    
    // Convert amount to wei (ETH to smallest unit)
    const amountInWei = ethers.utils.parseEther(amount.toString());
    
    // Make donation transaction
    const tx = await charityContract.donate(projectId, {
      value: amountInWei
    });
    
    // Wait for transaction to be mined
    toast.info('Processing donation transaction...');
    const receipt = await tx.wait();
    
    toast.success('Donation successful!');
    return {
      success: true,
      transactionHash: receipt.transactionHash
    };
  } catch (error) {
    console.error('Error making donation:', error);
    toast.error('Donation failed: ' + error.message);
    return {
      success: false,
      error: error.message
    };
  }
};
