import { ComponentRecommendation, EngineWarning } from "../types/engine.types";

export class CompatibilityEngine {
  /**
   * Deterministically parses a complete recommended set of hardware pieces, validating exact structural 
   * cross-compatibility tolerances using database specifications fields.
   */
  public static checkCompatibility(components: ComponentRecommendation[]): EngineWarning[] {
    const warnings: EngineWarning[] = [];
    
    const cpu = components.find(c => c.category === "CPU");
    const mobo = components.find(c => c.category === "Motherboard");
    const ram = components.find(c => c.category === "Memory");
    const psu = components.find(c => c.category === "Power Supply");
    const gpu = components.find(c => c.category === "GPU");
    const cooling = components.find(c => c.category === "Cooler");
    const pcCase = components.find(c => c.category === "Case");

    // 1. Socket Verification
    if (cpu && mobo) {
      const cpuSocket = cpu.specs.socket || cpu.specs.Socket;
      const moboSocket = mobo.specs.socket || mobo.specs.Socket;
      if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        warnings.push({
          code: "SOCKET_MISMATCH",
          severity: "CRITICAL",
          message: `Physical Socket Mismatch: The selected CPU utilizes standard ${cpuSocket}, which is physically incompatible with the Motherboard's ${moboSocket} socket.`,
        });
      }
    }

    // 2. RAM Generation Interface Alignment (DDR4 vs DDR5)
    if (mobo && ram) {
      const moboRamType = mobo.specs.ramGeneration || mobo.specs.MemoryType;
      const ramType = ram.specs.ramGeneration || ram.specs.Type;
      if (moboRamType && ramType && moboRamType !== ramType) {
        warnings.push({
          code: "RAM_MISMATCH",
          severity: "CRITICAL",
          message: `Memory Module Mismatch: Motherboard requires ${moboRamType} architecture, but the selected RAM is ${ramType}.`,
        });
      }
    }

    // 3. Power Allocation Verification
    if (psu) {
      const psuWattage = Number(psu.specs.wattage || psu.specs.Wattage || 0);
      let calculatedDraw = 0;
      
      components.forEach(comp => {
        calculatedDraw += Number(comp.specs.tdp || comp.specs.TDP || comp.specs.estimatedDrawWatts || 0);
      });

      if (psuWattage > 0 && calculatedDraw > psuWattage) {
        warnings.push({
          code: "WEAK_PSU",
          severity: "CRITICAL",
          message: `System Power Starvation: Absolute component calculated load peak (${calculatedDraw}W) exceeds total Power Supply output limits (${psuWattage}W).`,
        });
      } else if (psuWattage > 0 && calculatedDraw * 1.25 > psuWattage) {
        warnings.push({
          code: "PSU_HEADROOM_LOW",
          severity: "WARNING",
          message: `Narrow Power Supply Headroom: Total system load operates dangerously close to maximum PSU boundaries. Transient spikes may destabilize system execution.`,
        });
      }
    }

    // 4. Component Bottleneck Heuristic Evaluations
    if (cpu && gpu) {
      const cpuTier = Number(cpu.specs.performanceTier || 5); // 1-10 performance indexing
      const gpuTier = Number(gpu.specs.performanceTier || 5);

      if (cpuTier < gpuTier - 3) {
        warnings.push({
          code: "CPU_BOTTLENECK",
          severity: "WARNING",
          message: `Substantial CPU Bottleneck Detected: The chosen processor may restrict execution flows before the graphics processor can operate at peak utilization capacity.`,
        });
      } else if (gpuTier < cpuTier - 4) {
        warnings.push({
          code: "GPU_BOTTLENECK",
          severity: "INFO",
          message: `Unutilized Processing Headroom: Graphic execution parameters sit lower than target limits allowed by this high-compute core configuration.`,
        });
      }
    }

    // 5. Dimensional Clearances
    if (pcCase && gpu) {
      const caseMaxGpuLength = Number(pcCase.specs.maxGpuLengthMm || 9999);
      const gpuLength = Number(gpu.specs.lengthMm || 0);
      if (gpuLength > 0 && gpuLength > caseMaxGpuLength) {
        warnings.push({
          code: "GPU_CLEARANCE_EXCEEDED",
          severity: "CRITICAL",
          message: `Physical Case Clearance Failure: The selected graphics card length (${gpuLength}mm) exceeds spatial capabilities allowed by this chassis design configuration (${caseMaxGpuLength}mm).`,
        });
      }
    }

    return warnings;
  }
}
