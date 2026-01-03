import { Star, BadgeCheck, Video } from 'lucide-react'; // <--- FIXED NAME HERE

export default function ReviewSection() {
  // SIMULATED REVIEWS
  const reviews = [
    {
      user: "Sarah Jenkins",
      role: "CTO @ TechFlow",
      text: "We replaced our entire manual supply chain process with this tool. The AI prediction is 95% accurate.",
      rating: 5,
      verified: true,
      hasVideo: true
    },
    {
      user: "Mike Ross",
      role: "Founder @ Pearson Law",
      text: "The pilot pricing was a no-brainer. ROI was positive in week 2.",
      rating: 5,
      verified: true,
      hasVideo: false
    }
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BadgeCheck className="text-blue-500" /> {/* <--- FIXED NAME HERE */}
        Verified Pilot Reviews
      </h3>

      <div className="space-y-6">
        {reviews.map((review, i) => (
          <div key={i} className="border-b border-slate-700 pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-white flex items-center gap-2">
                  {review.user}
                  {review.verified && (
                    <span className="bg-blue-900/50 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-800 flex items-center gap-1">
                      <BadgeCheck size={10} /> Verified Buyer {/* <--- FIXED NAME HERE */}
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-400">{review.role}</p>
              </div>
              <div className="flex text-yellow-500">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-3">"{review.text}"</p>

            {review.hasVideo && (
              <button className="flex items-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded transition">
                <Video size={14} /> Watch Video Testimonial (AI Transcribed)
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}