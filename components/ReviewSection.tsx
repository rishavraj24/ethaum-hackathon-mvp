'use client';
import { Star, CheckCircle, Linkedin, PlayCircle } from 'lucide-react';

export default function ReviewSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Verified Pilot Reviews</h2>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
           <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-4 h-4" alt="LinkedIn" />
           <span className="text-xs text-slate-300">Identity Verified via LinkedIn</span>
        </div>
      </div>

      {/* REVIEW CARD 1 */}
      <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl text-white">SJ</div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                Sarah Jenkins 
                <span className="bg-emerald-900/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1">
                  <CheckCircle size={10} /> Verified CTO
                </span>
              </h3>
              <p className="text-sm text-slate-400">CTO @ TechFlow • Series B Fintech</p>
            </div>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-orange-500 text-orange-500" />)}
          </div>
        </div>

        <p className="text-slate-300 italic mb-4">"We replaced our entire manual supply chain process with this tool. The AI prediction is 95% accurate. It saved us about $200k in the first quarter alone."</p>

        {/* METRICS & VIDEO */}
        <div className="flex gap-4 border-t border-slate-800 pt-4">
           <div className="bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
             <span className="text-xs text-slate-400 block">ROI Speed</span>
             <span className="text-sm font-bold text-white">3 Months</span>
           </div>
           <button className="flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition">
             <PlayCircle size={16} /> Watch Video Testimonial
           </button>
        </div>
      </div>

      {/* REVIEW CARD 2 */}
      <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 backdrop-blur-sm opacity-70 hover:opacity-100 transition">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-xl text-white">MK</div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                Mike K.
                <span className="bg-emerald-900/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1">
                  <CheckCircle size={10} /> Verified Founder
                </span>
              </h3>
              <p className="text-sm text-slate-400">Founder @ DataSync</p>
            </div>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-orange-500 text-orange-500" />)}
          </div>
        </div>
        <p className="text-slate-300 italic">"The automated reports are a game changer. Investors love the clarity."</p>
      </div>
    </div>
  );
}