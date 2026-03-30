import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['All', 'Development', 'DevOps', 'Cloud', 'UI/UX'];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-20 bg-indigo-700 text-white p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`bg-indigo-700 text-white w-64 min-h-screen p-6 fixed left-0 top-16 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}>
        <h3 className="text-xl font-bold mb-6">Categories</h3>
        <ul className="space-y-4">
          {categories.map(category => (
            <li key={category}>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false); // Close on mobile after selection
                }}
                className={`w-full text-left py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors ${selectedCategory === category ? 'bg-indigo-600' : ''}`}
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