import { Heart, ExternalLink } from 'lucide-react';

const Card = ({ resource, isLiked, onLike }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
      <p className="text-gray-600 mb-4">{resource.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map(tag => (
          <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={onLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{isLiked ? 1 : 0}</span>
        </button>
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-1"
        >
          <ExternalLink size={16} />
          <span>Visit</span>
        </a>
      </div>
    </div>
  );
};

export default Card;