import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, Code, Target, Shield, Zap, RefreshCw, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['React', 'Linux', 'Cloud', 'Cybersecurity', 'System Design'];

const AptitudeArena = () => {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState('React');
  const [scenario, setScenario] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const getGenAI = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("VITE_GEMINI_API_KEY not found in .env");
    return new GoogleGenAI({ apiKey, dangerouslyAllowBrowser: true });
  };

  const generateScenario = async () => {
    setIsLoading(true);
    setError('');
    setFeedback(null);
    setMetrics(null);
    setUserAnswer('');
    setAttempts(0);

    try {
      const ai = getGenAI();
      const prompt = `Generate a high-level technical problem/scenario for a student learning ${category}. 
      Do not provide multiple-choice options. The problem should require them to explain their step-by-step logic to solve it. 
      Make the problem 'sneaky'—something that requires deep understanding, debugging skills, or architectural thinking, not just a simple google search.
      Just output the scenario directly without any intro text.`;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setScenario(result.text);
      setIsTestActive(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate scenario.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsLoading(true);
    setError('');

    try {
      const ai = getGenAI();
      
      // Strict JSON instruction
      const prompt = `
      Act as a strict Senior Technical Mentor.
      Scenario given to the student: "${scenario}"
      Student's proposed logic/answer: "${userAnswer}"

      Evaluate their logic.
      If their answer is completely wrong or extremely shallow (Attempt #${attempts + 1}):
      Return a JSON object with: 
      { "status": "hint", "message": "Give a cryptic mentor-like hint to slow them down and make them think deeper. Do not give the answer." }

      If their answer shows sufficient logic, or they've tried 2 times already:
      Return a JSON object with:
      {
        "status": "complete",
        "message": "A short mentor feedback summary.",
        "scores": {
          "logic": (number 1-100),
          "security": (number 1-100),
          "efficiency": (number 1-100),
          "syntax": (number 1-100),
          "architecture": (number 1-100)
        }
      }

      Return ONLY valid JSON. Do not use markdown backticks.
      `;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      let responseText = result.text.trim();
      if (responseText.startsWith('\`\`\`json')) {
        responseText = responseText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
      }

      const evalData = JSON.parse(responseText);

      if (evalData.status === 'hint') {
        setFeedback({ type: 'hint', message: evalData.message });
        setAttempts(prev => prev + 1);
      } else {
        setFeedback({ type: 'complete', message: evalData.message });
        const chartData = [
          { subject: 'Logic', A: evalData.scores.logic, fullMark: 100 },
          { subject: 'Security', A: evalData.scores.security, fullMark: 100 },
          { subject: 'Efficiency', A: evalData.scores.efficiency, fullMark: 100 },
          { subject: 'Syntax', A: evalData.scores.syntax, fullMark: 100 },
          { subject: 'Architecture', A: evalData.scores.architecture, fullMark: 100 },
        ];
        setMetrics(chartData);
        setIsTestActive(false);

        // Save to backend
        if (currentUser) {
           await fetch('/api/aptitude/results', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
               userId: currentUser.id,
               category: category,
               scores: evalData.scores,
               aiFeedback: evalData.message
             })
           });
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to evaluate answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const needStudyResources = metrics && metrics.some(m => m.A < 70);
  const lowestMetric = needStudyResources ? metrics.reduce((prev, curr) => (prev.A < curr.A ? prev : curr)) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 pt-20 pb-12 font-sans selection:bg-rose-500/30">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              AI Technical Aptitude Engine
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Test your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">logic.</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg">
              Face dynamic, logic-first scenarios generated by AI. No multiple-choice. Prove your problem-solving skills and discover your technical strengths.
            </p>
          </div>
          
          {!isTestActive && !metrics && (
             <div className="bg-[#111] p-4 rounded-xl border border-[#222] min-w-[280px]">
               <label className="block text-sm font-medium text-slate-400 mb-2">Select Domain</label>
               <select 
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                 className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors appearance-none"
               >
                 {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
               </select>
               <button 
                 onClick={generateScenario}
                 disabled={isLoading}
                 className="w-full mt-4 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]"
               >
                 {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
                 {isLoading ? 'Generating...' : 'Start Scenario'}
               </button>
             </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Active Test Arena */}
        {(isTestActive || metrics) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Scenario & Input */}
            <div className="flex flex-col gap-6">
              
              <div className="bg-[#111] rounded-2xl border border-[#222] p-6 lg:p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-orange-500"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#1a1a1a] rounded-lg border border-[#333]">
                    <Code className="w-5 h-5 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Scenario: {category}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg font-light whitespace-pre-wrap">
                  {scenario}
                </p>
              </div>

              {isTestActive && (
                <div className="flex flex-col gap-4">
                  <div className="bg-[#111] rounded-2xl border border-[#222] p-2 focus-within:border-rose-500/50 focus-within:ring-1 focus-within:ring-rose-500/50 transition-all">
                    <textarea 
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Explain your step-by-step logic to diagnose or solve the issue..."
                      className="w-full bg-transparent text-slate-200 p-4 min-h-[160px] resize-none focus:outline-none placeholder-slate-600"
                    />
                    <div className="flex justify-end p-2 border-t border-[#222]">
                      <button
                        onClick={submitAnswer}
                        disabled={isLoading || !userAnswer.trim()}
                        className="bg-white text-black hover:bg-slate-200 font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Submit Logic'}
                        {!isLoading && <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {feedback?.type === 'hint' && (
                    <div className="bg-orange-500/10 border border-orange-500/20 text-orange-200 p-5 rounded-xl flex gap-4 animate-in fade-in slide-in-from-bottom-4">
                      <div className="mt-0.5"><Zap className="w-5 h-5 text-orange-400" /></div>
                      <div>
                        <p className="font-semibold text-orange-400 mb-1">Mentor Hint</p>
                        <p className="text-orange-200/90 leading-relaxed">{feedback.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Visualization */}
            <div className="bg-[#111] rounded-2xl border border-[#222] p-6 lg:p-8 flex flex-col">
               <h3 className="text-xl font-semibold text-white mb-2">Aptitude Radar</h3>
               <p className="text-slate-500 mb-8 text-sm">Your technical competency mapped across 5 core dimensions.</p>
               
               {metrics ? (
                 <div className="flex-1 flex flex-col">
                   <div className="h-[300px] w-full relative">
                     <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="70%" data={metrics}>
                         <PolarGrid stroke="#333" />
                         <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                         <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                         <Radar name="Aptitude" dataKey="A" stroke="#f43f5e" strokeWidth={2} fill="#f43f5e" fillOpacity={0.3} />
                       </RadarChart>
                     </ResponsiveContainer>
                   </div>
                   
                   <div className="mt-6 p-5 bg-[#1a1a1a] rounded-xl border border-[#333]">
                     <div className="flex items-center gap-2 mb-2">
                       <CheckCircle className="w-5 h-5 text-emerald-400" />
                       <h4 className="font-semibold text-white">Mentor Feedback</h4>
                     </div>
                     <p className="text-slate-300 text-sm leading-relaxed">{feedback?.message}</p>
                   </div>

                   {needStudyResources && lowestMetric && (
                      <div className="mt-4 p-5 bg-rose-500/5 rounded-xl border border-rose-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-rose-400" />
                          <h4 className="font-semibold text-rose-100">Recommended Focus: {lowestMetric.subject}</h4>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">Your score in {lowestMetric.subject} was lower than average. Check out these resources:</p>
                        <div className="space-y-2">
                           <a href="/roadmap" className="block p-3 bg-[#111] hover:bg-[#222] border border-[#333] rounded-lg text-sm text-rose-300 transition-colors flex justify-between items-center group">
                             <span>Deep Dive: {lowestMetric.subject} Fundamentals</span>
                             <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </a>
                        </div>
                      </div>
                   )}
                   
                   <button 
                     onClick={() => setMetrics(null)}
                     className="mt-6 w-full py-3 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-white rounded-xl font-medium transition-colors"
                   >
                     Try Another Scenario
                   </button>
                 </div>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center px-8">
                   <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-500 mb-6 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-slate-500/10 rounded-full animate-pulse"></div>
                      <Target className="w-8 h-8 text-slate-500" />
                   </div>
                   <p className="text-slate-400 font-medium">Radar chart will generate upon completion of the scenario.</p>
                 </div>
               )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AptitudeArena;
