
import { ethers } from 'ethers';

// These would be the ABI definitions for your deployed contracts
const CharityABI = [
  // Functions for donors
  "function donate(uint256 projectId) external payable",
  "function getDonationsByDonor(address donor) external view returns (uint256[])",
  
  // Functions for NGOs
  "function createProject(string memory name, string memory description, uint256 fundingGoal, uint256 deadline) external returns (uint256)",
  "function updateProject(uint256 projectId, string memory name, string memory description, uint256 fundingGoal, uint256 deadline) external",
  "function addMilestone(uint256 projectId, string memory title, string memory description, uint256 amount) external",
  
  // Functions for beneficiaries
  "function verifyMilestone(uint256 projectId, uint256 milestoneId) external",
  
  // Functions for auditors
  "function auditProject(uint256 projectId, bool approved, string memory comments) external",
  "function approveMilestone(uint256 projectId, uint256 milestoneId) external",
  
  // General functions
  "function getProject(uint256 projectId) external view returns (tuple(uint256 id, string name, string description, address owner, uint256 fundingGoal, uint256 raisedAmount, uint256 deadline, bool active))",
  "function getMilestones(uint256 projectId) external view returns (tuple(uint256 id, string title, string description, uint256 amount, bool completed, bool verified, bool approved)[])",
  "function registerUser(uint8 role) external",
  "function getUserRole(address user) external view returns (uint8)",
  
  // Events
  "event ProjectCreated(uint256 indexed projectId, address indexed owner, string name, uint256 fundingGoal)",
  "event DonationReceived(uint256 indexed projectId, address indexed donor, uint256 amount)",
  "event MilestoneAdded(uint256 indexed projectId, uint256 indexed milestoneId, string title, uint256 amount)",
  "event MilestoneCompleted(uint256 indexed projectId, uint256 indexed milestoneId)",
  "event MilestoneVerified(uint256 indexed projectId, uint256 indexed milestoneId, address indexed verifier)",
  "event MilestoneApproved(uint256 indexed projectId, uint256 indexed milestoneId, address indexed auditor)",
  "event FundsReleased(uint256 indexed projectId, uint256 indexed milestoneId, uint256 amount)",
  "event ProjectAudited(uint256 indexed projectId, address indexed auditor, bool approved)"
];

// Contract addresses (these would be set after deployment)
const CONTRACT_ADDRESSES = {
  // Mainnet addresses
  1: {
    Charity: "0x0000000000000000000000000000000000000000"
  },
  // Testnet addresses (e.g., Goerli)
  5: {
    Charity: "0x0000000000000000000000000000000000000000"
  },
  // EDU Chain addresses (localhost hardhat)
  31337: {
    Charity: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  }
};

// Get the charity contract instance
export const getCharityContract = (signerOrProvider) => {
  const { ethereum } = window;
  if (!ethereum) {
    throw new Error("Ethereum provider not found");
  }
  
  // Get the network ID
  const chainId = parseInt(ethereum.chainId, 16);
  
  // Get the contract address for the current network
  const contractAddress = CONTRACT_ADDRESSES[chainId]?.Charity;
  if (!contractAddress) {
    throw new Error(`Contract not deployed on current network (ID: ${chainId})`);
  }
  
  // Return a new contract instance
  return new ethers.Contract(contractAddress, CharityABI, signerOrProvider);
};

// Deploy a new instance of the Charity contract (for testing/development)
export const deployCharityContract = async (signer) => {
  const CharityFactory = new ethers.ContractFactory(CharityABI, /* BYTECODE HERE */, signer);
  const charity = await CharityFactory.deploy();
  await charity.deployed();
  
  console.log("Charity contract deployed to:", charity.address);
  return charity;
};

// Register a user with a specific role
export const registerUser = async (role, signer) => {
  const charityContract = getCharityContract(signer);
  const tx = await charityContract.registerUser(role);
  return await tx.wait();
};

// Get the role of a user
export const getUserRole = async (address, provider) => {
  const charityContract = getCharityContract(provider);
  return await charityContract.getUserRole(address);
};

// Create a new project
export const createProject = async (name, description, fundingGoal, deadline, signer) => {
  const charityContract = getCharityContract(signer);
  const tx = await charityContract.createProject(name, description, ethers.utils.parseEther(fundingGoal.toString()), deadline);
  const receipt = await tx.wait();
  
  // Extract project ID from event logs
  const projectCreatedEvent = receipt.events.find(event => event.event === 'ProjectCreated');
  const projectId = projectCreatedEvent.args.projectId.toNumber();
  
  return projectId;
};

// Get project details
export const getProject = async (projectId, provider) => {
  const charityContract = getCharityContract(provider);
  const projectData = await charityContract.getProject(projectId);
  
  return {
    id: projectData.id.toNumber(),
    name: projectData.name,
    description: projectData.description,
    owner: projectData.owner,
    fundingGoal: ethers.utils.formatEther(projectData.fundingGoal),
    raisedAmount: ethers.utils.formatEther(projectData.raisedAmount),
    deadline: new Date(projectData.deadline.toNumber() * 1000),
    active: projectData.active
  };
};

// Get project milestones
export const getMilestones = async (projectId, provider) => {
  const charityContract = getCharityContract(provider);
  const milestonesData = await charityContract.getMilestones(projectId);
  
  return milestonesData.map(milestone => ({
    id: milestone.id.toNumber(),
    title: milestone.title,
    description: milestone.description,
    amount: ethers.utils.formatEther(milestone.amount),
    completed: milestone.completed,
    verified: milestone.verified,
    approved: milestone.approved
  }));
};
