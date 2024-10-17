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
    .min(26, "Retirement age must be at least 26")
    .max(81, "Retirement age must be at most 81"),
});
