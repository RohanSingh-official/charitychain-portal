
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects, userRoles } from '@/utils/mockData';

const Projects = () => {
  const [userRole, setUserRole] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Load projects
  useEffect(() => {
    // In a real app, we would fetch from the blockchain
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...projects];
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      // In a real app, projects would have categories
      // For mock data, we'll simulate categories based on project ID
      result = result.filter(project => project.id % 2 === (selectedCategory === 'education' ? 0 : 1));
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      // Assume higher IDs are newer projects
      result = result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'funded') {
      result = result.sort((a, b) => (b.raised / b.goal) - (a.raised / a.goal));
    } else if (sortBy === 'goal') {
      result = result.sort((a, b) => b.goal - a.goal);
    }
    
    setFilteredProjects(result);
  }, [projects, searchTerm, selectedCategory, sortBy]);
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'education', name: 'Education' },
    { id: 'water', name: 'Water & Sanitation' },
    { id: 'health', name: 'Healthcare' },
    { id: 'food', name: 'Food & Agriculture' }
  ];
  
  // Sort options
  const sortOptions = [
    { id: 'newest', name: 'Newest First' },
    { id: 'funded', name: 'Most Funded' },
    { id: 'goal', name: 'Largest Goal' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium text-charity-800 mb-2">
                Projects
              </h1>
              <p className="text-muted-foreground">
                Discover and support transparent charitable projects
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden btn-secondary inline-flex items-center"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className={`hidden md:block w-64 flex-shrink-0`}>
              <div className="glass-card p-6 space-y-6">
                {/* Search */}
                <div>
                  <h3 className="text-sm font-medium text-charity-800 mb-3">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-charity-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-charity-800 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedCategory === category.id
                            ? 'bg-charity-100 text-charity-700 font-medium'
                            : 'text-muted-foreground hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Sort */}
                <div>
                  <h3 className="text-sm font-medium text-charity-800 mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {sortOptions.map(option => (
                      <button
                        key={option.id}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          sortBy === option.id
                            ? 'bg-charity-100 text-charity-700 font-medium'
                            : 'text-muted-foreground hover:bg-gray-50'
                        }`}
                        onClick={() => setSortBy(option.id)}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                  className="glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-charity-800">Filters</h3>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {/* Search */}
                  <div>
                    <h3 className="text-sm font-medium text-charity-800 mb-3">Search</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-charity-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-medium text-charity-800 mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                            selectedCategory === category.id
                              ? 'bg-charity-100 text-charity-700 font-medium'
                              : 'text-muted-foreground hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort */}
                  <div>
                    <h3 className="text-sm font-medium text-charity-800 mb-3">Sort By</h3>
                    <div className="space-y-2">
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                            sortBy === option.id
                              ? 'bg-charity-100 text-charity-700 font-medium'
                              : 'text-muted-foreground hover:bg-gray-50'
                          }`}
                          onClick={() => setSortBy(option.id)}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="btn-primary w-full"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Projects Grid */}
            <div className="flex-1">
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <Filter className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium text-charity-800 mb-2">No matching projects</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find projects.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSortBy('newest');
                    }}
                    className="btn-secondary mt-4"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
