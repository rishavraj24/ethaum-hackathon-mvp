'use client';
import Link from 'next/link'; // <--- Added this import
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ArrowBigUp } from 'lucide-react';

export default function StartupCard({ startup, initialUpvotes }: { startup: any, initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasVoted, setHasVoted] = useState(false);

  async function handleUpvote() {
    if (hasVoted) return; // Prevent double voting

    const newCount = upvotes + 1;
    setUpvotes(newCount); // Instant UI update (Optimistic)
    setHasVoted(true);

    // Update the real database in the background
    await supabase.rpc('increment_upvotes', { startup_id_input: startup.id });
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all group relative flex flex-col h-full">
      
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between mb-4">
        <div>
           <div className="flex items-center gap-3">
             <h2 className="text-2xl font-bold text-white">{startup.name}</h2>
             <span className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">Series A</span>
           </div>
           <p className="text-emerald-400 font-medium mt-1">{startup.tagline}</p>
        </div>

        {/* THE UPVOTE BUTTON */}
        <button 
          onClick={handleUpvote}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
            hasVoted 
              ? 'bg-orange-500 border-orange-500 text-white' 
              : 'bg-slate-900 border-slate-600 text-slate-400 hover:border-orange-500 hover:text-orange-500'
          }`}
        >
          <ArrowBigUp size={24} fill={hasVoted ? "white" : "none"} />
          <span className="font-bold text-lg">{upvotes}</span>
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">{startup.description}</p>
      
      {/* ACTION BUTTON - NOW LINKED TO DETAIL PAGE */}
      <Link href={`/startup/${startup.id}`} className="mt-auto">
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition">
          View Pilot Deals
        </button>
      </Link>
    </div>
  );
}