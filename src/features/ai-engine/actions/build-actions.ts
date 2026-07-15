"use server";

import { AiBuildRequestSchema, CompleteAiEngineOutput } from "../types/engine.types";
import { AiOrchestratorService } from "../services/ai-orchestrator.service";
import { ApiResponse } from "@/core/types/api.types";

const orchestrator = new AiOrchestratorService();

/**
 * Server Action Controller providing data entry vectors for build generation execution paths.
 * Applies strict validations across runtime request boundaries.
 */
export async function generateAiSystemBuild(
  userId: string | null,
  rawInputPayload: unknown
): Promise<ApiResponse<CompleteAiEngineOutput>> {
  try {
    // Validate request data contracts before execution routing
    const parsedDataInput = AiBuildRequestSchema.safeParse(rawInputPayload);
    
    if (!parsedDataInput.success) {
      return {
        success: false,
        error: {
          code: "INPUT_VALIDATION_FAILURE",
          message: "The configuration request properties contain structural parameter exceptions.",
          details: parsedDataInput.error.format()
        }
      } as const;
    }

    const outputResult = await orchestrator.processBuildGeneration(userId, parsedDataInput.data);
    
    return {
      success: true,
      data: outputResult
    } as const;

  } catch (error) {
    return {
      success: false,
      error: {
        code: "INTERNAL_ENGINE_DISRUPTION",
        message: error instanceof Error ? error.message : "An unhandled execution failure tracking code halted processing loops."
      }
    } as const;
  }
}
