import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Card from './Card';

const resources = [
  {
    id: 1,
    title: 'Linux Documentation',
    description: 'Official docs for Linux operating system.',
    tags: ['DevOps', 'OS'],
    link: 'https://linux.die.net',
    category: 'DevOps'
  },
  {
    id: 2,
    title: 'AWS Documentation',
    description: 'Cloud computing services.',
    tags: ['Cloud', 'AWS'],
    link: 'https://aws.amazon.com/documentation',
    category: 'Cloud'
  },
  {
    id: 3,
    title: 'Figma',
    description: 'UI/UX design tool.',
    tags: ['UI/UX', 'Design'],
    link: 'https://figma.com',
    category: 'UI/UX'
  },
  {
    id: 4,
    title: 'Docker Docs',
    description: 'Containerization platform.',
    tags: ['DevOps', 'Containers'],
    link: 'https://docs.docker.com',
    category: 'DevOps'
  }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex">
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <main className="flex-1 p-6 pt-24 md:ml-64">
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
    </div>
  );
};

export default App;