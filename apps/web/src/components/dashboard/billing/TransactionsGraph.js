"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { date: 'Nov 24', amount: 12.50 },
  { date: 'Nov 25', amount: 8.75 },
  { date: 'Nov 26', amount: 15.20 },
  { date: 'Nov 27', amount: 10.30 },
  { date: 'Nov 28', amount: 20.15 },
  { date: 'Nov 29', amount: 18.40 },
  { date: 'Nov 30', amount: 14.90 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-dark border border-white/5 rounded-lg p-3">
        <p className="text-text-dark-primary text-sm mb-1">{label}</p>
        <p className="text-lime-400 text-sm font-medium">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export default function TransactionsGraph() {
  return (
    <div className="bg-background-elevated-dark rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-text-dark-primary">Transactions</h2>
        <select className="bg-transparent text-text-dark-secondary border border-white/10 rounded px-3 py-1.5 text-sm focus:border-lime-400 outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#D1D5DB', fontSize: 12 }}
              axisLine={{ stroke: '#ffffff1a' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#D1D5DB', fontSize: 12 }}
              axisLine={{ stroke: '#ffffff1a' }}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(132, 204, 22, 0.1)' }}
            />
            <Bar 
              dataKey="amount" 
              fill="#84cc16"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 