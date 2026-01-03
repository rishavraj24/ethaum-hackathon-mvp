'use client';
import { useState } from 'react';
import { Handshake, Building2, Loader2, ArrowRight } from 'lucide-react';

export default function Matchmaker({ startupName, description }: { startupName: string, description: string }) {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function findBuyers() {
    setLoading(true);
    try {
      const res = await fetch('/api/matchmaker', {
        method: 'POST',
        body: JSON.stringify({ startupName, description }),
      });
      const data = await res.json();
      setMatches(data.matches);
      setHasSearched(true);
    } catch (e) {
      alert("AI is busy closing other deals.");
    }
    setLoading(false);
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/80 p-6 rounded-xl border border-blue-700/30 backdrop-blur-sm mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Handshake className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Enterprise Matchmaking</h2>
          <p className="text-xs text-blue-300">AI-driven M&A Partner Search</p>
        </div>
      </div>

      {!hasSearched && (
        <div className="text-center py-4">
          <p className="text-slate-400 text-sm mb-4">Find high-probability corporate acquirers for {startupName}.</p>
          <button 
            onClick={findBuyers}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Building2 />}
            {loading ? "Scanning Market..." : "Find Buyer Matches"}
          </button>
        </div>
      )}

      {hasSearched && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {matches.map((m, i) => (
            <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between group hover:border-blue-500 transition">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white">{m.company}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${m.match_score > 80 ? 'bg-emerald-900 text-emerald-400' : 'bg-yellow-900 text-yellow-400'}`}>
                    {m.match_score}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{m.reason}</p>
              </div>
              <button className="text-slate-500 group-hover:text-white transition">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
          <div className="text-center mt-3">
             <span className="text-xs text-slate-500">Based on Synergy Analysis</span>
          </div>
        </div>
      )}
    </div>
  );
}