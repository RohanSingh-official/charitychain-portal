
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Target, 
  TrendingUp, 
  Plus,
  BarChart3
} from 'lucide-react';
import { mockProjects, mockNgo } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';

const NgoDashboard = ({ userAddress }) => {
  const [ngoProjects, setNgoProjects] = useState([]);
  const [ngoInfo, setNgoInfo] = useState(null);
  const [stats, setStats] = useState({
    totalRaised: 0,
    activeProjects: 0,
    totalMilestones: 0,
    completedMilestones: 0
  });
  
  // Load NGO data and projects
  useEffect(() => {
    // In a real app, we would fetch from the blockchain
    // For now, use mock data
    setNgoInfo(mockNgo);
    
    const projects = mockProjects.filter(p => mockNgo.projects.includes(p.id));
    setNgoProjects(projects);
    
    // Calculate stats
    const totalRaised = projects.reduce((sum, project) => sum + project.raised, 0);
    const activeProjects = projects.filter(p => new Date(p.endDate) > new Date()).length;
    
    const allMilestones = projects.flatMap(p => p.milestones);
    const totalMilestones = allMilestones.length;
    const completedMilestones = allMilestones.filter(m => m.status === 'completed').length;
    
    setStats({
      totalRaised,
      activeProjects,
      totalMilestones,
      completedMilestones
    });
  }, [userAddress]);
  
  return (
    <div className="space-y-8">
      {/* NGO Profile */}
      {ngoInfo && (
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full p-3 bg-charity-100 text-charity-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium text-charity-800">{ngoInfo.name}</h2>
              <p className="text-sm text-muted-foreground">{ngoInfo.description}</p>
            </div>
            {ngoInfo.verified && (
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Established {new Date(ngoInfo.establishedDate).toLocaleDateString()}</p>
            <p className="mt-1">Wallet: {userAddress}</p>
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Total Raised</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            ${stats.totalRaised.toLocaleString()}
          </p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Active Projects</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            {stats.activeProjects}
          </p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Milestone Progress</h3>
          </div>
          <p className="mt-4 text-2xl font-semibold text-charity-800">
            {stats.completedMilestones} / {stats.totalMilestones}
          </p>
          <Progress 
            value={(stats.completedMilestones / Math.max(stats.totalMilestones, 1)) * 100} 
            className="h-2 mt-2 bg-charity-100" 
            indicatorClassName="bg-charity-500" 
          />
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-charity-100 text-charity-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-charity-800">Total Projects</h3>
          </div>
          <p className="mt-4 text-3xl font-semibold text-charity-800">
            {ngoProjects.length}
          </p>
        </div>
      </div>
      
      {/* Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium text-charity-800">Your Projects</h3>
          <Link 
            to="/create-project" 
            className="btn-primary text-sm py-2 inline-flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" />
            Create Project
          </Link>
        </div>
        
        {ngoProjects.length > 0 ? (
          <div className="glass-card divide-y divide-gray-100">
            {ngoProjects.map(project => {
              // Calculate progress percentage
              const progressPercentage = Math.min(Math.round((project.raised / project.goal) * 100), 100);
              
              return (
                <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-24 sm:h-16 aspect-video overflow-hidden rounded">
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <Link 
                        to={`/projects/${project.id}`}
                        className="text-charity-800 hover:text-charity-600 font-medium"
                      >
                        {project.name}
                      </Link>
                      
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {project.description}
                      </p>
                      
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                          <span>${project.raised.toLocaleString()} raised</span>
                          <span>{progressPercentage}%</span>
                        </div>
                        <Progress 
                          value={progressPercentage} 
                          className="h-1.5 bg-charity-100" 
                          indicatorClassName="bg-charity-500" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 sm:w-32">
                      <Link 
                        to={`/projects/${project.id}`}
                        className="btn-secondary text-xs py-1.5 text-center"
                      >
                        View Details
                      </Link>
                      <Link 
                        to={`/projects/${project.id}/edit`}
                        className="btn-secondary text-xs py-1.5 text-center"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't created any projects yet.</p>
            <Link 
              to="/create-project" 
              className="btn-primary inline-flex items-center"
            >
              <Plus className="mr-1 h-4 w-4" />
              Create Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NgoDashboard;
