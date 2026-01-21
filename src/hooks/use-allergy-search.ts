import { useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";
import { ALLERGY_DATA } from "../constants/allergy-data";
import { useProfileStore } from "../stores/use-profile-store";

export const useAllergySearch = () => {
  const [keyword, setKeyword] = useState("");
  const { savedFormData, setSavedFormData } = useProfileStore();
  const selectedAllergies = Array.isArray(savedFormData.allergies)
    ? savedFormData.allergies
    : [];
  const debounce = useDebounce(keyword, 500);

  const filteredAllergies = useMemo(() => {
    if (!debounce) return [];
    return ALLERGY_DATA.filter(
      (allergy) =>
        allergy.name.includes(debounce) || allergy.category.includes(debounce),
    ).map((item) => item.name);
  }, [debounce]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSelectAllergy = (allergy: string) => {
    const isSelected = selectedAllergies.includes(allergy);
    const nextAllergies = isSelected
      ? selectedAllergies.filter((item) => item !== allergy)
      : [...selectedAllergies, allergy];

    setSavedFormData((prev) => ({ ...prev, allergies: nextAllergies }));
  };

  const isSelected = (allergy: string) => {
    return selectedAllergies.includes(allergy);
  };

  return {
    selectedAllergies,
    filteredAllergies,
    handleSearch,
    handleSelectAllergy,
    isSelected,
  };
};
