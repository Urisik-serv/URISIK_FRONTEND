import axios from "axios";
import type { FamilyProfile } from "../types/family-profile";

export const getFamilyList = async (): Promise<FamilyProfile> => {
  const { data } = await axios.get("/public/data/family-data.json");

  return data;
};
