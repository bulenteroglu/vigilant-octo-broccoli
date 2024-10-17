import { z } from "zod";

export const pensionFormSchema = z.object({
  desiredRetirementIncome: z
    .number()
    .positive("Retirement income must be positive"),
  employerContribution: z
    .number()
    .min(0, "Employer contribution cannot be negative"),
  personalContribution: z
    .number()
    .min(0, "Personal contribution cannot be negative"),
  desiredRetirementAge: z
    .number()
    .min(20, "Retirement age must be at least 20")
    .max(100, "Retirement age must be at most 100"),
});
