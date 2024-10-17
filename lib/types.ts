export interface PensionHistoryEntry {
  year: number;
  potValue: number;
}

export interface PensionCalculationResult {
  pensionGrowthHistory: PensionHistoryEntry[];
  targetHistory: PensionHistoryEntry[];
  retirementDrawdown: PensionHistoryEntry[];
}
