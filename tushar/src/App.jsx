import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Card from './Card';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Roadmap from './pages/Roadmap';
import AITutor from './pages/AITutor';
import Footer from './Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import Labs from './pages/Labs';
import Interviews from './pages/Interviews';
import OpenSource from './pages/OpenSource';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const resources = [
  // ----------- DEVELOPMENT -----------
  {
    id: 1,
    title: 'freeCodeCamp',
    description: 'Completely free interactive courses on HTML, CSS, JavaScript, React, and algorithm scripting.',
    tags: ['Frontend', 'Interactive'],
    link: 'https://www.freecodecamp.org/',
    categories: ['Development']
  },
  {
    id: 2,
    title: 'MDN Web Docs',
    description: 'The absolute gold-standard, official documentation for web technologies, managed by Mozilla.',
    tags: ['Documentation', 'Reference'],
    link: 'https://developer.mozilla.org/',
    categories: ['Development']
  },
  {
    id: 3,
    title: 'Frontend Mentor',
    description: 'Improve your real-world coding skills by building frontend projects based on professional Figma designs.',
    tags: ['Practice', 'Projects'],
    link: 'https://www.frontendmentor.io/',
    categories: ['Development']
  },

  // ----------- DEVOPS -----------
  {
    id: 4,
    title: 'Docker Curriculum',
    description: 'A comprehensive, beginner-friendly tutorial for getting started with Docker and containerization.',
    tags: ['Docker', 'Containers'],
    link: 'https://docker-curriculum.com/',
    categories: ['DevOps']
  },
  {
    id: 5,
    title: 'DevOps Roadmap',
    description: 'A high-level, step-by-step master plan and visual guide to becoming a professional DevOps Engineer.',
    tags: ['Roadmap', 'Guide'],
    link: 'https://roadmap.sh/devops',
    categories: ['DevOps']
  },
  {
    id: 6,
    title: 'GitHub Actions Documentation',
    description: 'Learn to automate, customize, and execute your software development workflows directly in your repository.',
    tags: ['CI/CD', 'Automation'],
    link: 'https://docs.github.com/en/actions',
    categories: ['DevOps']
  },

  // ----------- CLOUD -----------
  {
    id: 7,
    title: 'AWS Skill Builder',
    description: 'Over 600+ free digital courses from Amazon Web Services experts to build your professional cloud skills.',
    tags: ['AWS', 'Courses'],
    link: 'https://explore.skillbuilder.aws/',
    categories: ['Cloud']
  },
  {
    id: 8,
    title: 'Google Cloud Training',
    description: 'Free Google Cloud (GCP) training, interactive documentation, and structured hands-on learning labs.',
    tags: ['GCP', 'Labs'],
    link: 'https://cloud.google.com/training',
    categories: ['Cloud']
  },
  {
    id: 9,
    title: 'Microsoft Learn for Azure',
    description: 'Master Microsoft Azure fundamentals and advanced architecture directly from Microsoft learning paths.',
    tags: ['Azure', 'Certification'],
    link: 'https://learn.microsoft.com/en-us/training/azure/',
    categories: ['Cloud']
  },

  // ----------- UI/UX -----------
  {
    id: 10,
    title: 'Laws of UX',
    description: 'A brilliant collection of best practices and psychological principles that designers can use to build intuitive UIs.',
    tags: ['Principles', 'Theory'],
    link: 'https://lawsofux.com/',
    categories: ['UI/UX']
  },
  {
    id: 11,
    title: 'Mobbin',
    description: 'A massive hand-picked collection of the latest mobile and web design patterns from world-class applications.',
    tags: ['Inspiration', 'Web Design'],
    link: 'https://mobbin.com/',
    categories: ['UI/UX']
  },
  {
    id: 12,
    title: 'Figma Community',
    description: 'Explore thousands of free UI kits, design systems, plugins, and templates built by the Figma community.',
    tags: ['Figma', 'Assets'],
    link: 'https://www.figma.com/community',
    categories: ['UI/UX']
  },

  // ----------- DATA SCIENCE -----------
  {
    id: 13,
    title: 'Kaggle',
    description: 'The premier platform for predictive modelling and analytics competitions, containing thousands of free datasets.',
    tags: ['Machine Learning', 'Datasets'],
    link: 'https://www.kaggle.com/',
    categories: ['Data Science']
  },
  {
    id: 14,
    title: 'Fast.ai',
    description: 'Making neural nets uncool again. A remarkably effective, practical, completely free course on Deep Learning.',
    tags: ['Deep Learning', 'PyTorch'],
    link: 'https://course.fast.ai/',
    categories: ['Data Science']
  },
  {
    id: 15,
    title: 'Pandas Documentation',
    description: 'Everything you need to know about the most essential Python data analysis and manipulation library.',
    tags: ['Python', 'Analytics'],
    link: 'https://pandas.pydata.org/docs/',
    categories: ['Data Science']
  },

  // ----------- BACKEND ENGINEER -----------
  {
    id: 16,
    title: 'Backend Roadmap',
    description: 'A comprehensive, step-by-step master plan to becoming a modern backend systems developer.',
    tags: ['Architecture', 'Guide'],
    link: 'https://roadmap.sh/backend',
    categories: ['Backend Engineer']
  },
  {
    id: 17,
    title: 'PostgreSQL Tutorial',
    description: 'Master the world\'s most advanced open source relational database with these fast, practical tutorials.',
    tags: ['Databases', 'SQL'],
    link: 'https://www.postgresqltutorial.com/',
    categories: ['Backend Engineer']
  },
  {
    id: 18,
    title: 'Designing Data-Intensive Applications',
    description: '(Book recommendation reference / summary insights) The holy grail book for backend architecture concepts.',
    tags: ['System Design', 'Theory'],
    link: 'https://dataintensive.net/',
    categories: ['Backend Engineer']
  },

  // ----------- CYBERSECURITY & IT SECURITY -----------
  {
    id: 19,
    title: 'TryHackMe',
    description: 'Hands-on cyber security training through short, gamified real-world labs perfect for beginners.',
    tags: ['Hacking', 'Labs'],
    link: 'https://tryhackme.com/',
    categories: ['Cybersecurity & IT Security']
  },
  {
    id: 20,
    title: 'OWASP Top 10',
    description: 'The standard awareness document representing a broad consensus about the most critical software security risks.',
    tags: ['Security', 'Web Defenses'],
    link: 'https://owasp.org/www-project-top-ten/',
    categories: ['Cybersecurity & IT Security']
  },
  {
    id: 21,
    title: 'Hack The Box',
    description: 'A massive hacking playground and cybersecurity training platform globally favored by ethical hackers.',
    tags: ['PenTesting', 'Challenges'],
    link: 'https://www.hackthebox.com/',
    categories: ['Cybersecurity & IT Security']
  },

  // ----------- GAME DEVELOPMENT -----------
  {
    id: 22,
    title: 'Unity Learn',
    description: 'Free access to thousands of hours of incredibly high-quality Unity Engine learning content directly from the creators.',
    tags: ['Unity', 'Courses'],
    link: 'https://learn.unity.com/',
    categories: ['Game Development']
  },
  {
    id: 23,
    title: 'Unreal Engine Documentation',
    description: 'The definitive guide spanning essential concepts to advanced C++ blueprint programming in Unreal Engine 5.',
    tags: ['Unreal Engine', 'C++'],
    link: 'https://docs.unrealengine.com/',
    categories: ['Game Development']
  },
  {
    id: 24,
    title: 'GameLvl',
    description: 'Find inspiration and reference points for game UI, level design, and mechanics from hundreds of analyzed titles.',
    tags: ['Game Design', 'Inspiration'],
    link: 'https://interfaceingame.com/', // Substituted an equivalent UI resource
    categories: ['Game Development']
  }
];

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Development');
  const [likes, setLikes] = useState({});

  useEffect(() => {
    document.body.className = "bg-slate-50 dark:bg-slate-900 transition-colors duration-300";
  }, []);

  const toggleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen border-t-0 p-0 m-0"> {/* Wrapper to avoid margin/padding bugs on app root */}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
              <Footer />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><Profile /><Footer /></ProtectedRoute>} />
        <Route path="/about" element={<><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><AboutUs /><Footer /></>} />
        <Route path="/roadmap" element={<ProtectedRoute><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><Roadmap searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><Footer /></ProtectedRoute>} />
        <Route path="/contact" element={<><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><ContactUs /><Footer /></>} />
        <Route path="/chat" element={<ProtectedRoute><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><AITutor /><Footer /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><Jobs /><Footer /></ProtectedRoute>} />
        <Route path="/labs" element={<ProtectedRoute><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><Labs /><Footer /></ProtectedRoute>} />
        <Route path="/interviews" element={<ProtectedRoute><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><Interviews /><Footer /></ProtectedRoute>} />
        <Route path="/opensource" element={<ProtectedRoute><Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /><OpenSource /><Footer /></ProtectedRoute>} />
      </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;