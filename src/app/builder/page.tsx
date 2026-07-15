import * as React from 'react';
import BuildGenerator from '@/features/builder/components/build-generator';
import Navbar from '@/core/components/layout/navbar';
import Footer from '@/core/components/layout/footer';

export default function BuilderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-1 px-6 py-16 md:py-24 relative overflow-hidden">
        {/* Vector Background Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Typography Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Interactive Hardware Modeler
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Build Your Setup
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
              Define your system budget constraints and workloads. Our AI Engine analyzes hardware configurations for precise real-time performance and absolute socket compatibility.
            </p>
          </div>

          {/* Form Area */}
          <BuildGenerator />
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
