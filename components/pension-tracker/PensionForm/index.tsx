"use client";

import { Input } from "@/components/ui/input";
import { PensionFormInputs } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { pensionFormSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function PensionForm({
  setFormData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<PensionFormInputs | null>>;
}) {
  const {
    register,
    handleSubmit,
    // TODO: Add error handling
    // formState: { errors },
  } = useForm<PensionFormInputs>({
    resolver: zodResolver(pensionFormSchema),
  });

  const onSubmit: SubmitHandler<PensionFormInputs> = (data) => {
    setFormData(data);
  };

  return (
    <div className="w-1/6">
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Desired yearly retirement income"
          type="number"
          {...register("desiredRetirementIncome", { valueAsNumber: true })}
        />
        <Input
          placeholder="Employer monthly contributions"
          type="number"
          {...register("employerContribution", { valueAsNumber: true })}
        />
        <Input
          placeholder="Your monthly contributions"
          type="number"
          {...register("personalContribution", { valueAsNumber: true })}
        />
        <Input
          placeholder="Desired retirement age"
          type="number"
          {...register("desiredRetirementAge", { valueAsNumber: true })}
        />
        <Button type="submit">Calculate</Button>
      </form>
    </div>
  );
}
