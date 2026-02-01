import PublicHeader from "../../components/header/PublicHeader";
import SelectButton from "../../components/family/SelectButton";
import { useAllergySearch } from "../../hooks/use-allergy-search";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function AllergiesSearchPage() {
  const { filteredAllergies, handleSearch, handleSelectAllergy, isSelected } =
    useAllergySearch();

  const navigate = useNavigate();

  return (
    <>
      <PublicHeader title={""} />
      <div className="flex justify-center">
        <div className="pt-[26px] w-[343px]">
          <div className="text-[#282828] text-lg font-medium leading-[27px]">
            나의 알레르기를 검색하세요
          </div>
          <div className="pt-[12px]">
            <input
              type="text"
              className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] "
              onChange={handleSearch}
            />
          </div>
          <div className="pt-[24px]">
            <div className="text-[#282828] text-sm leading-[21px]">
              입력가능 키워드
            </div>
            <div className="flex gap-[12px] pt-[8px]">
              {filteredAllergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => handleSelectAllergy(allergy)}
                >
                  <SelectButton
                    name={allergy}
                    isSelected={isSelected(allergy)}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="pt-[420px]">
            <Button text={"완료"} type="submit" onClick={() => navigate(-1)} />
          </div>
        </div>
      </div>
    </>
  );
}
