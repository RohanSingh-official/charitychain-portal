
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  CheckCircle,
  Award,
  Briefcase
} from 'lucide-react';
import { mockProjects, mockAuditor } from '@/utils/mockData';

const AuditorDashboard = ({ userAddress }) => {
  const [auditorInfo, setAuditorInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  
  // Load auditor data and projects
  useEffect(() => {
    // In a real app, we would fetch from the blockchain
    // For now, use mock data
    setAuditorInfo(mockAuditor);
    
    // Get projects that the auditor is involved with
    const relatedProjects = mockProjects.filter(p => 
      mockAuditor.projectsAudited.includes(p.id)
    );
    setProjects(relatedProjects);
    
    // Find milestones that need approval
    const approvals = relatedProjects.flatMap(project => 
      project.milestones
        .filter(m => m.status === 'completed' && m.proof && !m.completedDate)
        .map(milestone => ({
          projectId: project.id,
          projectName: project.name,
          organization: project.organization,
          milestone
        }))
    );
    
    setPendingApprovals(approvals);
  }, [userAddress]);
  
  return (
    <div className="space-y-8">
      {/* Auditor Profile */}
      {auditorInfo && (
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full p-3 bg-charity-100 text-charity-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium text-charity-800">{auditorInfo.name}</h2>
              <p className="text-sm text-muted-foreground">{auditorInfo.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Award className="h-4 w-4 mr-2 text-charity-600" />
              <span>Credentials: {auditorInfo.credentials}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4 mr-2 text-charity-600" />
              <span>Projects Audited: {auditorInfo.projectsAudited.length}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Pending Approvals</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            {pendingApprovals.length}
          </p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Projects Audited</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            {auditorInfo?.projectsAudited.length || 0}
          </p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Active Projects</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            {projects.length}
          </p>
        </div>
      </div>
      
      {/* Pending Approvals */}
      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="text-xl font-medium text-charity-800">Pending Milestone Approvals</h3>
          {pendingApprovals.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-charity-100 text-charity-600 text-xs font-medium">
              {pendingApprovals.length}
            </span>
          )}
        </div>
        
        {pendingApprovals.length > 0 ? (
          <div className="glass-card divide-y divide-gray-100">
            {pendingApprovals.map(({ projectId, projectName, organization, milestone }) => (
              <div key={`${projectId}-${milestone.id}`} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <Link 
                      to={`/projects/${projectId}`}
                      className="text-charity-800 hover:text-charity-600 font-medium"
                    >
                      {projectName}
                    </Link>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      Organization: {organization}
                    </p>
                    
                    <h4 className="text-sm font-medium mt-3">
                      Milestone: {milestone.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.description}
                    </p>
                    
                    <p className="text-sm text-charity-700 font-medium mt-2">
                      Amount: ${milestone.amount.toLocaleString()}
                    </p>
                    
                    <a 
                      href={milestone.proof} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-charity-600 hover:text-charity-700 underline mt-2 inline-block"
                    >
                      View verification evidence
                    </a>
                  </div>
                  
                  <div className="flex flex-col gap-2 sm:w-36">
                    <button className="btn-primary text-sm py-1.5 px-3 flex items-center justify-center">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Approve
                    </button>
                    
                    <button className="btn-secondary text-sm py-1.5 px-3 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-charity-800 mb-2">No Pending Approvals</h4>
            <p className="text-muted-foreground">
              There are no milestones waiting for your approval right now.
            </p>
          </div>
        )}
      </div>
      
      {/* Projects being audited */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-charity-800">Projects Under Audit</h3>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
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
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong className="text-charity-700">
                      ${project.raised.toLocaleString()}
                    </strong> of ${project.goal.toLocaleString()} raised
                  </div>
                  
                  <Link
                    to={`/projects/${project.id}`}
                    className="btn-secondary text-sm w-full py-2 text-center"
                  >
                    View Project Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-medium text-charity-800 mb-2">No Projects Under Audit</h4>
            <p className="text-muted-foreground">
              You are not currently auditing any active projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditorDashboard;
