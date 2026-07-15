"use server";

import { BuildPreferences } from "../components/build-generator";

export interface AIBuildData {
  cpu: string;
  gpu: string;
  motherboard: string;
  ram: string;
  storage: string;
  psu: string;
  case: string;
  cooler: string;
  estimatedPrice: string;
  compatibilityNotes: string[];
  upgradeSuggestions: string[];
}

export interface GenerateBuildResult {
  success: boolean;
  data?: AIBuildData;
  error?: string;
  timestamp: string;
}

/**
 * Server Action that sends build preferences to the Google Gemini API 
 * and returns a guaranteed, schema-validated JSON PC build specification.
 */
export async function generateBuildPlan(payload: BuildPreferences): Promise<GenerateBuildResult> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "Server configuration error: Gemini API Key is missing. Please check your environmental variables.",
        timestamp: new Date().toISOString(),
      };
    }

    // Prepare clear structured prompting
    const prompt = `
You are a highly advanced hardware engineer and PC builder assistant. Your job is to output a fully compatible, optimized, real-world PC build based on the user's constraints.

User Preferences:
- Budget: ${payload.budget} ${payload.currency}
- Country: ${payload.country}
- Primary Use Case: ${payload.primaryUseCase}
- Preferred Brands: ${payload.preferredBrands.length > 0 ? payload.preferredBrands.join(", ") : "Any"}
- RGB Preference: ${payload.rgbPreference ? "Yes, prioritize RGB lighting aesthetics" : "No, prioritize clean, stealthy or non-RGB designs"}

Strict Requirements:
1. Recommend specific, real hardware components available for purchase today that fit within the designated budget constraint of ${payload.budget} ${payload.currency} in ${payload.country}.
2. Ensure absolute socket, clearance, motherboard, and power wattage compatibility between all parts.
3. You must return your response as a single, valid JSON object and nothing else. No markdown wrapping (like \`\`\`json), no extra text before or after.

Target JSON Schema:
{
  "cpu": "Specific Processor Model",
  "gpu": "Specific Graphics Card Model",
  "motherboard": "Specific Compatible Motherboard Model",
  "ram": "Specific Memory Kit (e.g., 16GB DDR5-6000)",
  "storage": "Specific Solid State Drive Model and Capacity",
  "psu": "Specific Power Supply Unit Model (include Watts & Certification)",
  "case": "Specific PC Case Chassis Model",
  "cooler": "Specific CPU Cooler Model",
  "estimatedPrice": "Total dynamic price of recommended components in ${payload.currency}",
  "compatibilityNotes": ["Note 1", "Note 2"],
  "upgradeSuggestions": ["Suggestion 1", "Suggestion 2"]
}
`;

    // Fetch using Gemini's stable REST API with JSON constraint parameter
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2, // Low temperature for highly deterministic/accurate spec matching
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
    }

    const jsonResponse = await response.json();
    const candidateText = jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Empty or invalid output response from Gemini AI Model.");
    }

    // Parse output
    const buildData: AIBuildData = JSON.parse(candidateText.trim());

    // Basic structural validation
    const requiredKeys: (keyof AIBuildData)[] = [
      "cpu", "gpu", "motherboard", "ram", "storage", "psu", "case", "cooler", 
      "estimatedPrice", "compatibilityNotes", "upgradeSuggestions"
    ];

    for (const key of requiredKeys) {
      if (!(key in buildData)) {
        throw new Error(`Generated hardware spec is missing required field: ${key}`);
      }
    }

    return {
      success: true,
      data: buildData,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal system pipeline failure.",
      timestamp: new Date().toISOString(),
    };
  }
}
