import type { BaseResponse } from "./response";

export interface allergyCheck {
  ingredients: string[];
}

export type AllergyResults = AllergyResult[];

export interface AllergyResult {
  allergen: string;
  alteredIngredients: string[];
}

export type GetAllergyResultsResponse = BaseResponse<AllergyResults>;
