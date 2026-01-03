'use client';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

export default function QuadrantChart({ startupName }: { startupName: string }) {
  // SIMULATED AI DATA (In a real app, OpenAI generates this)
  const data = [
    { x: 85, y: 90, name: startupName, isHero: true }, // The User (Top Right)
    { x: 45, y: 80, name: 'Competitor A', isHero: false },
    { x: 70, y: 40, name: 'Competitor B', isHero: false },
    { x: 30, y: 30, name: 'Legacy Corp', isHero: false },
    { x: 60, y: 65, name: 'Startup X', isHero: false },
  ];

  return (
    <div className="w-full h-[400px] bg-white rounded-lg p-4 text-black">
      <h3 className="text-center font-bold text-slate-800 mb-2">AI Market Positioning: {startupName}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          {/* THE AXES */}
          <XAxis type="number" dataKey="x" name="Execution" domain={[0, 100]} label={{ value: 'Ability to Execute', position: 'bottom', offset: 0 }} />
          <YAxis type="number" dataKey="y" name="Innovation" domain={[0, 100]} label={{ value: 'Completeness of Vision', angle: -90, position: 'left' }} />
          
          {/* THE QUADRANT LINES */}
          <ReferenceLine x={50} stroke="red" strokeDasharray="3 3" />
          <ReferenceLine y={50} stroke="red" strokeDasharray="3 3" />

          {/* QUADRANT LABELS */}
          <Label value="Challengers" position="insideTopLeft" />
          <Label value="Leaders" position="insideTopRight" />
          <Label value="Niche Players" position="insideBottomLeft" />
          <Label value="Visionaries" position="insideBottomRight" />

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          
          {/* THE DOTS */}
          <Scatter name="Startups" data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <circle key={index} cx={0} cy={0} r={entry.isHero ? 8 : 5} fill={entry.isHero ? "#2563eb" : "#94a3b8"} stroke="none" />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}