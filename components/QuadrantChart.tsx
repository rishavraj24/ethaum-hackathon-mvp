'use client';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts';

export default function QuadrantChart({ startupName, x, y }: { startupName: string, x: number, y: number }) {
  
  // Data for the specific startup
  const data = [{ x, y, name: startupName }];

  // Dummy data to show other "competitors" for context (makes the chart look alive)
  const competitors = [
    { x: 30, y: 30, name: 'Legacy Co.' },
    { x: 80, y: 90, name: 'Market Leader' },
    { x: 60, y: 65, name: 'Rising Star' },
    { x: 70, y: 40, name: 'Niche App' },
    { x: 45, y: 80, name: 'Challenger X' },
  ];

  return (
    <div className="w-full h-full bg-white rounded-lg p-4 shadow-inner">
      <h3 className="text-center font-bold text-slate-800 mb-2">AI Market Positioning: {startupName}</h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart
          margin={{
            top: 20,
            right: 30,
            bottom: 50, // INCREASED BOTTOM MARGIN TO FIX OVERLAP
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* X AXIS - FIXED LABEL POSITION */}
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Ability to Execute" 
            domain={[0, 100]}
            label={{ 
              value: 'Ability to Execute', 
              position: 'insideBottom', 
              offset: -35, // Pushes label down manually
              fill: '#475569',
              fontWeight: 'bold'
            }} 
          />
          
          {/* Y AXIS */}
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Completeness of Vision" 
            domain={[0, 100]} 
            label={{ 
              value: 'Completeness of Vision', 
              angle: -90, 
              position: 'insideLeft',
              offset: 0,
              fill: '#475569',
              fontWeight: 'bold',
              style: { textAnchor: 'middle' }
            }}
          />
          
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          
          {/* QUADRANT LINES */}
          <ReferenceLine x={50} stroke="red" strokeDasharray="3 3" />
          <ReferenceLine y={50} stroke="red" strokeDasharray="3 3" />

          {/* QUADRANT LABELS */}
          <ReferenceLine y={95} label={{ position: 'insideTopRight', value: 'Leaders', fill: '#94a3b8', fontSize: 12 }} stroke="none" />
          <ReferenceLine y={95} label={{ position: 'insideTopLeft', value: 'Challengers', fill: '#94a3b8', fontSize: 12 }} stroke="none" />
          <ReferenceLine y={5} label={{ position: 'insideBottomRight', value: 'Visionaries', fill: '#94a3b8', fontSize: 12 }} stroke="none" />
          <ReferenceLine y={5} label={{ position: 'insideBottomLeft', value: 'Niche Players', fill: '#94a3b8', fontSize: 12 }} stroke="none" />

          {/* COMPETITOR DOTS (Gray) */}
          <Scatter name="Competitors" data={competitors} fill="#94a3b8" />

          {/* STARTUP DOT (Blue & Pulsing) */}
          <Scatter name={startupName} data={data} fill="#3b82f6" shape="circle">
             {/* Custom pulsing animation for the main dot if possible, otherwise standard blue */}
          </Scatter>

        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}