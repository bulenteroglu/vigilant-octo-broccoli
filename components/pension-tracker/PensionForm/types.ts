import { z } from "zod";
import { pensionFormSchema } from "./schema";

export type PensionFormInputs = z.infer<typeof pensionFormSchema>;
