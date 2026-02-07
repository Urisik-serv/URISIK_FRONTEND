import type { BaseResponse } from "./response";

export interface allergyCheck {
  ingredients: string[];
}

export type AllergyResults = AllergyResult[];

export interface AllergyResult {
  allergen: string;
  alternatives: Alternative[];
}

export interface Alternative {
  name: string;
  reason: string;
}

export type GetAllergyResultsResponse = BaseResponse<AllergyResults>;
