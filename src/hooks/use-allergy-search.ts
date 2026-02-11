import { useMemo, useState } from "react";
import { useProfileStore } from "../stores/use-profile-store";
import { ALLERGY_DATA } from "../constants/allergy-data";
import useDebounce from "./use-debounce";

export const useAllergySearch = () => {
  const [keyword, setKeyword] = useState("");
  const selectedAllergies = useProfileStore(
    (state) => state.savedFormData.allergies,
  );

  const setSavedFormData = useProfileStore((state) => state.setSavedFormData);

  const handleResetAllergy = () => {
    setSavedFormData((prev) => ({ ...prev, allergies: [] }));
  };

  const debounce = useDebounce(keyword, 500);

  const filteredAllergies = useMemo(() => {
    if (!debounce || !ALLERGY_DATA) return [];

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

  const isSelected = (allergy: string) => selectedAllergies.includes(allergy);

  return {
    keyword,
    selectedAllergies,
    filteredAllergies: filteredAllergies || [],
    handleSearch,
    handleSelectAllergy,
    isSelected,
    handleResetAllergy,
  };
};
