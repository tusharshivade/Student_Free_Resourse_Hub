import React, { useState, useEffect, useMemo } from 'react';
import { 
  Map, Milestone, BookOpen, CheckCircle, ChevronRight,
  Globe, Layout, Code, Zap, Layers, CheckSquare,
  Terminal, Cpu, Database, Server, Share2, Shield, MessageSquare,
  Box, Code2, CloudRain, Activity, Cloud, Lock, FileText, Maximize,
  PenTool, Users, Monitor, Eye, Calculator, BarChart, PieChart, Brain, Rocket, Download, Search, Loader2,
  X, Plus, Home as HomeIcon, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
  
  // Tab Management State
  const [openTabs, setOpenTabs] = useState([{ id: 'root', title: 'Main Path', type: 'tree' }]);
  const [activeTabId, setActiveTabId] = useState('root');

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/roadmaps/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
          const userProgress = new Set(
            (data.progress || [])
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

  const openNodeTab = (step, index) => {
    const tabId = `step-${index}`;
    if (!openTabs.find(t => t.id === tabId)) {
      setOpenTabs([...openTabs, { id: tabId, title: step.title, type: 'detail', step, index }]);
    }
    setActiveTabId(tabId);
  };

  const closeTab = (e, tabId) => {
    e.stopPropagation();
    if (tabId === 'root') return;
    
    const newTabs = openTabs.filter(t => t.id !== tabId);
    setOpenTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setOpenTabs([{ id: 'root', title: 'Main Path', type: 'tree' }]);
    setActiveTabId('root');
    if (setSearchTerm) setSearchTerm('');
  };

  const currentRoadmap = roadmapsData[selectedCategory];

  const getDifficultyLevel = (index, totalLength) => {
    const percentage = index / (totalLength - 1);
    if (percentage <= 0.3) {
      return { label: 'Basic', classes: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30' };
    } else if (percentage <= 0.7) {
      return { label: 'Intermediate', classes: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30' };
    } else {
      return { label: 'Advanced', classes: 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/30' };
    }
  };

  const activeTab = openTabs.find(t => t.id === activeTabId) || openTabs[0];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-4 relative z-10">
            <span className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-2xl">
              <Map className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </span>
            Roadmap Workstation
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Click nodes to explore in detail. Each branch opens in a new tab for focused learning.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Workstation Container */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-[700px] flex flex-col">
          
          {/* Tab Bar */}
          <div className="bg-slate-100 dark:bg-slate-900/50 p-2 flex items-center gap-1 overflow-x-auto tabs-scroll border-b border-slate-200 dark:border-slate-700">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap text-sm font-bold min-w-[120px] max-w-[200px] ${
                  activeTabId === tab.id
                    ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm border border-slate-200 dark:border-slate-700'
                    : 'text-slate-500 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab.type === 'tree' ? <HomeIcon className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                <span className="truncate">{tab.title}</span>
                {tab.id !== 'root' && (
                  <X 
                    className="w-3.5 h-3.5 hover:text-red-500 ml-auto" 
                    onClick={(e) => closeTab(e, tab.id)}
                  />
                )}
              </div>
            ))}
            <button className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 relative">
            {activeTab.type === 'tree' ? (
              <div className="tree-container animate-slide-in">
                <div className="mb-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-200 dark:border-orange-800/50 text-center max-w-xl mx-auto">
                  <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300">{selectedCategory} Master Path</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-400/80 mt-1">Start from the top and follow the branches downwards.</p>
                </div>

                <div className="relative flex flex-col items-center">
                  {currentRoadmap.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = progress.has(index);
                    const diff = getDifficultyLevel(index, currentRoadmap.length);

                    return (
                      <div key={index} className="tree-node-wrapper w-full flex flex-col items-center">
                        <div 
                          className={`tree-node flex items-center gap-4 w-[350px] sm:w-[450px] relative group ${
                            isCompleted ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-900/10' : ''
                          }`}
                          onClick={() => openNodeTab(step, index)}
                        >
                          <div className={`p-3 rounded-xl transition-colors ${
                            isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 group-hover:text-orange-600'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${diff.classes}`}>
                                {diff.label}
                              </span>
                              {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white mt-1 group-hover:text-orange-600 transition-colors">{step.title}</h4>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        {index < currentRoadmap.length - 1 && <div className="tree-line-vertical"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="animate-slide-in max-w-4xl mx-auto py-4">
                <button 
                  onClick={() => setActiveTabId('root')}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 font-bold mb-8 transition-colors"
                >
                  <HomeIcon className="w-4 h-4" /> Back to Tree
                </button>

                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-inner">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-6">
                      <div className="p-5 bg-orange-600 rounded-3xl text-white shadow-xl shadow-orange-600/20">
                        {activeTab.step.icon && <activeTab.step.icon className="w-10 h-10" />}
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{activeTab.step.title}</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{activeTab.step.desc}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => toggleProgress(activeTab.index)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                        progress.has(activeTab.index)
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/20'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      {progress.has(activeTab.index) ? 'Completed' : 'Mark as Done'}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-orange-500" />
                        Key Learning Points
                      </h3>
                      <div className="space-y-3">
                        {activeTab.step.points.map((point, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 group hover:border-orange-300 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="font-bold text-slate-700 dark:text-slate-300">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-orange-500" />
                        Action Center
                      </h3>
                      <div className="space-y-4">
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-orange-500" />
                            <span className="font-bold text-slate-700 dark:text-slate-300">Download Resources</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                        </a>
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Pro Tip
                          </p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-500/80 mt-1">Focus on understanding the core concepts before moving to the next branch.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer of Workstation */}
          <div className="bg-slate-50 dark:bg-slate-900/30 px-6 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span>Category: {selectedCategory}</span>
              <span>Steps: {currentRoadmap.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-emerald-500" />
              <span>System Status: Online</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Roadmap;
