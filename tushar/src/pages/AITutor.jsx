import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are an incredibly helpful, friendly, and expert computer science tutor for the Student Resource Hub. 
Your goal is to help students understand programming, computer science concepts, tools, and certifications. 
Always provide clear, easily readable explanations. Provide short code examples when helpful. 
Use Markdown to format your response beautifully. Be encouraging!`;

const MarkdownComponents = {
  pre: ({ children }) => <>{children}</>,
  code: ({ node, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    if (match) {
      return (
        <div className="rounded-lg overflow-hidden my-4 bg-[#0d0d0d] border border-slate-700 shadow-sm w-full">
          <div className="flex justify-between items-center px-4 py-2 bg-slate-800 text-slate-300 text-xs font-mono">
            <span>{match[1]}</span>
          </div>
          <pre className="p-4 overflow-x-auto text-slate-50 text-sm font-mono leading-relaxed m-0 bg-[#0d0d0d]">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    }
    return (
      <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  }
};

const AITutor = () => {
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hello! I'm your AI Study Buddy. Ask me anything about programming, tech, or your coursework!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Create a ref to store the chat session so it persists across renders
  const chatSessionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = () => {
    
    if (!chatSessionRef.current) {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setError("API Key not found. Please add VITE_GEMINI_API_KEY to your .env file.");
        return false;
      }

      try {
        const ai = new GoogleGenAI({ apiKey, dangerouslyAllowBrowser: true });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION
          }
        });
        return true;
      } catch (err) {
        console.error("Failed to initialize GenAI:", err);
        setError("Failed to connect to the AI service. " + err.message);
        return false;
      }
    }
    return true;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check initialization
    if (!initChat()) return;

    const userMessage = input.trim();
    setInput('');
    setError('');

    // Add user message to UI state and an empty placeholder for the AI response
    setMessages(prev => [
      ...prev, 
      { role: 'user', content: userMessage },
      { role: 'model', content: '', isTyping: true }
    ]);
    setIsLoading(true);

    try {
      // Send the message using the SDK stream
      const responseStream = await chatSessionRef.current.sendMessageStream({ message: userMessage });
      
      let fullText = '';
      for await (const chunk of responseStream) {
        fullText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          // Update the last message (the AI placeholder)
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: fullText
          };
          return newMessages;
        });
      }
      
      // After stream completes, remove the isTyping flag
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          isTyping: false
        };
        return newMessages;
      });

    } catch (err) {
      console.error("AI Error:", err);
      setError("I'm sorry, I encountered an error connecting to the AI. " + err.message);
      // Remove the empty message if it failed before anything was streamed
      setMessages(prev => prev.filter((msg, idx) => !(idx === prev.length - 1 && msg.content === '')));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 min-h-[calc(100vh-64px)] pt-16 px-4 pb-8 items-center">

      <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] border border-slate-200 dark:border-slate-700 mt-4">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-sm bg-green-600 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">AI Study Buddy</h2>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto w-full scroll-smooth bg-white dark:bg-slate-800">

          {error && (
            <div className="p-4 mx-auto max-w-3xl my-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg text-center text-sm font-semibold border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`w-full ${msg.role === 'user' ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-900/50'} py-6 border-b border-slate-100 dark:border-slate-700/50`}>
              <div className="flex gap-4 max-w-4xl mx-auto px-6">

                {/* Avatar */}
                <div className={`w-8 h-8 mt-1 rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-green-600'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {msg.role === 'user' ? (
                     <p className="text-[16px] text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-wrap pt-1">{msg.content}</p>
                  ) : (
                     <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed break-words pt-1">
                       <ReactMarkdown components={MarkdownComponents}>{msg.content}</ReactMarkdown>
                     </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && messages.length > 0 && messages[messages.length - 1]?.content === '' && (
            <div className="w-full bg-slate-50 dark:bg-slate-900/50 py-6 border-b border-slate-100 dark:border-slate-700/50">
              <div className="flex gap-4 max-w-4xl mx-auto px-6">
                <div className="w-8 h-8 mt-1 rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm bg-green-600">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 flex items-center gap-2 pt-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-6" />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-end relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Message AI Study Buddy..."
              className="w-full resize-none rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 pr-12 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 shadow-sm transition-all overflow-hidden"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '160px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">AI can make mistakes. Consider verifying important information.</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AITutor;