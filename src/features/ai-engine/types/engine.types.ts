import { z } from "zod";

export const BuildPurposeSchema = z.enum([
  "GAMING", "PROGRAMMING", "VIDEO_EDITING", "THREE_D_RENDERING", 
  "STREAMING", "MACHINE_LEARNING", "AI_DEVELOPMENT", "OFFICE", 
  "SCHOOL", "MUSIC_PRODUCTION", "ARCHITECTURE", "MIXED_USE"
]);

export const NoisePreferenceSchema = z.enum(["SILENT", "BALANCED", "PERFORMANCE_FIRST"]);
export const RgbPreferenceSchema = z.enum(["NONE", "SUBTLE", "ALL_THE_RGB"]);

export const AiBuildRequestSchema = z.object({
  budget: z.number().positive("Budget must be greater than 0"),
  country: z.string().min(2).max(3),
  currency: z.string().length(3),
  primaryPurpose: BuildPurposeSchema,
  secondaryPurpose: BuildPurposeSchema.optional(),
  gamesPlayed: z.array(z.string()).default([]),
  softwareUsed: z.array(z.string()).default([]),
  currentPcSpecs: z.string().optional(),
  monitorResolution: z.enum(["1080p", "1440p", "4K", "8K"]),
  refreshRate: z.number().int().positive().default(60),
  targetFps: z.number().int().positive().default(60),
  preferredBrands: z.array(z.string()).default([]),
  brandsToAvoid: z.array(z.string()).default([]),
  rgbPreference: RgbPreferenceSchema.default("BALANCED"),
  noisePreference: NoisePreferenceSchema.default("BALANCED"),
  wifiRequired: z.boolean().default(false),
  bluetoothRequired: z.boolean().default(false),
  upgradeTimelineWeeks: z.number().int().nonnegative().default(0),
  
  // Peripherals Checklist
  peripherals: z.object({
    needMonitor: z.boolean().default(false),
    needKeyboard: z.boolean().default(false),
    needMouse: z.boolean().default(false),
    needSpeakers: z.boolean().default(false),
    needUps: z.boolean().default(false),
    needWebcam: z.boolean().default(false),
    needMicrophone: z.boolean().default(false),
  }).default({}),
  
  alreadyOwnedItems: z.array(z.string()).default([]),
  extraNotes: z.string().max(1000).optional(),
});

export type AiBuildRequest = z.infer<typeof AiBuildRequestSchema>;

export interface ComponentRecommendation {
  componentId: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  reasoning: string;
  specs: Record<string, unknown>;
}

export interface BuildMetrics {
  totalCost: number;
  powerConsumptionWatts: number;
  psuHeadroomWatts: number;
  estimatedTuning: {
    cpuIdleTempCelsius: number;
    cpuLoadTempCelsius: number;
    gpuIdleTempCelsius: number;
    gpuLoadTempCelsius: number;
  };
  performanceFps: Record<string, number>;
}

export interface SystemScore {
  score: number;
  breakdown: string;
}

export interface ProprietaryBuildScore {
  gaming: SystemScore;
  productivity: SystemScore;
  value: SystemScore;
  upgradeability: SystemScore;
  cooling: SystemScore;
  efficiency: SystemScore;
  aesthetics: SystemScore;
  reliability: SystemScore;
  futureProof: SystemScore;
  overallScore: number;
}

export interface EngineWarning {
  code: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
}

export interface BuiltVariation {
  label: string;
  description: string;
  components: ComponentRecommendation[];
  metrics: BuildMetrics;
  scores: ProprietaryBuildScore;
}

export interface CompleteAiEngineOutput {
  primaryBuild: {
    components: ComponentRecommendation[];
    metrics: BuildMetrics;
    scores: ProprietaryBuildScore;
    warnings: EngineWarning[];
    reasoningSummary: string;
    upgradeSuggestions: string[];
  };
  variations: {
    cheaperOption: BuiltVariation | null;
    performanceOption: BuiltVariation | null;
    silentOption: BuiltVariation | null;
    rgbOption: BuiltVariation | null;
    bestValueOption: BuiltVariation | null;
  };
}
