import { calculatePensionRetirementProjection } from "../../lib/pensionCalculations";

describe("calculatePensionRetirementProjection", () => {
  it("should correctly calculate retirement projection", () => {
    const pensionPot = 500000;
    const desiredRetirementIncome = 30000;
    const currentAge = 65;

    const result = calculatePensionRetirementProjection(
      pensionPot,
      desiredRetirementIncome,
      currentAge
    );

    // Why 17? 500000 / 30000 ≈ 16.67, rounded up to 17
    expect(result).toHaveLength(17);
    expect(result[0]).toEqual({ year: 66, potValue: 470000 });
    expect(result[5]).toEqual({ year: 71, potValue: 320000 });
    expect(result[10]).toEqual({ year: 76, potValue: 170000 });
    expect(result[15]).toEqual({ year: 81, potValue: 20000 });
  });
});
