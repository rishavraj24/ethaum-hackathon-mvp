import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import StartupCard from '@/components/StartupCard';

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
    // 1. UPDATED: GRID BACKGROUND & RELATIVE POSITIONING
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      
      {/* 2. THE GRID OVERLAY (Makes it look high-tech) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content Container (z-10 ensures it sits above the grid) */}
      <div className="relative z-10 p-12">
        
        {/* HERO SECTION */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          
          {/* 3. THE SHINING TEXT ANIMATION */}
          <h1 className="text-7xl font-black tracking-tight mb-4">
            <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-8xl font-black bg-300%">
              EthAum.ai
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
            The Revenue Operating System for Startups. <br/>
            <span className="text-slate-500 text-sm">Launch • Validate • Sell • Trust</span>
          </p>
          
          <div className="mt-10">
            <Link href="/launch">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.7)] hover:scale-105">
                🚀 Launch Your Startup
              </button>
            </Link>
          </div>
        </div>

        {/* STARTUP GRID */}
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

        {/* 4. FOOTER */}
        <footer className="mt-20 text-center text-slate-600 text-sm pb-8">
          <p>© 2026 EthAum Venture Partners. Built for the Hackathon.</p>
          <div className="flex justify-center gap-4 mt-2">
            <span>Privacy</span> • <span>Terms</span> • <span>Investors</span>
          </div>
        </footer>

      </div>
    </main>
  );
}