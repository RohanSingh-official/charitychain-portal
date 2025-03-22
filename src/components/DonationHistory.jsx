
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { mockProjects } from '@/utils/mockData';
import { shortenAddress } from '@/utils/web3';

const DonationHistory = ({ donations }) => {
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  
  // Get project details by ID
  const getProjectName = (projectId) => {
    const project = mockProjects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };
  
  // Sort donations by date
  const sortedDonations = [...donations].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-charity-800">Donation History</h3>
        <button 
          onClick={toggleSortOrder}
          className="inline-flex items-center text-sm text-charity-600 hover:text-charity-700"
        >
          {sortOrder === 'desc' ? (
            <>
              Newest first 
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Oldest first
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>
      
      <div className="glass-card divide-y divide-gray-100">
        {sortedDonations.length > 0 ? (
          sortedDonations.map(donation => (
            <div key={donation.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <Link 
                    to={`/projects/${donation.projectId}`}
                    className="text-charity-700 hover:text-charity-600 font-medium"
                  >
                    {getProjectName(donation.projectId)}
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formatDate(donation.date)}
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="font-medium text-charity-800">
                    ${donation.amount.toLocaleString()}
                  </span>
                  
                  <a 
                    href={`https://etherscan.io/tx/${donation.transactionHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-charity-600 hover:text-charity-700 inline-flex items-center mt-1"
                  >
                    {shortenAddress(donation.transactionHash)}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No donations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
