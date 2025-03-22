
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonorDashboard from '@/components/DonorDashboard';
import NgoDashboard from '@/components/NgoDashboard';
import BeneficiaryDashboard from '@/components/BeneficiaryDashboard';
import AuditorDashboard from '@/components/AuditorDashboard';
import ConnectWallet from '@/components/ConnectWallet';
import RoleSelector from '@/components/RoleSelector';
import { isWalletConnected, getAddress } from '@/utils/web3';
import { mockUser, userRoles } from '@/utils/mockData';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  
  // Check if wallet is connected
  useEffect(() => {
    const checkWallet = async () => {
      const walletData = await isWalletConnected();
      
      if (walletData) {
        setWalletConnected(true);
        setUserAddress(walletData.address);
        
        // In a real app, we would fetch the user role from the blockchain
        // For demo purposes, using mock user role
        setUserRole(mockUser.role);
      }
      
      setIsLoading(false);
    };
    
    checkWallet();
  }, []);
  
  // Handle wallet connection
  const handleWalletConnect = (walletData) => {
    setWalletConnected(true);
    setUserAddress(walletData.address);
    
    // Check if user already has a role
    // In a real app, we would fetch this from the blockchain
    // For demo purposes, show role selector if no role is set
    if (!userRole) {
      setShowRoleSelector(true);
    }
  };
  
  // Handle wallet disconnection
  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setUserAddress(null);
    setUserRole(null);
  };
  
  // Handle role selection
  const handleRoleSelection = (role) => {
    setUserRole(role);
    setShowRoleSelector(false);
    toast.success(`You are now registered as a ${role}`);
    
    // In a real app, we would call the smart contract to register the user with this role
  };
  
  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-charity-200 border-t-charity-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Render dashboard based on user role
  const renderDashboard = () => {
    switch (userRole) {
      case userRoles.DONOR:
        return <DonorDashboard userAddress={userAddress} />;
      case userRoles.NGO:
        return <NgoDashboard userAddress={userAddress} />;
      case userRoles.BENEFICIARY:
        return <BeneficiaryDashboard userAddress={userAddress} />;
      case userRoles.AUDITOR:
        return <AuditorDashboard userAddress={userAddress} />;
      default:
        return (
          <div className="glass-card p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-charity-800 mb-4">Select Your Role</h2>
            <p className="text-muted-foreground mb-6">
              To access your dashboard, please select your role on the platform.
            </p>
            <RoleSelector onRoleSelect={handleRoleSelection} />
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {walletConnected ? (
            <>
              <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-medium text-charity-800 mb-3">
                  {userRole ? 'Your Dashboard' : 'Welcome to CharityChain'}
                </h1>
                <p className="text-muted-foreground">
                  {userRole 
                    ? `Connected as ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`
                    : 'Please select your role to continue'
                  }
                </p>
              </div>
              
              {renderDashboard()}
              
              {/* Role selector modal */}
              {showRoleSelector && !userRole && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="glass-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <button 
                      onClick={() => setShowRoleSelector(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                    <RoleSelector onRoleSelect={handleRoleSelection} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="glass-card p-8 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-medium text-charity-800 mb-4">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                To access your dashboard, please connect your wallet.
              </p>
              <div className="flex justify-center">
                <ConnectWallet 
                  onConnect={handleWalletConnect} 
                  onDisconnect={handleWalletDisconnect} 
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
