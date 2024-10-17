export function calculatePensionAtRetirement(
  desiredRetirementIncome: number,
  personalContribution: number,
  employerContribution: number,
  desiredRetirementAge: number
): number {
  const STARTING_AGE = 25;
  const ANNUAL_INTEREST_RATE = 4.9;

  const yearsOfContribution = desiredRetirementAge - STARTING_AGE;
  const totalMonthlyContribution = personalContribution + employerContribution;

  let pot = 0;

  for (let year = 0; year < yearsOfContribution; year++) {
    // Calculate the total contribution for the year
    pot += totalMonthlyContribution * 12;

    // Add 4.9% interest to the pot after calculating the total contribution for the year
    pot *= 1 + ANNUAL_INTEREST_RATE / 100;
  }

  console.log(pot.toFixed(2));

  return pot;
}
