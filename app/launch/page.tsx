'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LaunchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get('name') as string;
    const tagline = formData.get('tagline') as string;
    const description = formData.get('description') as string;

    // 1. Create the Startup
    const { data: startup, error: startupError } = await supabase
      .from('startups')
      .insert([{ name, tagline, description }])
      .select()
      .single();

    if (startupError) {
      alert('Error launching: ' + startupError.message);
      setLoading(false);
      return;
    }

    // 2. Automatically Create a "Launch" Event (The Viral Loop)
    const { error: launchError } = await supabase
      .from('launches')
      .insert([{ startup_id: startup.id, upvotes: 0 }]);

    if (!launchError) {
      // Success! Go back home
      router.push('/');
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Launch Your Startup</h1>
        <p className="text-slate-400 mb-6">Get discovered by enterprises instantly.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Startup Name</label>
            <input name="name" required className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none" placeholder="e.g. SuperAI" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Tagline (Pitch in 1 line)</label>
            <input name="tagline" required className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none" placeholder="AI that writes code for you" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea name="description" required rows={4} className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none" placeholder="Explain your value..." />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all"
          >
            {loading ? 'Launching Rocket...' : '🚀 Launch Now'}
          </button>
        </form>
      </div>
    </main>
  );
}