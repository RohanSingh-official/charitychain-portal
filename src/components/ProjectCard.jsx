
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Target, 
  Clock 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProjectCard = ({ project }) => {
  const { 
    id, 
    name, 
    organization, 
    description, 
    goal, 
    raised, 
    endDate,
    image 
  } = project;
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((raised / goal) * 100), 100);
  
  // Calculate days left
  const daysLeft = () => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <motion.div 
      className="glass-card overflow-hidden card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-charity-500/90 text-white rounded-full backdrop-blur-sm">
            {organization}
          </span>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        <Link to={`/projects/${id}`}>
          <h3 className="text-xl font-medium text-charity-800 hover:text-charity-600 transition-colors mb-2">
            {name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-charity-800">
              {formatCurrency(raised)} raised
            </span>
            <span className="text-sm text-muted-foreground">
              {progressPercentage}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-charity-100" indicatorClassName="bg-charity-500" />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              <Target className="inline h-3 w-3 mr-1" />
              Goal: {formatCurrency(goal)}
            </span>
            <span className="text-xs text-muted-foreground">
              <Clock className="inline h-3 w-3 mr-1" />
              {daysLeft()} days left
            </span>
          </div>
        </div>
        
        {/* Action */}
        <div className="mt-5 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            <Users className="inline h-3 w-3 mr-1" />
            {Math.floor(Math.random() * 50) + 10} donors
          </span>
          <Link 
            to={`/projects/${id}`}
            className="text-sm font-medium text-charity-600 hover:text-charity-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
