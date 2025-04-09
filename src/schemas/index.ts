import { z } from "zod";


export const preferencesSearchSchema = z.object({
  diets: z.array(z.string()),
  allergies: z.array(z.string())
})