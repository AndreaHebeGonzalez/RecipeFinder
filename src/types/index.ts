import { z } from "zod";
import { PreferencesSearchSchema } from "../schemas"; 

type DietState = {
  selected: boolean,
  disabled: boolean
}

export type DietsOptions = { [key:string] : DietState }

export type allergiesOptions = { [key:string] : boolean }

export type PreferencesSearchType = z.infer<typeof PreferencesSearchSchema>