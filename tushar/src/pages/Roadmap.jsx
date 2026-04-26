import React, { useState } from 'react';
import { 
  Map, Milestone, BookOpen, CheckCircle, ChevronRight,
  Globe, Layout, Code, Zap, Layers, CheckSquare,
  Terminal, Cpu, Database, Server, Share2, Shield, MessageSquare,
  Box, Code2, CloudRain, Activity, Cloud, Lock, FileText, Maximize,
  PenTool, Users, Monitor, Eye, Calculator, BarChart, PieChart, Brain, Rocket, Download, Search, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const roadmapsData = {
  "Development": [
    { title: "Internet Fundamentals", desc: "Understand how the web works underneath.", points: ["HTTP/HTTPS & DNS", "Browsers & DOM", "Hosting Basics"], icon: Globe },
    { title: "HTML, CSS & Layouts", desc: "Building the visual structure.", points: ["Semantic HTML5", "CSS Grid & Flexbox", "Responsive Design"], icon: Layout },
    { title: "JavaScript Core", desc: "Adding interactivity to your sites.", points: ["Variables & Data Structures", "Functions & Scope", "DOM Manipulation"], icon: Code },
    { title: "Modern JavaScript (ES6+)", desc: "Advanced JS concepts.", points: ["Promises & Async/Await", "ES6 Modules", "Fetch API"], icon: Zap },
    { title: "Frontend Frameworks", desc: "Building complex UIs.", points: ["React.js Basics", "State Management", "Component Architecture"], icon: Layers },
    { title: "Version Control", desc: "Managing codebase history.", points: ["Git commands", "Branching & Merging", "GitHub Workflows"], icon: Share2 },
    { title: "Testing & Deployment", desc: "Ensuring quality and delivering apps.", points: ["Jest & RTL", "Vercel / Netlify"], icon: CheckSquare }
  ],
  "Backend Engineer": [
    { title: "Internet & OS", desc: "Core computing concepts.", points: ["Process vs Thread", "Memory Management", "Linux Commands"], icon: Terminal },
    { title: "Language Mastery", desc: "Choose your primary backend weapon.", points: ["Node.js / Python / Java", "Concurrency", "Package Managers"], icon: Cpu },
    { title: "Relational Databases", desc: "Structured data storage.", points: ["PostgreSQL / MySQL", "SQL Queries", "ACID Properties"], icon: Database },
    { title: "NoSQL Databases", desc: "Unstructured & fast caching.", points: ["MongoDB", "Redis Caching", "NoSQL vs SQL"], icon: Server },
    { title: "APIs & Arch Patterns", desc: "Connecting the frontend.", points: ["RESTful APIs", "GraphQL", "Monolith vs Microservices"], icon: Share2 },
    { title: "Security", desc: "Protecting your endpoints.", points: ["OAuth 2.0 & JWT", "Hashing (Bcrypt)", "CORS & CSRF"], icon: Shield },
    { title: "Message Brokers", desc: "Asynchronous communication.", points: ["RabbitMQ / Kafka", "Pub/Sub Pattern", "Event-driven arch"], icon: MessageSquare }
  ],
  "DevOps": [
    { title: "Programming Basics", desc: "Scripting and automation.", points: ["Python or Go", "Bash Scripting", "Working with JSON/YAML"], icon: Code2 },
    { title: "Linux & OS Concepts", desc: "The foundation of infrastructure.", points: ["Linux administration", "Networking (TCP/IP)", "SSH & Security basics"], icon: Terminal },
    { title: "Containers", desc: "Packaging applications.", points: ["Docker Architecture", "Writing Dockerfiles", "Docker Compose"], icon: Box },
    { title: "Container Orchestration", desc: "Managing fleets of containers.", points: ["Kubernetes (K8s)", "Pods & Deployments", "Helm Charts"], icon: Layers },
    { title: "CI/CD Pipelines", desc: "Continuous Integration & Delivery.", points: ["GitHub Actions / GitLab CI", "Jenkins", "Automated Build/Deploy"], icon: Share2 },
    { title: "Infrastructure as Code", desc: "Provisioning via code.", points: ["Terraform", "Ansible", "Immutable Infrastructure"], icon: CloudRain },
    { title: "Monitoring & Observability", desc: "Keeping systems healthy.", points: ["Prometheus & Grafana", "ELK Stack", "Alerting"], icon: Activity }
  ],
  "Cloud": [
    { title: "Cloud Fundamentals", desc: "Understanding the cloud paradigm.", points: ["IaaS, PaaS, SaaS", "Public vs Private Cloud", "Cloud Economics"], icon: Cloud },
    { title: "Core Services", desc: "The basic building blocks.", points: ["Compute (EC2/VMs)", "Storage (S3)", "Networking (VPC)"], icon: Server },
    { title: "Security & IAM", desc: "Securing your cloud resources.", points: ["Identity Management", "Security Groups", "Encryption Concepts"], icon: Lock },
    { title: "Databases in the Cloud", desc: "Managed data solutions.", points: ["RDS / Cloud SQL", "DynamoDB / Firestore", "Data Warehousing"], icon: Database },
    { title: "Serverless Architecture", desc: "Running code without managing servers.", points: ["AWS Lambda", "API Gateway", "Event-driven workflows"], icon: Zap },
    { title: "Infrastructure as Code", desc: "Automating cloud deployments.", points: ["CloudFormation / Terraform", "State Management", "Modular Templates"], icon: FileText },
    { title: "High Availability & Scaling", desc: "Making systems resilient.", points: ["Load Balancing", "Auto Scaling", "Disaster Recovery"], icon: Maximize }
  ],
  "UI/UX": [
    { title: "Design Fundamentals", desc: "The core principles of design.", points: ["Color Theory", "Typography", "Grid Systems"], icon: PenTool },
    { title: "User Research", desc: "Understanding your users.", points: ["User Interviews", "Creating Personas", "Journey Mapping"], icon: Users },
    { title: "Wireframing", desc: "Low-fidelity layouts.", points: ["Information Architecture", "Paper Sketches", "Balsamiq/Whimsical"], icon: Layout },
    { title: "UI Prototyping", desc: "High-fidelity design.", points: ["Figma Mastery", "Component Variants", "Interactive Prototypes"], icon: Monitor },
    { title: "Usability Testing", desc: "Validating your designs.", points: ["A/B Testing", "Heuristic Evaluation", "Analyzing Feedback"], icon: CheckCircle },
    { title: "Design Systems", desc: "Ensuring consistency at scale.", points: ["Creating UI Kits", "Design Tokens", "Handover to Devs"], icon: Layers },
    { title: "Accessibility (a11y)", desc: "Designing for everyone.", points: ["WCAG Guidelines", "Color Contrast", "Screen Readers"], icon: Eye }
  ],
  "Data Science": [
    { title: "Math Fundamentals", desc: "The foundation of data.", points: ["Linear Algebra", "Calculus basics", "Probability & Stats"], icon: Calculator },
    { title: "Programming for Data", desc: "Languages and tools.", points: ["Python Mastery", "Jupyter Notebooks", "SQL basics"], icon: Code },
    { title: "Data Manipulation", desc: "Cleaning and exploring data.", points: ["Pandas & NumPy", "Data Cleaning Techniques", "Exploratory Data Analysis"], icon: BarChart },
    { title: "Data Visualization", desc: "Telling stories with data.", points: ["Matplotlib & Seaborn", "Tableau/PowerBI", "Interactive Dashboards"], icon: PieChart },
    { title: "Machine Learning Concepts", desc: "Predictive modeling.", points: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"], icon: Brain },
    { title: "Deep Learning (Optional)", desc: "Advanced neural networks.", points: ["TensorFlow / PyTorch", "CNNs for Images", "NLP basics"], icon: Cpu },
    { title: "Model Deployment", desc: "Putting models into production.", points: ["Flask/FastAPI APIs", "Dockerizing Models", "Monitoring Drift"], icon: Rocket }
  ],
  "Cybersecurity & IT Security": [
    { title: "IT & Networking Basics", desc: "Understand how data flows.", points: ["OSI & TCP/IP Models", "DNS & DHCP", "Network Topologies"], icon: Globe },
    { title: "Linux & OS Security", desc: "Securing the operating system.", points: ["Bash & Permissions", "Active Directory", "System Hardening"], icon: Terminal },
    { title: "Cryptography & IAM", desc: "Protecting data and access.", points: ["Symmetric vs Asymmetric", "Hashing (SHA/MD5)", "OAuth & MFA"], icon: Lock },
    { title: "Vulnerability Management", desc: "Finding the weak spots.", points: ["Nmap & Wireshark", "Nessus / OpenVAS", "Patch Management"], icon: Eye },
    { title: "Offensive Security (Red Team)", desc: "Thinking like an attacker.", points: ["Web Exploits (OWASP)", "Metasploit", "Social Engineering"], icon: Zap },
    { title: "Defensive Security (Blue Team)", desc: "Building the digital fortress.", points: ["Firewalls & IDS/IPS", "Endpoint Protection (EDR)", "Malware Analysis"], icon: Shield },
    { title: "Incident Response & SOC", desc: "Reacting to breaches.", points: ["SIEM (Splunk)", "Digital Forensics", "Disaster Recovery"], icon: Activity }
  ],
  "Game Development": [
    { title: "Programming Foundations", desc: "The logic of games.", points: ["C++ or C# Mastery", "Object-Oriented Logic", "Memory Management"], icon: Code },
    { title: "Game Math & Physics", desc: "Making games feel real.", points: ["Vectors & Matrices", "Collision Detection", "Kinematics"], icon: Calculator },
    { title: "Game Engine Mastery", desc: "The development environment.", points: ["Unity or Unreal Engine", "Scene Management", "Component Systems"], icon: Layers },
    { title: "2D/3D Assets & Animation", desc: "Breathing life into characters.", points: ["Sprites & Tilemaps", "Rigging & Blend Trees", "Particle Systems"], icon: Monitor },
    { title: "Game AI & Scripting", desc: "Making worlds interactive.", points: ["State Machines", "NavMesh & Pathfinding", "Behavior Trees"], icon: Brain },
    { title: "Multiplayer Network", desc: "Connecting players.", points: ["Client-Server Arch", "RPCs & Syncs", "Matchmaking"], icon: Share2 },
    { title: "Performance & Publishing", desc: "Optimizing and launching.", points: ["Profiling Tools", "Mobile vs PC Export", "App Store Guidelines"], icon: Rocket }
  ]
};

const Roadmap = ({ searchTerm, setSearchTerm }) => {
  const { currentUser } = useAuth();
  const categories = Object.keys(roadmapsData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [progress, setProgress] = useState(new Set()); 
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/roadmaps/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
          const userProgress = new Set(
            data.progress
              .filter(p => p.roadmapType === selectedCategory)
              .map(p => p.stepIndex)
          );
          setProgress(userProgress);
        })
        .catch(err => console.error("Error fetching progress", err));
    }
  }, [currentUser, selectedCategory]);

  const toggleProgress = async (index) => {
    if (!currentUser) return;
    
    setSyncing(true);
    try {
      const res = await fetch('/api/roadmaps/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          roadmapType: selectedCategory,
          stepIndex: index
        })
      });
      const data = await res.json();
      
      const newProgress = new Set(progress);
      if (data.status === 'added') {
        newProgress.add(index);
      } else {
        newProgress.delete(index);
      }
      setProgress(newProgress);
    } catch (err) {
      console.error("Error toggling progress", err);
    } finally {
      setSyncing(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (setSearchTerm) setSearchTerm('');
  };

  // Helper function to map index to a difficulty level mapping from Basic to Advanced
  const getDifficultyLevel = (index, totalLength) => {
    const percentage = index / (totalLength - 1);
    if (percentage <= 0.3) {
      return { label: 'Basic', classes: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800' };
    } else if (percentage <= 0.7) {
      return { label: 'Intermediate', classes: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800' };
    } else {
      return { label: 'Advanced', classes: 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800' };
    }
  };

  const currentRoadmap = roadmapsData[selectedCategory];

  const filteredRoadmap = currentRoadmap.filter(step => 
    step.title.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    step.desc.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    step.points.some(p => p.toLowerCase().includes((searchTerm || '').toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-4 relative z-10 tracking-tight">
            <span className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-2xl">
              <Map className="w-10 h-10 md:w-14 md:h-14 text-orange-600 dark:text-orange-400" />
            </span>
            Learning Roadmaps
          </h1>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Follow our highly detailed, step-by-step master guides to level up your career. Click individual steps to mark them as completed as you journey from Basic to Advanced!
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20 relative z-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 transform ${
                selectedCategory === category
                  ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-xl shadow-red-500/30 scale-105 border border-red-500/50'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-md border border-slate-200 dark:border-slate-700 hover:-translate-y-1'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Roadmap Timeline Area */}
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 lg:p-16 transition-colors duration-300 border border-slate-100 dark:border-slate-700 relative overflow-hidden">
          {/* Decorative background gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-16 text-center flex flex-col justify-center items-center gap-3">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {selectedCategory}
              </span>
              <span className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400">Basic to Advanced Mastery Path</span>
            </h2>

            <div className="relative max-w-5xl mx-auto">
              {/* Dynamic Center Vertical Line (Progressed vs Unprogressed) */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-slate-100 dark:bg-slate-700 rounded-full shadow-inner z-0"></div>

              <div className="space-y-16 lg:space-y-24">
                {filteredRoadmap.length > 0 ? filteredRoadmap.map((step, index) => {
                  const Icon = step.icon;
                  // We need to find the actual index in the original roadmap for progress tracking
                  const originalIndex = currentRoadmap.findIndex(s => s.title === step.title);
                  const isCompleted = progress.has(originalIndex);
                  const difficulty = getDifficultyLevel(originalIndex, currentRoadmap.length);

                  return (
                    <div key={index} className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} group animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                      
                      {/* Timeline Dot Central Icon */}
                      <div className={`hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full items-center justify-center shadow-2xl z-20 transition-all duration-500 cursor-pointer 
                        ${isCompleted 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-600 border-4 border-emerald-100 dark:border-slate-800 scale-110 shadow-emerald-500/40' 
                          : 'bg-white dark:bg-slate-800 border-4 border-orange-100 dark:border-slate-600 hover:border-orange-300 dark:hover:border-orange-500'}`}
                        onClick={() => toggleProgress(originalIndex)}
                      >
                         {isCompleted ? (
                            <CheckCircle className="w-7 h-7 text-white" />
                         ) : (
                            <span className="text-slate-400 dark:text-slate-500 font-extrabold text-xl">{originalIndex + 1}</span>
                         )}
                      </div>

                      {/* Content Card Wrapper - controls layout geometry */}
                      <div className={`w-full lg:w-1/2 flex justify-center z-10 ${index % 2 === 0 ? 'lg:pl-20' : 'lg:pr-20'}`}>
                        {/* Interactive Card */}
                        <div 
                          className={`w-full bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-[2rem] border-2 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden backdrop-blur-sm shadow-xl
                          ${isCompleted 
                            ? 'border-emerald-400/50 shadow-emerald-500/10' 
                            : 'border-slate-100 dark:border-slate-700 hover:shadow-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50'}`}
                        >
                          {/* Inner soft gradient highlight */}
                          <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-300 ${isCompleted ? 'bg-emerald-400' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}></div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5 relative z-10">
                            {/* Inner Card Icon */}
                            <div className={`p-4 rounded-2xl shadow-inner transition-colors duration-300 flex-shrink-0
                              ${isCompleted 
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                                : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white'}`}>
                              <Icon className="w-8 h-8" />
                            </div>
                            
                            <div className="flex-1 w-full">
                               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                 {/* Difficulty Level Badge */}
                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${difficulty.classes}`}>
                                   {difficulty.label}
                                 </span>
                                 <span className="lg:hidden text-slate-400 text-sm font-bold">Step {originalIndex + 1}</span>
                               </div>
                               <h3 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight leading-tight mt-1">
                                 {step.title}
                               </h3>
                               <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 text-sm sm:text-base">
                                 {step.desc}
                               </p>
                            </div>
                          </div>
                          
                          {/* Micro-tags for step points */}
                          <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                            {step.points.map((point, ptIdx) => (
                              <span key={ptIdx} className={`px-3 py-1.5 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors duration-300
                                ${isCompleted 
                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                                  : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:text-orange-700 dark:group-hover:text-orange-300'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-orange-400'}`}></div>
                                {point}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between z-10 relative">
                            <button 
                              onClick={() => toggleProgress(originalIndex)}
                              className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                                isCompleted 
                                  ? 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700' 
                                  : 'text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400'
                              }`}
                            >
                              <CheckCircle className={`w-5 h-5 ${isCompleted ? 'fill-emerald-100 dark:fill-emerald-900/30' : ''}`} /> 
                              {isCompleted ? 'Completed' : 'Mark Complete'}
                            </button>
                            <div className="flex items-center gap-3">
                              <a 
                                href="/roadmap-guide.pdf" 
                                download 
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                                title={`Download Data PDF for ${step.title}`}
                              >
                                <Download size={16} />
                                <span className="hidden sm:inline">Data PDF</span>
                                <span className="sm:hidden">PDF</span>
                              </a>
                              <span className="flex items-center text-sm font-bold text-orange-600 dark:text-orange-400 hover:translate-x-1 transition-transform cursor-pointer">
                                Resources <ChevronRight className="w-5 h-5 ml-1" />
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  );
                }) : (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No matching roadmaps found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Try searching for different keywords or check out other categories.
                    </p>
                    <button 
                      onClick={() => setSearchTerm && setSearchTerm('')}
                      className="mt-8 px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Roadmap;
