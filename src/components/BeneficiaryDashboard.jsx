
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Check, 
  AlertCircle,
  MapPin,
  Calendar
} from 'lucide-react';
import { mockProjects, mockBeneficiary } from '@/utils/mockData';

const BeneficiaryDashboard = ({ userAddress }) => {
  const [beneficiaryInfo, setBeneficiaryInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  
  // Load beneficiary data and projects
  useEffect(() => {
    // In a real app, we would fetch from the blockchain
    // For now, use mock data
    setBeneficiaryInfo(mockBeneficiary);
    
    // Get projects that the beneficiary is involved with
    const relatedProjects = mockProjects.filter(p => 
      mockBeneficiary.projects.includes(p.id)
    );
    setProjects(relatedProjects);
    
    // Find milestones that need verification
    const verifications = relatedProjects.flatMap(project => 
      project.milestones
        .filter(m => m.status === 'completed' && !m.proof)
        .map(milestone => ({
          projectId: project.id,
          projectName: project.name,
          milestone
        }))
    );
    
    setPendingVerifications(verifications);
  }, [userAddress]);
  
  return (
    <div className="space-y-8">
      {/* Beneficiary Profile */}
      {beneficiaryInfo && (
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full p-3 bg-charity-100 text-charity-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium text-charity-800">{beneficiaryInfo.name}</h2>
              <p className="text-sm text-muted-foreground">{beneficiaryInfo.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 text-charity-600" />
              <span>{beneficiaryInfo.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-charity-600" />
              <span>Registered {new Date(beneficiaryInfo.registeredDate).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2 text-charity-600" />
              <span>{projects.length} projects</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Pending Verifications */}
      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="text-xl font-medium text-charity-800">Pending Verifications</h3>
          {pendingVerifications.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-charity-100 text-charity-600 text-xs font-medium">
              {pendingVerifications.length}
            </span>
          )}
        </div>
        
        {pendingVerifications.length > 0 ? (
          <div className="glass-card divide-y divide-gray-100">
            {pendingVerifications.map(({ projectId, projectName, milestone }) => (
              <div key={`${projectId}-${milestone.id}`} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <Link 
                      to={`/projects/${projectId}`}
                      className="text-charity-800 hover:text-charity-600 font-medium"
                    >
                      {projectName}
                    </Link>
                    
                    <h4 className="text-sm font-medium mt-1">
                      Milestone: {milestone.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.description}
                    </p>
                  </div>
                  
                  <button className="btn-primary text-sm py-1.5 px-3 flex items-center">
                    <Check className="mr-1 h-4 w-4" />
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-charity-800 mb-2">No Pending Verifications</h4>
            <p className="text-muted-foreground">
              You don't have any milestones waiting for verification right now.
            </p>
          </div>
        )}
      </div>
      
      {/* Projects */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-charity-800">Current Projects</h3>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => {
              // Calculate number of completed milestones
              const totalMilestones = project.milestones.length;
              const completedMilestones = project.milestones.filter(m => 
                m.status === 'completed'
              ).length;
              
              return (
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
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-muted-foreground">
                        <strong className="text-charity-700">
                          ${project.raised.toLocaleString()}
                        </strong> raised of ${project.goal.toLocaleString()} goal
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <strong className="text-charity-700">
                          {completedMilestones}/{totalMilestones}
                        </strong> milestones
                      </div>
                    </div>
                    
                    <Link
                      to={`/projects/${project.id}`}
                      className="btn-secondary text-sm w-full py-2 text-center"
                    >
                      View Project Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-charity-800 mb-2">No Active Projects</h4>
            <p className="text-muted-foreground">
              You are not currently associated with any active projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryDashboard;
