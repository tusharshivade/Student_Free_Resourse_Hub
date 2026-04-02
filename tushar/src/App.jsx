import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Card from './Card';
import Login from './pages/Login';
import Signup from './pages/Signup';

const resources = [
  {
    id: 1,
    title: 'Certifications',
    description: 'Explore various industry-recognized certifications to boost your career and validate your skills.',
    tags: ['Learning', 'Career'],
    link: 'https://www.coursera.org/courses?query=free&skills=Artificial%20Intelligence',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer']
  },
  {
    id: 2,
    title: 'Games',
    description: 'Educational games and interactive puzzles to improve your logic and programming skills.',
    tags: ['Interactive', 'Fun'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer']
  },
  {
    id: 3,
    title: 'AI Tools',
    description: 'A curated list of Artificial Intelligence tools to improve productivity and automate tasks.',
    tags: ['AI', 'Productivity'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer']
  },
  {
    id: 4,
    title: 'Notes',
    description: 'Comprehensive notes and cheatsheets covering various technologies and frameworks.',
    tags: ['Study', 'Resources'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer']
  },
  {
    id: 5,
    title: 'Practice Sets',
    description: 'Collection of coding problems, quizzes, and practical exercises for interviews.',
    tags: ['Practice', 'Interview'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer']
  },
  {
    id: 6,
    title: 'Videos',
    description: 'Video tutorials and courses specifically tailored for comprehensive understanding.',
    tags: ['Video', 'Tutorial'],
    link: '#',
    categories: ['DevOps', 'Development', 'Cloud', 'UI/UX', 'Data Science', 'Backend Engineer']
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
        <main className="flex-1 p-6 pt-24 md:ml-64 dark:text-gray-100 transition-colors duration-300 min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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
      </Routes>
    </div>
  );
};

export default App;