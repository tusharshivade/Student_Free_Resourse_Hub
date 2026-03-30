import { Search, User, GraduationCap } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-2">
        <GraduationCap className="text-indigo-700" size={28} />
        <h1 className="text-2xl font-bold text-indigo-700">Student Resource Hub</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <User className="text-gray-600 cursor-pointer" size={24} />
      </div>
    </nav>
  );
};

export default Navbar;