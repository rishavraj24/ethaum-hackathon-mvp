'use client';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ArrowBigUp, Trash2 } from 'lucide-react'; // Added Trash2 icon
import { useRouter } from 'next/navigation';

export default function StartupCard({ startup, initialUpvotes }: { startup: any, initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasVoted, setHasVoted] = useState(false);
  const router = useRouter(); // To refresh page after delete

  async function handleUpvote() {
    if (hasVoted) return; 
    const newCount = upvotes + 1;
    setUpvotes(newCount);
    setHasVoted(true);
    await supabase.rpc('increment_upvotes', { startup_id_input: startup.id });
  }

  // NEW: DELETE FUNCTION
  async function handleDelete(e: any) {
    e.preventDefault(); // Stop the link from clicking
    e.stopPropagation();
    
    const confirm = window.confirm(`Are you sure you want to delete ${startup.name}?`);
    if (!confirm) return;

    // Delete from Supabase
    const { error } = await supabase.from('startups').delete().eq('id', startup.id);
    
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      // Refresh the page to make it disappear
      router.refresh();
    }
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all group relative flex flex-col h-full">
      
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
           <div className="flex items-center gap-3">
             <h2 className="text-2xl font-bold text-white">{startup.name}</h2>
             <span className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">Series A</span>
           </div>
           <p className="text-emerald-400 font-medium mt-1">{startup.tagline}</p>
        </div>

        <div className="flex gap-2">
          {/* DELETE BUTTON (Only visible on hover to keep it clean) */}
          <button 
            onClick={handleDelete}
            className="p-3 rounded-lg border border-slate-700 text-slate-500 hover:bg-red-900/20 hover:text-red-500 hover:border-red-500 transition-all"
            title="Delete Startup"
          >
            <Trash2 size={24} />
          </button>

          {/* UPVOTE BUTTON */}
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
      </div>

      {/* DESCRIPTION */}
      <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">{startup.description}</p>
      
      {/* ACTION BUTTON */}
      <Link href={`/startup/${startup.id}`} className="mt-auto">
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition">
          View Pilot Deals
        </button>
      </Link>
    </div>
  );
}