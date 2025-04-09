import { z } from "zod";
import { preferencesSearchSchema } from "../schemas"; 

export type preferencesSearchType = z.infer<typeof preferencesSearchSchema>