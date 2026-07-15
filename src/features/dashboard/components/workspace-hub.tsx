'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { Cpu, Clock, Layers, ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function WorkspaceHub() {
  const history = [
    { title: 'AI Spec Run - Deep Learning Rig', cost: '$3,400', date: '3 days ago', status: 'Active Blueprint' },
    { title: 'Budget Alternative Plan - Client Work', cost: '$1,200', date: '1 week ago', status: 'Archived' },
  ];

  return (
    <div className="space-y-10">
      {/* Workspace Summary Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Hardware Assembly Workspace</h1>
          <p className="text-sm text-zinc-400">Manage custom system footprints and track marketplace cost movements.</p>
        </div>
        <Link href="/builder">
          <Button size="sm" className="gap-2 text-xs h-9 bg-white text-black hover:bg-zinc-200">
            <Plus className="w-4 h-4" /> New Spec Build
          </Button>
        </Link>
      </div>

      {/* Aggregate Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono uppercase">Persistent Blueprints</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-3xl font-bold text-white">4 Active</span>
        </Card>
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono uppercase">Tracked Components</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-bold text-white">32 Units</span>
        </Card>
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-mono uppercase">Optimization Runs</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-3xl font-bold text-white">18 Total</span>
        </Card>
      </div>

      {/* Recent Activity Specification Table List */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Recent System Blueprints</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-white/[0.04]">
              {history.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-white/[0.01] transition-all group">
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">{item.title}</span>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                      <span>{item.cost}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-white/[0.04]">{item.status}</span>
                    <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
