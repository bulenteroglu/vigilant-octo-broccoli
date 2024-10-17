import { PensionCalculationResult } from "./types";

const CAREER_START_AGE = 25;
const ANNUAL_INTEREST_RATE = 1.049;

export function calculatePensionAtRetirement(
  desiredRetirementIncome: number,
  personalContribution: number,
  employerContribution: number,
  desiredRetirementAge: number
): PensionCalculationResult | null {
  const totalMonthlyContribution = personalContribution + employerContribution;

  let currentAge = CAREER_START_AGE;
  let pensionPot = 0;

  const pensionGrowthHistory = [];

  // Pension pot growth during working years
  for (let year = CAREER_START_AGE; year < desiredRetirementAge; year++) {
    pensionPot += totalMonthlyContribution * 12;
    pensionPot *= ANNUAL_INTEREST_RATE;

    pensionGrowthHistory.push({
      year: year + 1,
      potValue: pensionPot,
    });
    currentAge++;
  }

  const retirementDrawdown = calculatePensionRetirementProjection(
    pensionPot,
    desiredRetirementIncome,
    currentAge
  );

  const targetHistory = calculatePensionTargetHistory(
    desiredRetirementIncome,
    desiredRetirementAge,
    totalMonthlyContribution
  );

  return {
    pensionGrowthHistory,
    targetHistory,
    retirementDrawdown,
  };
}

export function calculatePensionRetirementProjection(
  pensionPot: number,
  desiredRetirementIncome: number,
  currentAge: number
) {
  const retirementDrawdown = [];

  while (pensionPot > 0) {
    pensionPot -= desiredRetirementIncome;
    retirementDrawdown.push({
      year: currentAge + 1,
      potValue: Math.max(0, pensionPot),
    });
    currentAge++;
  }

  return retirementDrawdown;
}

export function calculatePensionTargetHistory(
  desiredRetirementIncome: number,
  desiredRetirementAge: number,
  totalMonthlyContribution: number
) {
  const MAX_AGE = 81;

  // Calculate the total amount needed for retirement
  const yearsInRetirement = MAX_AGE - desiredRetirementAge + 1;
  const totalRetirementNeeds = desiredRetirementIncome * yearsInRetirement;

  const targetHistory = [];
  let pensionPot = 0;
  for (let age = CAREER_START_AGE; age <= MAX_AGE; age++) {
    if (age < desiredRetirementAge) {
      // During working years
      pensionPot += totalMonthlyContribution * 12;
      pensionPot *= ANNUAL_INTEREST_RATE;

      // Calculate the target pot value needed at this age
      const yearsLeft = desiredRetirementAge - age;
      const targetPotValue =
        totalRetirementNeeds / Math.pow(ANNUAL_INTEREST_RATE, yearsLeft);
      pensionPot = Math.max(pensionPot, targetPotValue);
    } else {
      // During retirement years
      // Math.max used to avoid negative value in result
      pensionPot = Math.max(0, pensionPot - desiredRetirementIncome);
    }

    targetHistory.push({
      year: age,
      potValue: pensionPot,
    });
  }

  return targetHistory;
}
