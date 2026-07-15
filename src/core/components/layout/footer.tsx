import Link from 'next/link';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.04] bg-zinc-950 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold text-white tracking-tight">BuildSetup AI</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-sm leading-relaxed font-mono">
            Enterprise systems hardware config infrastructure optimization engine. Powered by real-time inventory parity validation graphs.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase mb-4">Core Engine</h4>
          <ul className="space-y-2.5 text-xs text-zinc-500">
            <li><Link href="/builder" className="hover:text-white transition-colors">AI Architect Builder</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Compatibility Rules</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Matrix</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase mb-4">Account Workspace</h4>
          <ul className="space-y-2.5 text-xs text-zinc-500">
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Configuration Dashboard</Link></li>
            <li><Link href="/dashboard/settings" className="hover:text-white transition-colors">Workspace Profile</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Saved Blueprints</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase mb-4">Legal Operations</h4>
          <ul className="space-y-2.5 text-xs text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">Affiliate Disclosures</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Platform Use</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
        <span>&copy; {new Date().getFullYear()} BuildSetup AI Inc. Global Distribution Networks.</span>
        <span>Assembled under low-latency microservice architectures.</span>
      </div>
    </footer>
  );
}
