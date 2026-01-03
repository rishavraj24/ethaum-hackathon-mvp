'use client';
import { useState } from 'react';
import { Sparkles, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

export default function AIReportSection({ startupName, description }: { startupName: string, description: string }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  async function generateReport() {
    setLoading(true);
    try {
      // Call an API route we will create in Step 3
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: startupName, description }),
      });
      const data = await res.json();
      setReport(data);
    } catch (e) {
      alert("Failed to generate report");
    }
    setLoading(false);
  }

  return (
    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 backdrop-blur-sm mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="text-purple-400" /> VC Analyst Report
        </h2>
        {!report && (
          <button 
            onClick={generateReport}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-bold transition flex items-center gap-2"
          >
            {loading ? "Analyzing..." : "Generate AI Report"}
          </button>
        )}
      </div>

      {report && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* SENTIMENT SCORE */}
          <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-600">
            <div className="text-slate-300">Investor Sentiment Score:</div>
            <div className="text-3xl font-black text-emerald-400">{report.investor_sentiment}/100</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* STRENGTHS */}
            <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold flex items-center gap-2 mb-2">
                <CheckCircle size={18} /> Strengths
              </h3>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                {report.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            {/* WEAKNESSES */}
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
              <h3 className="text-red-400 font-bold flex items-center gap-2 mb-2">
                <AlertTriangle size={18} /> Risks
              </h3>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                {report.weaknesses?.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>

          {/* ROADMAP */}
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
             <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-2">
                <TrendingUp size={18} /> Strategic Advice
              </h3>
              <p className="text-slate-300 text-sm italic">"{report.roadmap}"</p>
          </div>
        </div>
      )}
    </div>
  );
}