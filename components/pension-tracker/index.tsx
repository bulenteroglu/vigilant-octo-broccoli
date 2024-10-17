"use client";

import React, { useState } from "react";
import PensionForm from "./PensionForm";
import PensionResults from "./PensionResults";
import { PensionFormInputs } from "./PensionForm/types";

const PensionTracker = () => {
  const [formData, setFormData] = useState<PensionFormInputs | null>(null);

  return (
    <div className="flex flex-col gap-y-2 items-center mt-10">
      <PensionForm setFormData={setFormData} />
      <PensionResults formData={formData} />
    </div>
  );
};

export default PensionTracker;
