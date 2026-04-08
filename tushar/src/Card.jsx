import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Heart, ExternalLink, MessageSquare, Send, X } from 'lucide-react';

const Card = ({ resource, isLiked, onLike }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  // Start with some mock comments
  const [comments, setComments] = useState([
    { id: 1, text: "This resource completely saved me on my last project!", author: "Alice" },
    { id: 2, text: "Does anyone know if this is updated for 2024?", author: "Bob" }
  ]);

  // Handle animation staggering
  useEffect(() => {
    if (isCommentsOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimatingIn(false);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCommentsOpen]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      text: newComment,
      author: "StudentUser" 
    };
    setComments([...comments, commentObj]);
    setNewComment("");
  };

  const modalContent = isCommentsOpen ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
      {/* Backdrop overlay */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${isAnimatingIn ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsCommentsOpen(false)}
      ></div>
      
      {/* Modal Box */}
      <div className={`relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] border border-gray-100 dark:border-slate-700 overflow-hidden transform transition-all duration-300 ease-out ${isAnimatingIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}>
        
        {/* Header */}
        <div className="border-b border-gray-100 dark:border-slate-700 p-5 flex justify-between items-center bg-gray-50 dark:bg-slate-800/80">
          <h3 className="font-bold text-xl text-gray-800 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <MessageSquare className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
            </div>
            Discussion
          </h3>
          <button 
            onClick={() => setIsCommentsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-200/50 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full transition-colors"
            aria-label="Close comments"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                  {comment.author.charAt(0)}
                </div>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{comment.author}</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-8">{comment.text}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-center py-10 opacity-70">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No comments yet. Start the discussion!</p>
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80">
          <form onSubmit={handleAddComment} className="relative flex items-center">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts or ask a question..."
              className="w-full text-sm pl-4 pr-14 py-3 border border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-colors shadow-inner"
            />
            <button type="submit" disabled={!newComment.trim()} className="absolute right-2 p-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:dark:bg-slate-600 rounded-lg transition-colors flex items-center justify-center outline-none">
              <Send size={16} />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  ) : null;

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-indigo-100 dark:border-indigo-500/20 border-t-4 border-t-indigo-500 dark:border-t-indigo-400 overflow-hidden flex flex-col h-full min-h-[300px]">
      <div className="p-6 flex flex-col flex-grow relative z-10">
        {/* Decorative gradient blur background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-emerald-50/30 dark:from-indigo-900/10 dark:to-emerald-900/10 group-hover:from-indigo-100/50 group-hover:to-emerald-100/50 transition-colors duration-500 rounded-xl -z-10 pointer-events-none"></div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {resource.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed line-clamp-3">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {resource.tags.map(tag => (
            <span key={tag} className="bg-indigo-50 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={onLike}
              className={`flex items-center space-x-1 p-2 rounded-full transform transition-all duration-300 z-10 opacity-100 ${
                isLiked 
                ? 'text-red-500 bg-red-50 dark:bg-red-500/10 scale-110' 
                : 'text-gray-400 dark:text-gray-500 hover:text-red-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:scale-105'
              }`}
              aria-label="Like resource"
            >
              <Heart size={22} fill={isLiked ? 'currentColor' : 'none'} className={`${isLiked ? 'animate-pulse' : ''}`} />
              <span className="font-medium text-sm">{isLiked ? 1 : 0}</span>
            </button>
            <button
              onClick={() => setIsCommentsOpen(true)}
              className={`flex items-center space-x-1 p-2 rounded-full transform transition-all duration-300 z-10 ${isCommentsOpen ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20' : 'text-gray-400 dark:text-gray-500 hover:text-indigo-500 hover:bg-gray-50 dark:hover:bg-slate-700 hover:scale-105'}`}
              aria-label="Open comments popup"
            >
              <MessageSquare size={22} />
              <span className="font-medium text-sm">{comments.length}</span>
            </button>
          </div>
          
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 hover:bg-indigo-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md transform active:scale-95 text-sm font-medium z-10"
          >
            <span>Visit</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
      
      {/* Render modal in portal to escape transform scope */}
      {isCommentsOpen && createPortal(modalContent, document.body)}
    </div>
  );
};

export default Card;