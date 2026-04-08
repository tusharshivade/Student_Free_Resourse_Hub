import { useState } from 'react';
import { Menu, X, Filter } from 'lucide-react';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Added new categories based on user requirements
  const categories = [
    'Development',
    'DevOps',
    'Cloud',
    'UI/UX',
    'Data Science',
    'Backend Engineer',
    'Cybersecurity & IT Security',
    'Game Development'
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Category Toggle for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-24 left-4 z-40 bg-indigo-600 dark:bg-indigo-500 text-white px-3 py-2 rounded-full shadow-lg transition-transform duration-300 flex items-center gap-2 font-bold text-sm hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={20} /> : <Filter size={20} />}
        <span>{isOpen ? 'Close' : 'Categories'}</span>
      </button>

      {/* Sidebar */}
      <aside className={`bg-[#EAEFEF] dark:bg-slate-900 text-gray-800 dark:text-white w-64 min-h-screen p-6 fixed left-0 top-16 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 overflow-y-auto pb-20 border-r border-transparent dark:border-slate-700`}>
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-200">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false); // Close on mobile after selection
                }}
                className={`w-full text-left py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors duration-200 ${
                  selectedCategory === category 
                  ? 'bg-gray-200 dark:bg-slate-800 border-l-4 border-gray-600 dark:border-indigo-500' 
                  : 'border-l-4 border-transparent'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && <div onClick={toggleSidebar} className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"></div>}
    </>
  );
};

export default Sidebar;