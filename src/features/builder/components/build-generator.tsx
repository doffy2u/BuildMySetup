'use client';

import * as React from 'react';
import { 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  Check, 
  Loader2, 
  Layers, 
  Globe, 
  Flame, 
  CheckCircle2,
  HardDrive,
  Gamepad2,
  Tv,
  Coins,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';
import { generateBuildPlan, GenerateBuildResult, AIBuildData } from '../actions/generate-build';

export type PrimaryUseCase = 'Gaming' | 'Programming' | 'Video Editing' | 'AI / Machine Learning' | 'Office' | 'Streaming';
export type Currency = 'INR' | 'USD' | 'EUR';

export interface BuildPreferences {
  budget: string;
  currency: Currency;
  primaryUseCase: PrimaryUseCase;
  country: string;
  preferredBrands: string[];
  rgbPreference: boolean;
}

const BRANDS = ['ASUS', 'MSI', 'Gigabyte', 'Corsair', 'AMD', 'Intel', 'NVIDIA'];
const USE_CASES: PrimaryUseCase[] = [
  'Gaming',
  'Programming',
  'Video Editing',
  'AI / Machine Learning',
  'Office',
  'Streaming',
];

export default function BuildGenerator() {
  const [preferences, setPreferences] = React.useState<BuildPreferences>({
    budget: '',
    currency: 'INR',
    primaryUseCase: 'Gaming',
    country: 'India',
    preferredBrands: [],
    rgbPreference: false,
  });

  const [errors, setErrors] = React.useState<{ budget?: string }>({});
  const [isPending, setIsPending] = React.useState(false);
  const [actionResult, setActionResult] = React.useState<GenerateBuildResult | null>(null);

  const handleBrandToggle = (brand: string) => {
    setPreferences((prev) => {
      const exists = prev.preferredBrands.includes(brand);
      return {
        ...prev,
        preferredBrands: exists
          ? prev.preferredBrands.filter((b) => b !== brand)
          : [...prev.preferredBrands, brand],
      };
    });
  };

  const validate = (): boolean => {
    const newErrors: { budget?: string } = {};
    if (!preferences.budget) {
      newErrors.budget = 'Budget amount is required.';
    } else if (isNaN(Number(preferences.budget)) || Number(preferences.budget) <= 0) {
      newErrors.budget = 'Please enter a valid positive number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsPending(true);
    setActionResult(null);

    try {
      const response = await generateBuildPlan(preferences);
      setActionResult(response);
    } catch (error) {
      setActionResult({
        success: false,
        error: 'An unexpected connection failure disrupted the compilation run.',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <form 
        onSubmit={handleSubmit} 
        className="space-y-8 bg-zinc-900/40 backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

        <div className="border-b border-white/[0.06] pb-6">
          <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" /> System Architecture Parameters
          </h2>
          <p className="text-sm text-zinc-400 mt-1 font-mono">Specify hardware limits and environment parameters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Input & Currency Select */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Financial Limit *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  required
                  placeholder="50000"
                  disabled={isPending}
                  value={preferences.budget}
                  onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                  className="w-full h-11 bg-zinc-950/80 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 text-white rounded-lg px-4 text-sm font-mono transition-all outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-mono">
                  {preferences.currency}
                </span>
              </div>

              <div className="relative">
                <select
                  value={preferences.currency}
                  disabled={isPending}
                  onChange={(e) => setPreferences({ ...preferences, currency: e.target.value as Currency })}
                  className="h-11 bg-zinc-950/80 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 text-white rounded-lg px-3 text-sm font-mono transition-all outline-none cursor-pointer appearance-none pr-8"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-500">
                  ▼
                </div>
              </div>
            </div>
            {errors.budget && (
              <p className="text-xs text-red-400 flex items-center gap-1 font-mono mt-1">
                <ShieldAlert className="w-3.5 h-3.5" /> {errors.budget}
              </p>
            )}
          </div>

          {/* Primary Use Case */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Primary System Load
            </label>
            <div className="relative">
              <select
                value={preferences.primaryUseCase}
                disabled={isPending}
                onChange={(e) => setPreferences({ ...preferences, primaryUseCase: e.target.value as PrimaryUseCase })}
                className="w-full h-11 bg-zinc-950/80 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 text-white rounded-lg px-4 text-sm transition-all outline-none cursor-pointer appearance-none"
              >
                {USE_CASES.map((useCase) => (
                  <option key={useCase} value={useCase}>
                    {useCase}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500">
                ▼
              </div>
            </div>
          </div>

          {/* Target Country */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Operational Country Location
            </label>
            <input
              type="text"
              required
              disabled={isPending}
              value={preferences.country}
              onChange={(e) => setPreferences({ ...preferences, country: e.target.value })}
              className="w-full h-11 bg-zinc-950/80 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 text-white rounded-lg px-4 text-sm transition-all outline-none"
            />
          </div>

          {/* RGB Toggle preference */}
          <div className="space-y-2 flex flex-col justify-end pb-1.5">
            <div className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] bg-zinc-950/40">
              <div className="space-y-0.5">
                <span className="text-xs font-mono text-zinc-300">Visual RGB Aesthetic</span>
                <p className="text-[10px] text-zinc-500 leading-none">Prioritize component chassis light strips.</p>
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={() => setPreferences({ ...preferences, rgbPreference: !preferences.rgbPreference })}
                className={`w-11 h-6 rounded-full transition-colors relative outline-none disabled:opacity-50 ${
                  preferences.rgbPreference ? 'bg-indigo-500' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    preferences.rgbPreference ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Brand Selection Multi-Checkboxes */}
        <div className="space-y-3">
          <label className="block text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
            Preferred Brand Matrix <span className="text-zinc-600">(Optional)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BRANDS.map((brand) => {
              const isSelected = preferences.preferredBrands.includes(brand);
              return (
                <button
                  type="button"
                  key={brand}
                  disabled={isPending}
                  onClick={() => handleBrandToggle(brand)}
                  className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all text-left disabled:opacity-50 ${
                    isSelected
                      ? 'border-indigo-500/50 bg-indigo-500/[0.03] text-white'
                      : 'border-white/[0.06] bg-zinc-950/20 text-zinc-400 hover:text-white hover:border-white/[0.12]'
                  }`}
                >
                  <span className="font-medium">{brand}</span>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-white/[0.15] bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 max-w-sm leading-relaxed font-mono">
            * Server validation logic processes budget boundaries through Gemini AI node constraints.
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto h-12 px-8 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Querying Gemini API...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Build
              </>
            )}
          </button>
        </div>
      </form>

      {/* Modern High-End AI Result View */}
      {actionResult && (
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center gap-2.5 px-1">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h3 className="text-sm font-mono tracking-wider text-zinc-400 uppercase">
              Gemini-synthesized build architecture
            </h3>
          </div>

          {actionResult.success && actionResult.data ? (
            <div className="space-y-8">
              {/* Target Price Overview & High-Level Summary Card */}
              <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-950/80 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="absolute top-0 right-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent to-indigo-500 opacity-60" />
                
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Execution Success Node
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-3">Estimated Specs Target</h3>
                  <p className="text-sm text-zinc-400 mt-1 font-sans">
                    Configured with exact thermal and dimension clearances.
                  </p>
                </div>

                <div className="bg-zinc-950/60 border border-white/[0.06] rounded-xl px-6 py-4 min-w-[200px] text-right">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Sum Value Estimated</span>
                  <span className="text-2xl font-mono font-bold text-emerald-400 mt-1 block">
                    {actionResult.data.estimatedPrice}
                  </span>
                </div>
              </div>

              {/* Hardware Grid Component Specification Manifest */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Processor (CPU)", val: actionResult.data.cpu, icon: Cpu },
                  { title: "Graphics Card (GPU)", val: actionResult.data.gpu, icon: Gamepad2 },
                  { title: "Motherboard", val: actionResult.data.motherboard, icon: Layers },
                  { title: "Memory (RAM)", val: actionResult.data.ram, icon: Coins },
                  { title: "Storage Drive", val: actionResult.data.storage, icon: HardDrive },
                  { title: "Power Supply Unit (PSU)", val: actionResult.data.psu, icon: Tv },
                  { title: "Chassis Case", val: actionResult.data.case, icon: Layers },
                  { title: "Cooling System", val: actionResult.data.cooler, icon: Flame },
                ].map((part, idx) => {
                  const Icon = part.icon;
                  return (
                    <div 
                      key={idx} 
                      className="bg-zinc-900/20 border border-white/[0.04] hover:border-white/[0.1] transition-all rounded-xl p-5 flex items-start gap-4"
                    >
                      <div className="p-2.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-indigo-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                          {part.title}
                        </span>
                        <span className="text-sm font-semibold text-white leading-snug block">
                          {part.val}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Warnings and Upgrade Pathways */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Compatibility Checklist */}
                <div className="bg-zinc-900/10 border border-white/[0.04] rounded-xl p-6 space-y-4">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-400" />
                    Compatibility Verification Matrix
                  </h4>
                  <ul className="space-y-2.5">
                    {actionResult.data.compatibilityNotes.map((note, index) => (
                      <li key={index} className="flex gap-2 text-xs text-zinc-300 leading-relaxed font-mono">
                        <span className="text-emerald-400 select-none">[✓]</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Roadmaps and Pathways */}
                <div className="bg-zinc-900/10 border border-white/[0.04] rounded-xl p-6 space-y-4">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Upgrade Roadmap suggestions
                  </h4>
                  <ul className="space-y-2.5">
                    {actionResult.data.upgradeSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex gap-2 text-xs text-zinc-300 leading-relaxed font-mono">
                        <span className="text-indigo-400 select-none"><ArrowRight className="w-3 h-3 mt-0.5" /></span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/[0.02] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
              <div className="space-y-1">
                <span className="text-sm font-medium text-white">Verification Rejected</span>
                <p className="text-xs text-zinc-400 font-mono leading-relaxed">{actionResult.error}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
