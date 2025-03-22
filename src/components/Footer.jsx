
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-semibold text-charity-800">
                Charity<span className="text-charity-500">Chain</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Revolutionizing charitable giving with blockchain technology for complete transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Github" className="text-gray-400 hover:text-charity-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-charity-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-charity-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/projects" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">Projects</Link></li>
              <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">About</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">Tutorials</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-charity-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CharityChain. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-charity-600" /> for a transparent future
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
