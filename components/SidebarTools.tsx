'use client';
import { useState } from 'react';
import { 
  Sparkles, // Report
  Bot, // Oracle
  Flame, // Stress Test
  Handshake, // Matchmaker
  X // Close
} from 'lucide-react';

// Import your existing components
import AIReportSection from '@/components/AIReportSection';
import OracleChat from '@/components/OracleChat';
import StressTest from '@/components/StressTest';
import Matchmaker from '@/components/Matchmaker';

export default function SidebarTools({ startupName, description }: { startupName: string, description: string }) {
  // State to track which tool is open ('null' means all closed)
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { id: 'report', icon: <Sparkles size={24} />, label: 'VC Report', color: 'bg-purple-600' },
    { id: 'oracle', icon: <Bot size={24} />, label: 'AI Oracle', color: 'bg-blue-600' },
    { id: 'match', icon: <Handshake size={24} />, label: 'Matchmaker', color: 'bg-emerald-600' },
    { id: 'stress', icon: <Flame size={24} />, label: 'Stress Test', color: 'bg-red-600' },
  ];

  return (
    <>
      {/* 1. THE FLOATING ICON BAR (Right Edge) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {tools.map((tool) => (
          <div key={tool.id} className="relative group flex items-center justify-end">
            
            {/* Tooltip Label (Appears on Hover) */}
            <span className="absolute right-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-slate-700 pointer-events-none">
              {tool.label}
            </span>

            {/* Icon Button */}
            <button
              onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
              className={`p-3 rounded-full shadow-lg border border-slate-700/50 transition-all transform hover:scale-110 active:scale-95 ${
                activeTool === tool.id 
                  ? 'bg-white text-slate-900 rotate-0' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-white backdrop-blur-md'
              }`}
            >
              {activeTool === tool.id ? <X size={24} /> : tool.icon}
            </button>
          </div>
        ))}
      </div>

      {/* 2. THE CONTENT PANEL (Slides in or Fades in) */}
      {activeTool && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={() => setActiveTool(null)} />

          {/* The Actual Tool Card */}
          <div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-300">
            
            {/* Render the selected component */}
            {activeTool === 'report' && (
               <div className="shadow-2xl shadow-purple-900/50 rounded-xl">
                 <AIReportSection startupName={startupName} description={description} />
               </div>
            )}

            {activeTool === 'oracle' && (
               <div className="shadow-2xl shadow-blue-900/50 rounded-xl">
                 <OracleChat startupName={startupName} description={description} />
               </div>
            )}

            {activeTool === 'match' && (
               <div className="shadow-2xl shadow-emerald-900/50 rounded-xl">
                 <Matchmaker startupName={startupName} description={description} />
               </div>
            )}

            {activeTool === 'stress' && (
               <div className="shadow-2xl shadow-red-900/50 rounded-xl">
                 <StressTest startupName={startupName} description={description} />
               </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}