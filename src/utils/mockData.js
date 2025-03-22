
export const mockProjects = [
  {
    id: 1,
    name: "Clean Water Initiative",
    organization: "WaterWorks NGO",
    description: "Providing clean water solutions to remote villages in Africa",
    goal: 50000,
    raised: 32500,
    endDate: "2023-12-31",
    image: "https://images.unsplash.com/photo-1541257710737-06d667133a53",
    milestones: [
      {
        id: 1,
        title: "Initial Assessment",
        description: "Survey of local water sources and needs",
        amount: 10000,
        status: "completed",
        proof: "https://example.com/proof1",
        completedDate: "2023-06-15"
      },
      {
        id: 2,
        title: "Equipment Purchase",
        description: "Purchase of water purification systems",
        amount: 20000,
        status: "in_progress",
        proof: null,
        completedDate: null
      },
      {
        id: 3,
        title: "Installation",
        description: "Installation of systems in 5 villages",
        amount: 15000,
        status: "pending",
        proof: null,
        completedDate: null
      },
      {
        id: 4,
        title: "Training & Handover",
        description: "Training local technicians and formal handover",
        amount: 5000,
        status: "pending",
        proof: null,
        completedDate: null
      }
    ],
    updates: [
      {
        id: 1,
        date: "2023-05-20",
        title: "Project Kickoff",
        content: "We're excited to announce the launch of our Clean Water Initiative!"
      },
      {
        id: 2,
        date: "2023-06-18",
        title: "Initial Assessment Completed",
        content: "Our team has successfully completed the initial assessment of 8 villages in the region."
      }
    ]
  },
  {
    id: 2,
    name: "Education For All",
    organization: "BrightFuture Foundation",
    description: "Building schools and providing educational resources for underprivileged children",
    goal: 120000,
    raised: 78000,
    endDate: "2023-11-30",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    milestones: [
      {
        id: 1,
        title: "Land Acquisition",
        description: "Purchase of land for school construction",
        amount: 40000,
        status: "completed",
        proof: "https://example.com/proof-land",
        completedDate: "2023-04-10"
      },
      {
        id: 2,
        title: "Building Construction",
        description: "Construction of the main school building",
        amount: 50000,
        status: "in_progress",
        proof: null,
        completedDate: null
      },
      {
        id: 3,
        title: "Furniture & Equipment",
        description: "Purchase of desks, chairs, and educational equipment",
        amount: 20000,
        status: "pending",
        proof: null,
        completedDate: null
      },
      {
        id: 4,
        title: "Teacher Recruitment & Training",
        description: "Hiring and training of teaching staff",
        amount: 10000,
        status: "pending",
        proof: null,
        completedDate: null
      }
    ],
    updates: [
      {
        id: 1,
        date: "2023-03-15",
        title: "Project Announcement",
        content: "We're thrilled to announce our new Education For All initiative!"
      },
      {
        id: 2,
        date: "2023-04-12",
        title: "Land Acquired",
        content: "We have successfully acquired the perfect plot of land for our new school."
      },
      {
        id: 3,
        date: "2023-06-01",
        title: "Construction Begins",
        content: "Construction of the main school building has officially started today."
      }
    ]
  },
  {
    id: 3,
    name: "Sustainable Farming Project",
    organization: "GreenHarvest",
    description: "Empowering local farmers with sustainable agricultural practices",
    goal: 75000,
    raised: 42000,
    endDate: "2024-02-28",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad",
    milestones: [
      {
        id: 1,
        title: "Farmer Selection",
        description: "Selection and onboarding of participating farmers",
        amount: 5000,
        status: "completed",
        proof: "https://example.com/proof-selection",
        completedDate: "2023-05-20"
      },
      {
        id: 2,
        title: "Training Program",
        description: "Comprehensive training on sustainable farming techniques",
        amount: 15000,
        status: "completed",
        proof: "https://example.com/proof-training",
        completedDate: "2023-07-15"
      },
      {
        id: 3,
        title: "Equipment Distribution",
        description: "Provision of tools and equipment to farmers",
        amount: 30000,
        status: "in_progress",
        proof: null,
        completedDate: null
      },
      {
        id: 4,
        title: "Irrigation Systems",
        description: "Installation of efficient irrigation systems",
        amount: 20000,
        status: "pending",
        proof: null,
        completedDate: null
      },
      {
        id: 5,
        title: "Market Access Support",
        description: "Establishing connections to fair trade markets",
        amount: 5000,
        status: "pending",
        proof: null,
        completedDate: null
      }
    ],
    updates: [
      {
        id: 1,
        date: "2023-04-05",
        title: "Project Launch",
        content: "Excited to launch our Sustainable Farming Project to support local farmers!"
      },
      {
        id: 2,
        date: "2023-05-25",
        title: "Farmers Onboarded",
        content: "We've selected 50 farmers to participate in our program."
      },
      {
        id: 3,
        date: "2023-07-20",
        title: "Training Completed",
        content: "All participating farmers have completed the comprehensive training program."
      }
    ]
  },
  {
    id: 4,
    name: "Healthcare Outreach",
    organization: "Global Health Alliance",
    description: "Mobile healthcare services for remote communities",
    goal: 95000,
    raised: 61000,
    endDate: "2023-12-15",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982",
    milestones: [
      {
        id: 1,
        title: "Vehicle Purchase",
        description: "Acquisition of mobile healthcare units",
        amount: 45000,
        status: "completed",
        proof: "https://example.com/proof-vehicles",
        completedDate: "2023-06-10"
      },
      {
        id: 2,
        title: "Equipment Procurement",
        description: "Medical equipment and supplies for mobile units",
        amount: 30000,
        status: "in_progress",
        proof: null,
        completedDate: null
      },
      {
        id: 3,
        title: "Staff Recruitment",
        description: "Hiring and training of medical personnel",
        amount: 15000,
        status: "pending",
        proof: null,
        completedDate: null
      },
      {
        id: 4,
        title: "Program Launch",
        description: "Initiation of healthcare services in target communities",
        amount: 5000,
        status: "pending",
        proof: null,
        completedDate: null
      }
    ],
    updates: [
      {
        id: 1,
        date: "2023-05-01",
        title: "Project Kickoff",
        content: "We're launching our Healthcare Outreach project to provide essential medical services to remote areas."
      },
      {
        id: 2,
        date: "2023-06-15",
        title: "Mobile Units Acquired",
        content: "We have purchased and received our specialized healthcare vehicles."
      }
    ]
  }
];

export const mockDonations = [
  {
    id: 1,
    projectId: 1,
    donor: "0x1234...5678",
    amount: 5000,
    date: "2023-05-12",
    status: "completed",
    transactionHash: "0xabcd...1234"
  },
  {
    id: 2,
    projectId: 1,
    donor: "0x8765...4321",
    amount: 2500,
    date: "2023-05-15",
    status: "completed",
    transactionHash: "0xefgh...5678"
  },
  {
    id: 3,
    projectId: 2,
    donor: "0x1234...5678",
    amount: 10000,
    date: "2023-04-20",
    status: "completed",
    transactionHash: "0xijkl...9012"
  },
  {
    id: 4,
    projectId: 3,
    donor: "0x9876...5432",
    amount: 7500,
    date: "2023-06-05",
    status: "completed",
    transactionHash: "0xmnop...3456"
  },
  {
    id: 5,
    projectId: 4,
    donor: "0x5432...1098",
    amount: 15000,
    date: "2023-06-20",
    status: "completed",
    transactionHash: "0xqrst...7890"
  }
];

export const userRoles = {
  DONOR: "donor",
  NGO: "ngo",
  BENEFICIARY: "beneficiary",
  AUDITOR: "auditor"
};

export const mockUser = {
  address: "0x1234...5678",
  role: userRoles.DONOR,
  name: "Alex Johnson",
  totalDonated: 15000,
  projectsSupported: 2,
  joinedDate: "2023-04-15"
};

export const mockNgo = {
  address: "0x8765...4321",
  role: userRoles.NGO,
  name: "WaterWorks NGO",
  description: "Providing clean water solutions globally",
  projects: [1],
  verified: true,
  establishedDate: "2010-03-22"
};

export const mockBeneficiary = {
  address: "0x9876...5432",
  role: userRoles.BENEFICIARY,
  name: "Kibera Community",
  description: "A community of 5,000 people in the Kibera district",
  projects: [1, 4],
  location: "Kibera, Kenya",
  registeredDate: "2023-01-10"
};

export const mockAuditor = {
  address: "0x5432...1098",
  role: userRoles.AUDITOR,
  name: "Transparency International",
  description: "Independent auditing organization ensuring proper use of funds",
  projectsAudited: [1, 2, 4],
  credentials: "ISO 9001, Global Audit Certification",
  joinedDate: "2022-11-05"
};
