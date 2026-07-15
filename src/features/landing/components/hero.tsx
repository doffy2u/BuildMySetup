'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/core/components/ui/button';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
      {/* Decorative High-Contrast Lighting Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-xs font-mono text-indigo-400 mb-6"
      >
        <Sparkles className="w-3.5 h-3.5" /> Deterministic Hardware Verification Active
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.05] mb-8"
      >
        Architect your ideal PC hardware system with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">zero friction</span>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12 font-sans"
      >
        A premium custom configuration platform that couples AI context evaluation loops with real-time architectural compatibility metrics. No guesswork. Just raw hardware performance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 justify-center"
      >
        <Link href="/builder">
          <Button size="lg" className="h-12 px-8 text-sm gap-2 bg-white text-black hover:bg-zinc-200">
            Open Configurator Engine <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="glass" size="lg" className="h-12 px-8 text-sm gap-2">
            <Terminal className="w-4 h-4 text-zinc-500" /> Read Component Logs
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
