
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Building2, 
  Users, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { userRoles } from '@/utils/mockData';

const RoleSelector = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  
  const roles = [
    { id: userRoles.DONOR, name: 'Donor', icon: Heart, description: 'Support projects and track your impact' },
    { id: userRoles.NGO, name: 'NGO', icon: Building2, description: 'Create and manage charitable projects' },
    { id: userRoles.BENEFICIARY, name: 'Beneficiary', icon: Users, description: 'Receive aid and verify project milestones' },
    { id: userRoles.AUDITOR, name: 'Auditor', icon: ShieldCheck, description: 'Verify and audit project activities' },
  ];
  
  const handleRoleSelect = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-medium text-center mb-2 text-charity-800">Select Your Role</h2>
      <p className="text-center text-muted-foreground mb-8">Choose how you want to interact with the platform</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <motion.div
              key={role.id}
              className={`glass-card p-6 cursor-pointer transition-all card-hover ${
                isSelected ? 'ring-2 ring-charity-500 bg-charity-50/50' : ''
              }`}
              onClick={() => setSelectedRole(role.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                isSelected ? 'bg-charity-500 text-white' : 'bg-charity-100 text-charity-600'
              }`}>
                <role.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-charity-800">{role.name}</h3>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </motion.div>
          );
        })}
      </div>
      
      <div className="text-center">
        <button
          onClick={handleRoleSelect}
          disabled={!selectedRole}
          className={`btn-primary inline-flex items-center ${!selectedRole ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
