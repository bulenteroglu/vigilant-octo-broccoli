"use client";

import React, { useState } from "react";
import PensionForm from "./PensionForm";
import PensionResults from "./PensionResults";
import { PensionCalculationResult } from "@/lib/types";

const PensionTracker = () => {
  const [results, setResults] = useState<PensionCalculationResult | null>(null);

  return (
    <div className="flex flex-col gap-y-2 items-center mt-10">
      <PensionForm setResults={setResults} />
      <PensionResults results={results} />
    </div>
  );
};

export default PensionTracker;
