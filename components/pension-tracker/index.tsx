import React from "react";
import PensionForm from "./PensionForm";
import PensionResults from "./PensionResults";

const PensionTracker = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center mt-10">
      <PensionForm />
      <PensionResults />
    </div>
  );
};

export default PensionTracker;
