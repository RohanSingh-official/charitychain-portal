
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wallet, LogOut } from "lucide-react";
import { connectWallet, disconnectWallet, isWalletConnected, shortenAddress } from "@/utils/web3";

const ConnectWallet = ({ onConnect, onDisconnect }) => {
  const [connecting, setConnecting] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);
  const { toast } = useToast();

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      const walletData = await isWalletConnected();
      
      if (walletData) {
        setWalletInfo(walletData);
        if (onConnect) onConnect(walletData);
      }
    };
    
    checkWalletConnection();
  }, [onConnect]);

  const handleConnect = async () => {
    setConnecting(true);
    
    try {
      const walletData = await connectWallet();
      
      if (walletData) {
        setWalletInfo(walletData);
        if (onConnect) onConnect(walletData);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setWalletInfo(null);
    if (onDisconnect) onDisconnect();
  };

  return (
    <div className="flex items-center space-x-2">
      {walletInfo ? (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-charity-300 text-charity-800"
          >
            <Wallet className="h-4 w-4" />
            {shortenAddress(walletInfo.address)}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDisconnect} 
            className="text-charity-600 hover:bg-charity-100"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button 
          onClick={handleConnect} 
          disabled={connecting}
          className="btn-primary"
        >
          {connecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" /> 
              Connect Wallet
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
