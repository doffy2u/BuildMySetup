'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/utils/cn';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { href: '/builder', label: 'AI Builder' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/blog', label: 'Hardware Registry' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-zinc-950/60 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Cpu className="w-5 h-5 text-indigo-500 transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-semibold tracking-tight text-white font-sans text-base">BuildSetup<span className="text-indigo-500 font-mono text-xs ml-1 bg-indigo-500/10 px-1.5 py-0.5 rounded">AI</span></span>
        </Link>

        {/* Desktop Route Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white relative py-1",
                  isActive ? "text-white" : "text-zinc-400"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="nav-underline" 
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-indigo-500" 
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Elements */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">Sign In</Button>
          </Link>
          <Link href="/builder">
            <Button variant="glass" size="sm" className="gap-2">
              Start Building <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-zinc-900 bg-zinc-950 p-6 space-y-4"
        >
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-zinc-400 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link href="/builder" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Start Building</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
