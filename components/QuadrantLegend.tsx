'use client';
import { Award, Zap, Target, Eye } from 'lucide-react';

export default function QuadrantLegend() {
  return (
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 mt-4 backdrop-blur-sm">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Quadrant Legend</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* LEADERS */}
        <div className="flex items-start gap-2">
          <div className="bg-purple-500/20 p-1.5 rounded text-purple-400 mt-0.5">
            <Award size={14} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold">Leaders (Top-Right)</h4>
            <p className="text-slate-400 text-xs">High Vision + High Execution. These startups define the market.</p>
          </div>
        </div>

        {/* CHALLENGERS */}
        <div className="flex items-start gap-2">
          <div className="bg-blue-500/20 p-1.5 rounded text-blue-400 mt-0.5">
            <Target size={14} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold">Challengers (Top-Left)</h4>
            <p className="text-slate-400 text-xs">Strong Execution but lower Innovation. They dominate established niches.</p>
          </div>
        </div>

        {/* VISIONARIES */}
        <div className="flex items-start gap-2">
          <div className="bg-emerald-500/20 p-1.5 rounded text-emerald-400 mt-0.5">
            <Eye size={14} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold">Visionaries (Bottom-Right)</h4>
            <p className="text-slate-400 text-xs">Disruptive ideas but unproven execution. High risk, high reward.</p>
          </div>
        </div>

        {/* NICHE PLAYERS */}
        <div className="flex items-start gap-2">
          <div className="bg-slate-500/20 p-1.5 rounded text-slate-400 mt-0.5">
            <Zap size={14} />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold">Niche Players (Bottom-Left)</h4>
            <p className="text-slate-400 text-xs">Low Vision + Low Execution. Often local businesses or early stage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}