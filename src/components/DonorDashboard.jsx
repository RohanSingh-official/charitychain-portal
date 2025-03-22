
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  BarChart3, 
  ArrowUpRight 
} from 'lucide-react';
import { mockDonations, mockProjects } from '@/utils/mockData';
import DonationHistory from './DonationHistory';

const DonorDashboard = ({ userAddress }) => {
  const [userDonations, setUserDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonated: 0,
    projectsSupported: 0,
    lastDonation: null
  });
  
  // Filter donations by user address
  useEffect(() => {
    // In a real app, we would fetch from the blockchain
    const donations = mockDonations.filter(d => d.donor === userAddress);
    
    setUserDonations(donations);
    
    // Calculate stats
    const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const uniqueProjects = [...new Set(donations.map(d => d.projectId))];
    const lastDonation = donations.length > 0 
      ? donations.sort((a, b) => new Date(b.date) - new Date(a.date))[0] 
      : null;
    
    setStats({
      totalDonated: total,
      projectsSupported: uniqueProjects.length,
      lastDonation
    });
  }, [userAddress]);
  
  // Get project recommendations
  const getRecommendedProjects = () => {
    // In a real app, we would have more sophisticated recommendation logic
    // based on user's previous donations
    return mockProjects.slice(0, 3);
  };
  
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Total Donated</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            ${stats.totalDonated.toLocaleString()}
          </p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Projects Supported</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            {stats.projectsSupported}
          </p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Last Donation</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            {stats.lastDonation 
              ? new Date(stats.lastDonation.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                }) 
              : 'N/A'}
          </p>
        </div>
      </div>
      
      {/* Donation History */}
      <DonationHistory donations={userDonations} />
      
      {/* Recommended Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium text-charity-800">Recommended Projects</h3>
          <Link 
            to="/projects" 
            className="text-sm text-charity-600 hover:text-charity-700 inline-flex items-center"
          >
            View all projects
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getRecommendedProjects().map(project => (
            <div key={project.id} className="glass-card overflow-hidden card-hover">
              <div className="h-40 w-full relative">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-medium line-clamp-1">{project.name}</h4>
                  <p className="text-white/80 text-sm line-clamp-1">{project.organization}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-charity-800">
                    ${project.raised.toLocaleString()} raised
                  </span>
                  <span className="text-xs text-muted-foreground">
                    of ${project.goal.toLocaleString()}
                  </span>
                </div>
                
                <div className="mt-4">
                  <Link
                    to={`/projects/${project.id}`}
                    className="btn-primary text-sm w-full py-2"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
