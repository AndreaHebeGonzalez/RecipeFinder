import { v4 as uuidv4 } from 'uuid';
import { apirouter } from "../../../lib/axios";
import { RecipeAIErrorSchema, RecipeAISchema } from "../schemas";
import type { AIRequest, RecipeAIResponse } from "../types";
import { getAIJson } from '../../../utils';


export const generateRecipe = async(data : AIRequest['input']) : Promise<RecipeAIResponse | null | undefined>  => {

/*   const prompt = `
You are a professional chef and recipe generator.

Your task is to create a realistic and coherent recipe using the following required ingredients:
${ingredients}

Follow these rules strictly:

1. Use ALL of the provided ingredients meaningfully.
2. You MAY include other ingredients if necessary to complete the recipe.
3. Specify clear QUANTITIES (e.g., "2 cups flour", "500g pork shoulder").
4. Group the preparation steps into SECTIONS ONLY IF the recipe requires separate preparations (e.g., dough, sauce, filling).
    - For simple recipes, use a single section with an empty title ("title": ""), but this section MUST contain all the preparation steps.
    - For recipes with distinct components, use multiple titled sections (e.g., "Prepare the dough", "Make the sauce").
    - Do not include empty sections. Only include sections that contain actual preparation steps.
    - Never include sections without any steps. Always include at least one valid step inside each section.
5. ALWAYS include full preparation steps for any component used (e.g., dough, sauce). Do NOT assume store-bought or pre-made items unless explicitly stated.
6. Keep the total number of steps between 4 and 8 when possible.
7. Specify the NUMBER OF SERVINGS.
8. Provide NUTRITIONAL INFORMATION PER SERVING: calories, protein, carbohydrates, fat.
9. The final output must be a valid, raw JSON object, matching one of the two structures described below.

RECIPE FORMAT (if ingredients are valid):

{
  "title": "Short recipe title (max 10 words)",
  "servings": number,
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": "amount with unit (e.g. '200 g', '1 cup', '2 tbsp')"
    }
  ],
  "steps": [
    {
      "title": "Section title (or empty string if not needed)",
      "steps": [
        {
          "stepNumber": number,
          "step": "Step description, without leading numbers"
        }
      ]
    }
  ],
  "nutritionPerServing": {
    "calories": "number kcal",
    "protein": "number g",
    "carbohydrates": "number g",
    "fat": "number g"
  }
}


If one or more ingredients are not recognized as real food items (e.g., random strings or typos like "sdfasd" or "asdfgr"), DO NOT generate a recipe. 
Instead, return exactly this JSON: 


{
  "error": "Some or all of the provided ingredients are not recognized as valid food items. Please try again with real ingredients like tomato, rice, or chicken."
}

Always verify that each ingredient is a known, real-world food item before generating the recipe, 

IMPORTANT:

❗ Output ONLY one valid JSON object.
❗ NEVER include extra text, code fences, markdown, comments, or formatting.
❗ DO NOT include messages like "Here's your recipe", "Note:", or anything similar.
❗ DO NOT wrap the JSON inside another object or string. Return raw JSON only.

Repeat: Your entire output must be one of the two valid JSON objects above.
`; */

const prompt = `
You are a professional chef and recipe generator.

The user will provide a single free-form input, which may include:
- A list of ingredients (e.g., "chicken, tomato, rice"),
- A dish name (e.g., "pizza", "pastel de papas"),
- Or both combined (e.g., "make a pizza with chicken and olives").

Your job is to interpret the user's intent and generate a realistic, detailed, and coherent recipe accordingly.

Be flexible in understanding the input, but strict in outputting a complete recipe.

Input:
"${data}"

Follow these rules strictly:

1. If the input includes valid ingredients, use **ALL** of them meaningfully in the recipe.
2. If the input refers to a known dish, create a recipe that fits that dish (e.g., pizza should have dough, sauce, toppings, etc.).
3. If both a dish name and ingredients are provided, generate a version of that dish using the listed ingredients.
4. You MAY include additional ingredients as needed to complete the recipe naturally.
5. Specify clear QUANTITIES (e.g., "2 cups flour", "500g pork shoulder").
6. Group the preparation steps into SECTIONS ONLY IF the recipe requires separate preparations (e.g., dough, sauce, filling).
    - For simple recipes, use a single section with an empty title ("title": ""), but this section MUST contain all the preparation steps.
    - For recipes with distinct components, use multiple titled sections (e.g., "Prepare the dough", "Make the sauce").
    - Never include empty sections. Only include sections that contain actual preparation steps.
7. ALWAYS include full preparation steps for any component used (e.g., dough, sauce). Do NOT assume store-bought or pre-made items unless explicitly stated.
8. Keep the total number of steps between 4 and 8 when possible.
9. Specify the NUMBER OF SERVINGS.
10. Provide NUTRITIONAL INFORMATION PER SERVING: calories, protein, carbohydrates, fat.

⚠️ JSON OUTPUT REQUIREMENTS (strict):

- Return ONLY a valid raw JSON object using **exactly** the structure below.
- The top-level object MUST contain these fields: "title", "servings", "ingredients", "steps", and "nutrition".
- The "steps" field MUST be an array of objects. Each object MUST have:
  - a "title" (string, possibly empty),
  - a "steps" array, where each item is an object with:
    - "stepNumber" (number),
    - "step" (string with the instruction, no leading numbers).
- The "nutrition.nutrients" field MUST be an array of objects with:
  - "name" (string),
  - "amount" (number),
  - "unit" (string).
- All field names, types, and nesting MUST match **exactly**.

Return one of the two valid raw JSON objects below:

---

✅ RECIPE FORMAT (if input is valid):

{
  "title": "Short recipe title (max 10 words)",
  "servings": number,
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": "amount with unit (e.g. '200 g', '1 cup', '2 tbsp')"
    }
  ],
  "steps": [
    {
      "title": "Section title (or empty string if not needed)",
      "steps": [
        {
          "stepNumber": number,
          "step": "Step description, without leading numbers"
        }
      ]
    }
  ],
  "nutrition": {
    "nutrients": [
      {
        "name": "Calories" | "Protein" | "Carbohydrates" | "Fat",
        "amount": number,
        "unit": "kcal" | "g"
      }
    ]
  }
}

---

❌ ERROR FORMAT (if the input is invalid or contains unrecognized food terms):

{
  "error": "Some or all of the provided inputs are not recognized as valid food items or dish names. Please try again using real ingredients or common dish names like tomato, rice, pizza, or chicken stew."
}

---

IMPORTANT:

❗ Output ONLY one valid JSON object.
❗ NEVER include extra text, code fences, markdown, comments, or formatting.
❗ DO NOT include messages like "Here's your recipe", "Note:", or anything similar.
❗ DO NOT wrap the JSON inside another object or string. Return raw JSON only.

Repeat: Your entire output must be one of the two valid JSON objects above, with all fields correctly structured and all required data included.
`;


  
  try {
    const response = await apirouter.post('chat/completions', {
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: "system", content: "Sos un generador de recetas útil y claro." },
        { role: "user", content: prompt },
      ]
    })


    const content = response.data.choices?.[0].message?.content

    
    if(!content) {
      console.error("AI response did not contain expected content field. Raw data:", response.data)

      return {
        sucess: false,
        tagError: false,
        error: "Oops! We couldn’t generate the recipe. Please try again in a moment.",
        technicalMessage: "Missing or malformed 'content' field in AI response. Check if 'choices[0].message.content' exists and is a valid string.",
        errorKind: "parsing"
      }
    }

    let parsed

    try {

      const data = getAIJson(content)
      parsed = JSON.parse(data)

    } catch (parseError) {

      console.error("Failed to parse the AI response: invalid JSON format.")
      console.error(parseError)
      console.error(content)

      return {
        sucess: false,
        tagError: false,
        error: "Oops! We had trouble processing the recipe. Please try again. If the issue continues, try different ingredients.",
        technicalMessage: "Failed to parse the AI response: invalid JSON string. The model returned content that could not be parsed.",
        errorKind: "parsing",
      }
    }

    const result = RecipeAISchema.safeParse(parsed)

    if(result.success) {
      console.log(result.data)

      return ({
        sucess: true,
        data: {
          ...result.data,
          id: uuidv4(),
          image: '/public/images/no-image.jpg',
          categoryRecipe: 'aiRecipe',
        }
      })

    } else {

      const errorCheck = RecipeAIErrorSchema.safeParse(parsed)

      if(errorCheck.success) {
        console.error(errorCheck.data.error)

        return {
          sucess: false,
          tagError: true,
          error: errorCheck.data.error
        } 

      } else {
        console.error("The AI returned an invalid or incomplete JSON object:", parsed);
        console.error("A Zod validation error occurred:", result.error.format()) //El método .format() en Zod convierte los errores de validación en un objeto estructurado y legible, donde las claves corresponden a los campos del esquema, y los valores contienen los errores asociados.

        return {
          sucess: false,
          tagError: false,
          error: "Oops! The recipe couldn't be generated correctly. Please try again later.",
          technicalMessage: "The AI returned an invalid or incomplete JSON object",
          errorKind: 'validation'
        }
      }
    }

  } catch (err) { 
    throw err
  }   
}

