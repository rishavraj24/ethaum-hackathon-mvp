import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import StartupCard from '@/components/StartupCard'; // Import our new component

export const revalidate = 0; // Disable cache so we see new votes instantly

async function getStartups() {
  // Fetch startups AND their launch details (upvotes)
  const { data: startups } = await supabase
    .from('startups')
    .select('*, launches(upvotes)')
    .order('created_at', { ascending: false });
  
  return startups || [];
}

export default async function Home() {
  const startups = await getStartups();

  return (
    <main className="min-h-screen bg-slate-900 text-white p-12">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          EthAum.ai
        </h1>
        <p className="mt-4 text-xl text-slate-400">The Revenue Operating System for Startups</p>
        
        <div className="mt-8">
          <Link href="/launch">
            <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all shadow-lg hover:shadow-emerald-500/20">
              🚀 Launch Your Startup
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {startups.map((startup: any) => {
          // Get the upvote count safely (default to 0 if missing)
          const upvoteCount = startup.launches?.[0]?.upvotes || 0;
          
          return (
            <StartupCard 
              key={startup.id} 
              startup={startup} 
              initialUpvotes={upvoteCount} 
            />
          );
        })}
      </div>
    </main>
  );
}