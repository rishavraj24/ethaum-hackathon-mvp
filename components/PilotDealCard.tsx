'use client';
import { CheckCircle, Zap } from 'lucide-react';
import { useState } from 'react';

export default function PilotDealCard({ startupName }: { startupName: string }) {
  const [claimed, setClaimed] = useState(false);

  // SIMULATED "AI-GENERATED" DEAL (No empty database issues!)
  const deal = {
    title: `Enterprise Pilot: ${startupName}`,
    features: [
      '3-Month Unlimited Access',
      'Dedicated Customer Success Manager',
      'API Integration Support',
      'White-label Reporting'
    ],
    originalPrice: 15000,
    dealPrice: 4999,
    seats: 10
  };

  function handleClaim() {
    setClaimed(true);
    alert(`Boom! You claimed the pilot for ${startupName}. An intro email has been simulated.`);
  }

  return (
    <div className="bg-slate-800 rounded-xl border-2 border-emerald-500/50 overflow-hidden shadow-2xl shadow-emerald-900/20">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white text-center">
        <h3 className="font-bold text-lg flex items-center justify-center gap-2">
          <Zap size={20} className="text-yellow-300 fill-yellow-300" />
          Exclusive Hackathon Deal
        </h3>
      </div>

      {/* PRICING */}
      <div className="p-6">
        <h4 className="text-xl font-bold text-white mb-2">{deal.title}</h4>
        <div className="flex items-end gap-3 mb-6">
          <span className="text-4xl font-black text-emerald-400">${deal.dealPrice}</span>
          <span className="text-lg text-slate-500 line-through mb-1">${deal.originalPrice}</span>
          <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded mb-2">Save 66%</span>
        </div>

        {/* FEATURES */}
        <ul className="space-y-3 mb-8">
          {deal.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
              <CheckCircle size={16} className="text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>

        {/* ACTION BUTTON */}
        <button 
          onClick={handleClaim}
          disabled={claimed}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            claimed 
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg hover:shadow-emerald-500/50'
          }`}
        >
          {claimed ? '✓ Deal Claimed' : '⚡ Get Pilot Access Now'}
        </button>
        <p className="text-center text-xs text-slate-500 mt-3">Risk-free. 30-day money-back guarantee.</p>
      </div>
    </div>
  );
}