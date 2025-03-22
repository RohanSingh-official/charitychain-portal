
import { Check, Clock, AlertTriangle } from 'lucide-react';

const MilestoneTracker = ({ milestones, userRole }) => {
  // Sort milestones by ID to ensure correct order
  const sortedMilestones = [...milestones].sort((a, b) => a.id - b.id);
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-charity-800">Project Milestones</h3>
      
      <div className="space-y-4">
        {sortedMilestones.map((milestone, index) => (
          <div key={milestone.id} className="glass-card p-6">
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
                {getStatusIcon(milestone.status)}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium text-charity-800">{milestone.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                    milestone.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {milestone.status.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="mt-1 text-sm text-muted-foreground">
                  {milestone.description}
                </p>
                
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span className="text-charity-700 font-medium">
                    ${milestone.amount.toLocaleString()}
                  </span>
                  
                  {milestone.completedDate && (
                    <span className="text-muted-foreground">
                      Completed on {new Date(milestone.completedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                {/* Action buttons based on user role and milestone status */}
                {(userRole === 'ngo' && milestone.status === 'in_progress') && (
                  <div className="mt-4">
                    <button className="btn-secondary text-sm py-1.5 px-3">
                      Mark as Complete
                    </button>
                  </div>
                )}
                
                {(userRole === 'beneficiary' && milestone.status === 'completed' && !milestone.proof) && (
                  <div className="mt-4">
                    <button className="btn-secondary text-sm py-1.5 px-3">
                      Verify Completion
                    </button>
                  </div>
                )}
                
                {(userRole === 'auditor' && milestone.status === 'completed' && milestone.proof) && (
                  <div className="mt-4">
                    <button className="btn-primary text-sm py-1.5 px-3">
                      Approve & Release Funds
                    </button>
                  </div>
                )}
                
                {/* Proof of completion */}
                {milestone.proof && (
                  <div className="mt-3">
                    <a 
                      href={milestone.proof} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-charity-600 hover:text-charity-700 underline"
                    >
                      View verification evidence
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTracker;
