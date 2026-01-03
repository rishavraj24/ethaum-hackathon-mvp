'use client';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ArrowBigUp, Trash2, Trophy, Flame } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

export default function StartupCard({ startup, initialUpvotes }: { startup: any, initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasVoted, setHasVoted] = useState(false);
  const router = useRouter(); 

  async function handleUpvote() {
    if (hasVoted) return; 

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#F59E0B'] 
    });

    const newCount = upvotes + 1;
    setUpvotes(newCount);
    setHasVoted(true);
    await supabase.rpc('increment_upvotes', { startup_id_input: startup.id });
  }

  async function handleDelete(e: any) {
    e.stopPropagation(); 
    if (!confirm(`Delete ${startup.name}?`)) return;

    const { error } = await supabase.from('startups').delete().eq('id', startup.id);
    if (error) alert(error.message);
    else router.refresh();
  }

  function openDetails() {
    router.push(`/startup/${startup.id}`);
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all relative flex flex-col h-full z-20 group">
      
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
           <div className="flex flex-wrap items-center gap-2 mb-2">
             <h2 className="text-2xl font-bold text-white mr-1">{startup.name}</h2>
             
             {/* 1. SERIES A BADGE */}
             <span className="bg-blue-900/50 text-blue-200 text-[10px] px-2 py-0.5 rounded border border-blue-700/50">Series A</span>

             {/* 2. GOLD BADGE (High Votes) */}
             {upvotes > 20 && (
               <span className="flex items-center gap-1 bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-full font-bold shadow-[0_0_15px_rgba(234,179,8,0.6)] animate-pulse">
                 <Trophy size={10} fill="black" /> #1 Product of the Day
               </span>
             )}

             {/* 3. TRENDING BADGE (Medium Votes) */}
             {upvotes > 5 && upvotes <= 20 && (
               <span className="flex items-center gap-1 bg-orange-500/20 text-orange-400 text-[10px] px-2 py-0.5 rounded border border-orange-500/50 font-bold">
                 <Flame size={10} /> Trending
               </span>
             )}
           </div>
           <p className="text-emerald-400 font-medium">{startup.tagline}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={handleDelete} className="p-3 rounded-lg border border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-500 transition-all z-50 relative opacity-0 group-hover:opacity-100">
            <Trash2 size={20} />
          </button>

          <button onClick={handleUpvote} className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all z-50 relative min-w-[60px] ${hasVoted ? 'bg-orange-500 text-white border-orange-500' : 'bg-slate-900 text-slate-400 hover:border-orange-500'}`}>
            <ArrowBigUp size={24} fill={hasVoted ? "white" : "none"} />
            <span className="font-bold text-lg leading-none">{upvotes}</span>
          </button>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">{startup.description}</p>
      
      <button 
        type="button"
        onClick={openDetails}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold text-lg transition mt-auto relative z-[100] cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2"
      >
        View Pilot Deals
      </button>

    </div>
  );
}