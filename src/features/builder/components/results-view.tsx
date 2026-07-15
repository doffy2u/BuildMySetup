'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { ShieldAlert, Share2, BookmarkPlus, Layers, Zap, Flame, Award } from 'lucide-react';

export default function ResultsView() {
  const [isSaved, setIsSaved] = React.useState(false);

  const mockComponents = [
    { part: 'Processor (CPU)', name: 'AMD Ryzen 7 7800X3D', price: '$369.00', role: 'Primary system task orchestrator.' },
    { part: 'Graphics (GPU)', name: 'NVIDIA RTX 4080 Super 16GB', price: '$999.00', role: 'Handles 4K rasterization frames.' },
    { part: 'Motherboard', name: 'ASUS ROG Strix B650E-E Gaming', price: '$299.00', role: 'PCIe 5.0 signal lane integrity foundation.' },
    { part: 'Memory', name: 'G.Skill Trident Z5 Neo 32GB DDR5-6000', price: '$115.00', role: 'Exhibits sub-10ns processing delays.' },
  ];

  const scores = [
    { cat: 'Gaming Engine Metric', val: 99, color: 'text-indigo-400' },
    { cat: 'Compute Productivity', val: 88, color: 'text-emerald-400' },
    { cat: 'Upgrade Pathways Runway', val: 95, color: 'text-purple-400' },
    { cat: 'Thermal Management Index', val: 90, color: 'text-amber-400' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/[0.04] pb-8">
        <div>
          <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">Configuration Result Vector</span>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">AI Synthesis: Quantum Core 4K Setup</h1>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="glass" className="flex-1 md:flex-initial gap-2" onClick={() => setIsSaved(!isSaved)}>
            <BookmarkPlus className="w-4 h-4" /> {isSaved ? 'Config Persisted' : 'Save Plan'}
          </Button>
          <Button variant="glass" className="flex-1 md:flex-initial gap-2">
            <Share2 className="w-4 h-4" /> Export Spec Matrix
          </Button>
        </div>
      </div>

      {/* Main Analysis Architecture Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Sourced Parts Specification Manifest */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <h3 className="text-sm font-mono tracking-wider text-zinc-400 uppercase">Component Specification Blueprint</h3>
          <div className="space-y-4">
            {mockComponents.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between p-5 rounded-xl border border-white/[0.04] bg-zinc-900/10 backdrop-blur-md group hover:border-white/[0.1] transition-all">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-500 block">{item.part}</span>
                  <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{item.name}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-md">{item.role}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
                  <span className="font-mono font-bold text-white text-sm bg-zinc-800/60 px-2 py-1 rounded border border-white/[0.06]">{item.price}</span>
                  <span className="text-[10px] font-mono text-emerald-400 mt-1">In Stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Scoring Matrix Gauges */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono tracking-wider text-zinc-400 uppercase">System Score Performance Breakdown</h3>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                <div>
                  <span className="text-xs text-zinc-500 font-mono">Aggregated Score</span>
                  <span className="text-4xl font-bold text-white block">95<span className="text-zinc-500 text-lg">/100</span></span>
                </div>
                <Award className="w-8 h-8 text-indigo-400" />
              </div>

              <div className="space-y-4">
                {scores.map((s, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">{s.cat}</span>
                      <span className={`font-bold ${s.color}`}>{s.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${s.val}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="h-full bg-indigo-500 rounded-full" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Validation Compatibility Report Block */}
          <Card className="border-emerald-500/20 bg-emerald-500/[0.01]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" /> Compatibility Verification Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400 leading-relaxed font-mono space-y-2">
              <div className="flex justify-between border-b border-white/[0.02] pb-1"><span>[✓] Socket Fit Matrix:</span> <span className="text-emerald-400">AM5 Verified</span></div>
              <div className="flex justify-between border-b border-white/[0.02] pb-1"><span>[✓] Transient Wattage Peak:</span> <span className="text-emerald-400">450W / 850W PSU</span></div>
              <div className="flex justify-between"><span>[✓] Case Clearance Space:</span> <span className="text-emerald-400">340mm Available</span></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Metric Environmental Forecast Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <Card className="flex items-center gap-4 p-5">
          <Zap className="w-6 h-6 text-yellow-400 shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Estimated Power Load</span>
            <span className="text-lg font-bold text-white">520 Watts Peak</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <Flame className="w-6 h-6 text-orange-400 shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Thermal Load Profiles</span>
            <span className="text-lg font-bold text-white">72°C Full Computation</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <ShieldAlert className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Bottleneck Risk Ratios</span>
            <span className="text-lg font-bold text-white">0.8% - Hyper Balanced</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
