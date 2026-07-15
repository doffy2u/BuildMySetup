'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Activity, Users, DollarSign, Database, ShieldAlert } from 'lucide-react';

export default function TelemetryView() {
  const stats = [
    { label: 'Active Pipeline Revenue', value: '$12,480.00', icon: DollarSign, delta: '+12% MoM', color: 'text-emerald-400' },
    { label: 'Registered Platform Nodes', value: '1,420 Users', icon: Users, delta: '+8% Weekly', color: 'text-indigo-400' },
    { label: 'Component Pricing Nodes Tracked', value: '458,920 Specs', icon: Database, delta: 'Sync: Active', color: 'text-purple-400' },
    { label: 'AI Compute Token Volumetrics', value: '42,910 Runs', icon: Activity, delta: 'Healthy Execution', color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto w-full">
      <div>
        <span className="text-xs font-mono text-red-400 tracking-widest uppercase flex items-center gap-1">
          <ShieldAlert className="w-3 h-3" /> System Administrative Control Framework
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-1">Operational Telemetries</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <span className="text-xs text-zinc-400 font-mono font-medium">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold text-white block tracking-tight">{stat.value}</span>
                <span className="text-[10px] font-mono text-zinc-500 block mt-1">{stat.delta}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Database Node Log Streaming Terminal */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Live Architectural System Output Stream</h3>
        <div className="p-4 rounded-xl bg-black border border-white/[0.06] font-mono text-xs text-zinc-400 space-y-1.5 overflow-x-auto max-h-[300px] shadow-2xl">
          <div className="text-zinc-600">[2026-07-15T06:12:45Z] <span className="text-indigo-400">INFO</span> DB_POOL: Checked out connection socket thread allocation loop.</div>
          <div className="text-zinc-600">[2026-07-15T06:12:46Z] <span className="text-emerald-400">PASS</span> MATCH_ENGINE: Verified structural constraints for Ryzen 7 7800X3D vector paths.</div>
          <div className="text-zinc-600">[2026-07-15T06:12:49Z] <span className="text-amber-400">WARN</span> AFFILIATE_SYNC: Amazon API throttling threshold reached. Delaying vector query payload.</div>
          <div className="text-zinc-600">[2026-07-15T06:12:51Z] <span className="text-indigo-400">INFO</span> AI_ROUTER: Token footprint summary calculated for User Node UUID: 8f3c.</div>
        </div>
      </div>
    </div>
  );
}
