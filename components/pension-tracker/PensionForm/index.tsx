"use client";

import { Input } from "@/components/ui/input";
import { PensionFormInputs } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { pensionFormSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { calculatePensionAtRetirement } from "@/lib/pensionCalculations";
import { PensionCalculationResult } from "@/lib/types";
import { Label } from "@/components/ui/label";

export default function PensionForm({
  setResults,
}: {
  setResults: React.Dispatch<
    React.SetStateAction<PensionCalculationResult | null>
  >;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PensionFormInputs>({
    resolver: zodResolver(pensionFormSchema),
  });

  const onSubmit: SubmitHandler<PensionFormInputs> = (data) => {
    const {
      desiredRetirementIncome,
      employerContribution,
      personalContribution,
      desiredRetirementAge,
    } = data;

    const results = calculatePensionAtRetirement(
      desiredRetirementIncome,
      employerContribution,
      personalContribution,
      desiredRetirementAge
    );

    setResults(results);
  };

  return (
    <div className="w-1/6">
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2">
          <Label>Desired yearly retirement income</Label>
          <Input
            placeholder="Desired yearly retirement income"
            type="number"
            {...register("desiredRetirementIncome", { valueAsNumber: true })}
          />
          {errors.desiredRetirementIncome && (
            <p className="text-red-500 text-sm">
              {errors.desiredRetirementIncome.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Employer monthly contributions</Label>
          <Input
            placeholder="Employer monthly contributions"
            type="number"
            {...register("employerContribution", { valueAsNumber: true })}
          />
          {errors.employerContribution && (
            <p className="text-red-500 text-sm">
              {errors.employerContribution.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Your monthly contributions</Label>
          <Input
            placeholder="Your monthly contributions"
            type="number"
            {...register("personalContribution", { valueAsNumber: true })}
          />
          {errors.personalContribution && (
            <p className="text-red-500 text-sm">
              {errors.personalContribution.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Desired retirement age</Label>
          <Input
            placeholder="Desired retirement age"
            type="number"
            {...register("desiredRetirementAge", { valueAsNumber: true })}
          />
          {errors.desiredRetirementAge && (
            <p className="text-red-500 text-sm">
              {errors.desiredRetirementAge.message}
            </p>
          )}
        </div>
        <Button type="submit">Calculate</Button>
      </form>
    </div>
  );
}
