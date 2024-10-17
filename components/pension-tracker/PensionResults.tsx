"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { PensionCalculationResult } from "@/lib/types";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = ({
  results,
}: {
  results: PensionCalculationResult | null;
}) => {
  if (!results) {
    return null;
  }

  // Get index of the highest year in the pension growth history, this way we can plot the drawdown line from the highest point
  // We'll use this number to fill the array with nulls to match the length of the pension growth history
  const highestYearIndex =
    results.pensionGrowthHistory.findIndex(
      (item, _, array) =>
        item.year ===
        Math.max(
          ...array.map((i) => i.year),
          ...results.pensionGrowthHistory.map((i) => i.year)
        )
    ) + 1;

  const data = {
    labels: Array.from({ length: 57 }, (_, index) => index + 25),
    datasets: [
      {
        label: "Current Pension Projection",
        data: results.pensionGrowthHistory.map((item) => item.potValue),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Pension Drawdown",
        data: [
          ...Array(highestYearIndex).fill(null),
          ...results.retirementDrawdown.map((item) => item.potValue),
        ],
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
      {
        label: "Your Target",
        data: results.targetHistory.map((item) => item.potValue),
        borderColor: "rgb(255, 255, 0)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: "900px", height: "700px" }}>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
