
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  TrendingUp, 
  LineChart, 
  Heart, 
  Users, 
  Building2, 
  ArrowRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoleSelector from '@/components/RoleSelector';
import { mockProjects, userRoles } from '@/utils/mockData';

const Index = () => {
  const [userRole, setUserRole] = useState(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  
  const handleRoleSelection = (role) => {
    setUserRole(role);
    // In a real app, we would store this in state management and/or local storage
    // Redirect to dashboard after role selection
    window.location.href = '/dashboard';
  };
  
  // Featured projects for the home page
  const featuredProjects = mockProjects.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 hero-section">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <motion.h1 
                className="text-4xl md:text-6xl font-medium tracking-tight text-charity-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Transparent Charitable Giving <br />
                <span className="text-charity-500">Powered by Blockchain</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                CharityChain provides complete transparency for donations, 
                ensuring your contributions make a real impact.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button 
                  onClick={() => setShowRoleSelector(true)} 
                  className="btn-primary"
                >
                  Get Started Now
                </button>
                
                <Link to="/projects" className="btn-secondary">
                  Explore Projects
                </Link>
              </motion.div>
            </div>
            
            {/* Role selector modal */}
            {showRoleSelector && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div 
                  className="glass-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button 
                    onClick={() => setShowRoleSelector(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                  <RoleSelector onRoleSelect={handleRoleSelection} />
                </motion.div>
              </div>
            )}
            
            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              <motion.div 
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-charity-100 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-8 w-8 text-charity-600" />
                </div>
                <h3 className="text-xl font-medium text-charity-800 mb-3">Complete Transparency</h3>
                <p className="text-muted-foreground">
                  Track every donation from the moment it's made to its final impact, 
                  all secured on the blockchain.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-charity-100 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-charity-600" />
                </div>
                <h3 className="text-xl font-medium text-charity-800 mb-3">Milestone-Based Funding</h3>
                <p className="text-muted-foreground">
                  Funds are released only when verified milestones are reached, 
                  ensuring accountability.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-charity-100 flex items-center justify-center mb-6">
                  <LineChart className="h-8 w-8 text-charity-600" />
                </div>
                <h3 className="text-xl font-medium text-charity-800 mb-3">Real Impact Reporting</h3>
                <p className="text-muted-foreground">
                  Get detailed impact reports and see the real-world difference 
                  your contributions make.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Role Section */}
        <section className="py-20 px-4 bg-charity-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="section-title">How It Works For Everyone</h2>
              <p className="section-subtitle">
                Our platform connects all stakeholders in the charitable giving ecosystem, 
                providing transparency and accountability at every step.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                className="glass-card p-6"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-charity-100 flex items-center justify-center mb-6">
                  <Heart className="h-7 w-7 text-charity-600" />
                </div>
                <h3 className="text-xl font-medium text-charity-800 mb-3">For Donors</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Track your donations in real-time
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    See detailed impact reports
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Verify project milestones
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Connect directly with beneficiaries
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-charity-100 flex items-center justify-center mb-6">
                  <Building2 className="h-7 w-7 text-charity-600" />
                </div>
                <h3 className="text-xl font-medium text-charity-800 mb-3">For NGOs</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Create transparent funding projects
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Define clear project milestones
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Build donor trust through transparency
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Receive funds based on verified progress
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-charity-100 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-charity-600" />
                </div>
                <h3 className="text-xl font-medium text-charity-800 mb-3">For Beneficiaries</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Verify project implementation
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Provide feedback on project impact
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Ensure resources reach intended destination
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Communicate directly with donors
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-14 h-14 rounded-full bg-charity-100 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-7 w-7 text-charity-600" />
                </div>
                <h3 className="text-xl font-medium text-charity-800 mb-3">For Auditors</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Review project milestones
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Validate completion evidence
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Approve fund disbursements
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Ensure compliance with project goals
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Projects */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Discover impactful projects that are making a difference around the world.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="glass-card overflow-hidden card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <div className="h-48 w-full relative">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-charity-500/90 text-white rounded-full backdrop-blur-sm">
                        {project.organization}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Link to={`/projects/${project.id}`}>
                      <h3 className="text-xl font-medium text-charity-800 hover:text-charity-600 transition-colors mb-2">
                        {project.name}
                      </h3>
                    </Link>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-charity-700 font-medium">
                        ${project.raised.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        of ${project.goal.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-charity-100 rounded-full h-1.5 mb-4">
                      <div 
                        className="bg-charity-500 h-1.5 rounded-full"
                        style={{ width: `${Math.min(Math.round((project.raised / project.goal) * 100), 100)}%` }}
                      ></div>
                    </div>
                    
                    <Link 
                      to={`/projects/${project.id}`}
                      className="btn-primary w-full text-center text-sm py-2"
                    >
                      View Project
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/projects"
                className="btn-secondary inline-flex items-center"
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-charity-700 to-charity-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to Make a Transparent Impact?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join our platform to revolutionize charitable giving with blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowRoleSelector(true)}
                className="btn-primary bg-white text-charity-700 hover:bg-gray-100"
              >
                Get Started Now
              </button>
              <Link 
                to="/about"
                className="btn-secondary bg-transparent border-white text-white hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
