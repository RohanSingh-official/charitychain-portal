
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Target, 
  Clock,
  Heart,
  ChevronLeft,
  Info,
  Share2,
  ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MilestoneTracker from '@/components/MilestoneTracker';
import { Progress } from '@/components/ui/progress';
import { mockProjects, mockUser, userRoles } from '@/utils/mockData';
import { isWalletConnected, donateToProject, shortenAddress } from '@/utils/web3';
import { toast } from 'sonner';

const ProjectDetails = () => {
  const { id } = useParams();
  const [userRole, setUserRole] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load project data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Check wallet connection
      const walletData = await isWalletConnected();
      if (walletData) {
        setWalletConnected(true);
        setUserRole(mockUser.role); // In real app, fetch from blockchain
      }
      
      // Fetch project details
      // In a real app, we would fetch from the blockchain
      const projectData = mockProjects.find(p => p.id === parseInt(id));
      
      if (projectData) {
        setProject(projectData);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [id]);
  
  // Handle donation
  const handleDonation = async (e) => {
    e.preventDefault();
    
    if (!walletConnected) {
      toast.error('Please connect your wallet to donate');
      return;
    }
    
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would call the smart contract to make a donation
      // For demo, we'll simulate a successful donation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Successfully donated $${donationAmount} to ${project.name}`);
      setDonationAmount('');
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Failed to process donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    if (!project) return 0;
    return Math.min(Math.round((project.raised / project.goal) * 100), 100);
  };
  
  // Calculate days left
  const daysLeft = () => {
    if (!project) return 0;
    
    const end = new Date(project.endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Handle preset donation amounts
  const presetAmounts = [5, 25, 100, 500];
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-charity-200 border-t-charity-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar userRole={userRole} setUserRole={setUserRole} />
        
        <main className="flex-grow pt-28 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="glass-card p-8">
              <h1 className="text-2xl font-medium text-charity-800 mb-4">Project Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The project you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/projects" className="btn-primary inline-flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Link */}
          <div className="mb-6">
            <Link 
              to="/projects"
              className="inline-flex items-center text-charity-600 hover:text-charity-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Project Header */}
              <div className="glass-card overflow-hidden mb-6">
                <div className="h-64 w-full relative">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-charity-100 text-charity-700 rounded-full">
                      {project.organization}
                    </span>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Verified
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-medium text-charity-800 mb-4">
                    {project.name}
                  </h1>
                  
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Target className="mr-2 h-4 w-4 text-charity-600" />
                      <span className="font-medium text-charity-800">
                        ${project.goal.toLocaleString()} goal
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4 text-charity-600" />
                      <span className="font-medium text-charity-800">
                        {daysLeft()} days left
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4 text-charity-600" />
                      <span className="font-medium text-charity-800">
                        {Math.floor(Math.random() * 50) + 10} donors
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4 text-charity-600" />
                      <span className="font-medium text-charity-800">
                        Ends {formatDate(project.endDate)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-charity-800 font-medium">
                        ${project.raised.toLocaleString()} raised
                      </span>
                      <span className="text-muted-foreground">
                        {calculateProgress()}%
                      </span>
                    </div>
                    <Progress 
                      value={calculateProgress()} 
                      className="h-2.5 bg-charity-100" 
                      indicatorClassName="bg-charity-500" 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="btn-secondary inline-flex items-center text-sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </button>
                    
                    <a 
                      href={`https://etherscan.io/address/${shortenAddress("0x1234567890123456789012345678901234567890")}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-charity-600 hover:text-charity-700 inline-flex items-center"
                    >
                      View on Blockchain
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project Updates */}
              <div className="glass-card p-6 mb-6">
                <h2 className="text-xl font-medium text-charity-800 mb-4">Project Updates</h2>
                
                <div className="space-y-6">
                  {project.updates.map(update => (
                    <div key={update.id} className="border-l-2 border-charity-200 pl-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-charity-500 absolute -ml-[25px]"></div>
                        <h3 className="text-lg font-medium text-charity-800">{update.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{update.content}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(update.date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Milestone Tracker */}
              <div className="glass-card p-6">
                <MilestoneTracker milestones={project.milestones} userRole={userRole} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              {/* Donation Form */}
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-medium text-charity-800 mb-4">Make a Donation</h2>
                
                <form onSubmit={handleDonation}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-charity-800 mb-1">
                      Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <input
                        type="text"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-charity-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {presetAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount.toString())}
                        className={`py-2 text-sm font-medium rounded-md ${
                          parseFloat(donationAmount) === amount
                          ? 'bg-charity-500 text-white'
                          : 'bg-charity-50 text-charity-600 hover:bg-charity-100'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !walletConnected}
                    className={`btn-primary w-full flex items-center justify-center ${
                      isSubmitting || !walletConnected ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        {walletConnected ? 'Donate Now' : 'Connect Wallet to Donate'}
                      </>
                    )}
                  </button>
                  
                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    <Info className="inline h-3 w-3 mr-1" />
                    Donations are processed on the blockchain and are transparent.
                  </div>
                </form>
              </motion.div>
              
              {/* About Organization */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-medium text-charity-800 mb-4">About {project.organization}</h2>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {project.organization} is a verified organization dedicated to making a positive impact 
                  in communities around the world through sustainable and transparent initiatives.
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charity-600">
                    {Math.floor(Math.random() * 10) + 2} active projects
                  </span>
                  
                  <a 
                    href="#"
                    className="text-sm text-charity-600 hover:text-charity-700"
                  >
                    View Profile
                  </a>
                </div>
              </div>
              
              {/* Similar Projects */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-medium text-charity-800 mb-4">Similar Projects</h2>
                
                <div className="space-y-4">
                  {mockProjects.filter(p => p.id !== project.id).slice(0, 3).map(p => (
                    <Link 
                      key={p.id}
                      to={`/projects/${p.id}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-charity-800 group-hover:text-charity-600 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {p.organization}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;
