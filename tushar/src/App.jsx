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

const resources = [
  {
    id: 1,
    title: 'Certifications',
    description: 'Explore various industry-recognized certifications to boost your career and validate your skills.',
    tags: ['Learning', 'Career'],
    link: 'https://www.coursera.org/courses?query=free&skills=Artificial%20Intelligence',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer', 'Cybersecurity & IT Security', 'Game Development']
  },
  {
    id: 2,
    title: 'Games',
    description: 'Educational games and interactive puzzles to improve your logic and programming skills.',
    tags: ['Interactive', 'Fun'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer', 'Game Development']
  },
  {
    id: 3,
    title: 'AI Tools',
    description: 'A curated list of Artificial Intelligence tools to improve productivity and automate tasks.',
    tags: ['AI', 'Productivity'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer', 'Cybersecurity & IT Security', 'Game Development']
  },
  {
    id: 4,
    title: 'Notes',
    description: 'Comprehensive notes and cheatsheets covering various technologies and frameworks.',
    tags: ['Study', 'Resources'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer', 'Cybersecurity & IT Security', 'Game Development']
  },
  {
    id: 5,
    title: 'Practice Sets',
    description: 'Collection of coding problems, quizzes, and practical exercises for interviews.',
    tags: ['Practice', 'Interview'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer', 'Cybersecurity & IT Security', 'Game Development']
  },
  {
    id: 6,
    title: 'Videos',
    description: 'Video tutorials and courses specifically tailored for comprehensive understanding.',
    tags: ['Video', 'Tutorial'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer', 'Cybersecurity & IT Security', 'Game Development']
  },
  {
    id: 7,
    title: 'Cybersecurity Masterclass',
    description: 'Learn ethical hacking, penetration testing, and network security from scratch.',
    tags: ['Security', 'Hacking'],
    link: '#',
    categories: ['Cybersecurity & IT Security']
  },
  {
    id: 8,
    title: 'Game Development with Unity',
    description: 'Build robust 2D and 3D worlds using C# and the powerful Unity engine.',
    tags: ['Unity', 'C#', 'Gaming'],
    link: '#',
    categories: ['Game Development']
  }
];

const Dashboard = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, likes, toggleLike }) => {
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.categories?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex">
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="flex-1 flex flex-col md:ml-64 min-h-screen transition-colors duration-300 dark:bg-slate-900 bg-slate-50 w-full overflow-x-hidden">
          <main className="flex-1 p-4 sm:p-6 pt-24 dark:text-gray-100 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map(resource => (
                <Card
                  key={resource.id}
                  resource={resource}
                  isLiked={likes[resource.id] || false}
                  onLike={() => toggleLike(resource.id)}
                />
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
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
    <div className="min-h-screen">
      <Routes>
        <Route 
          path="/" 
          element={
            <Dashboard 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              likes={likes} 
              toggleLike={toggleLike} 
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/roadmap" element={<><Navbar /><Roadmap /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><ContactUs /><Footer /></>} />
        <Route path="/chat" element={<><Navbar /><AITutor /><Footer /></>} />
      </Routes>
    </div>
  );
};

export default App;