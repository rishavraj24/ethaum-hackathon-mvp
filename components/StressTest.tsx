'use client';
import { useState } from 'react';
import { ShieldAlert, TrendingDown, Gavel, Skull, CheckCircle } from 'lucide-react';

export default function StressTest({ startupName, description }: { startupName: string, description: string }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeScenario, setActiveScenario] = useState('');

  const scenarios = [
    { id: 'recession', label: 'Economic Crash', icon: <TrendingDown size={18} />, color: 'bg-red-600' },
    { id: 'competitor', label: 'Big Tech Copycat', icon: <ShieldAlert size={18} />, color: 'bg-orange-600' },
    { id: 'lawsuit', label: 'Massive Lawsuit', icon: <Gavel size={18} />, color: 'bg-purple-600' },
  ];

  async function runSim(scenarioLabel: string) {
    setLoading(true);
    setActiveScenario(scenarioLabel);
    setResult(null);
    
    const res = await fetch('/api/stress-test', {
      method: 'POST',
      body: JSON.stringify({ startupName, description, scenario: scenarioLabel }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="bg-slate-900/80 p-6 rounded-xl border border-red-900/30 backdrop-blur-sm mt-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="text-red-500" />
        <h2 className="text-xl font-bold text-white">Crisis Simulator 3000</h2>
      </div>
      
      <p className="text-slate-400 text-sm mb-4">Test this startup's resilience against real-world threats.</p>

      <div className="flex gap-3 mb-6">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => runSim(s.label)}
            disabled={loading}
            className={`${s.color} hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition transform active:scale-95`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="animate-pulse text-red-400 font-mono text-sm">
          ⚠ SIMULATING "{activeScenario.toUpperCase()}" IMPACT...
        </div>
      )}

      {result && (
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-700 animate-in zoom-in duration-300">
           <div className="flex justify-between items-center mb-2">
             <span className="text-slate-400 text-sm uppercase font-bold tracking-wider">Survival Probability</span>
             <span className={`text-2xl font-black ${result.survival_score > 50 ? 'text-emerald-500' : 'text-red-500'}`}>
               {result.survival_score}%
             </span>
           </div>
           
           {/* Progress Bar */}
           <div className="w-full bg-slate-800 h-3 rounded-full mb-4 overflow-hidden">
             <div 
               className={`h-full ${result.survival_score > 50 ? 'bg-emerald-500' : 'bg-red-600'}`} 
               style={{ width: `${result.survival_score}%` }}
             />
           </div>

           <div className="flex items-start gap-3">
              {result.survival_score > 50 ? <CheckCircle className="text-emerald-500 shrink-0" /> : <Skull className="text-red-500 shrink-0" />}
              <div>
                <p className="text-white font-bold text-lg">{result.outcome}</p>
                <p className="text-slate-400 text-sm mt-1">{result.reason}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}