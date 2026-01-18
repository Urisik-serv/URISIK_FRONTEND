import { useNavigate } from "react-router-dom";
import { useAllergySearch } from "../../hooks/use-allergy-search";
import { useFamilyProfileForm } from "../../hooks/use-family-profile-form";
import RequiredLabel from "./RequiredLabel";
import SelectButton from "./SelectButton";
import OptionalLabel from "./OptionalLabel";
import Button from "../common/Button";
import DefaultMom from "../../assets/profile/default-mom.svg";
import Camera from "../../assets/icons/camera.svg";

interface ProfileDataFormProps {
  isSelected: number;
  isEdit?: boolean; // 편집 모드 여부
}

export default function ProfileDataForm({
  isSelected,
  isEdit,
}: ProfileDataFormProps) {
  const {
    handleNickNameChange,
    handleRoleChange,
    handleAllergyChange,
    handlePreferencesChange,
    selectedNone,
    selectedRole,
    isCheckedPreference,
    handleLikeChange,
    handleDislikeChange,
    handleSubmit,
    isValid,
    formData,
  } = useFamilyProfileForm();

  const { selectedAllergies, handleSelectAllergy } = useAllergySearch();

  const roles = ["엄마", "아빠", "아들", "딸"];
  const foods = ["한식", "중식", "일식", "양식", "디저트"];
  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[343px] flex flex-col gap-[32px]"
    >
      {isEdit && (
        <div className="h-[104px] mb-[5.5px]">
          <div className="pt-[24px] pb-0 flex flex-col items-center">
            <img
              src={DefaultMom}
              alt="엄마 기본 프로필 사진"
              className="w-[104px] m-0"
            />
            <button
              type="button"
              className="cursor-pointer bg-[#CACACA] size-[30px] flex justify-center items-center rounded-full -translate-y-[30px] translate-x-[37px]"
            >
              <img src={Camera} alt="프로필 사진 선택" />
            </button>
          </div>
        </div>
      )}
      <div className=" w-[343px] pt-[26px] ">
        <RequiredLabel title="닉네임" />
        <div className="pt-[12px]">
          <input
            required
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="w-full h-[42px] ring-1 ring-[#C3C3C3] focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#AFAFAF]"
            onChange={handleNickNameChange}
            value={formData.nickname}
          />
        </div>
      </div>
      <div className=" w-[343px] ">
        <RequiredLabel title="역할" />
        <div className="pt-[12px] flex gap-[12px] ">
          {roles.map((role) => (
            <button
              onClick={() => handleRoleChange(role)}
              key={role}
              type="button"
              className="cursor-pointer"
            >
              <SelectButton
                name={role}
                number={selectedRole === role ? 1 : 0}
              />
            </button>
          ))}
        </div>
      </div>
      <div className=" w-[343px] ">
        <RequiredLabel title="알레르기 정보" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="알레르기 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
            onClick={() => navigate("allergy-search")}
          />
        </div>
        <div className="flex gap-[12px]">
          {selectedAllergies.length == 0 ? (
            <button
              onClick={() => handleAllergyChange(selectedNone)}
              className="cursor-pointer pt-[12px]"
              type="button"
            >
              <SelectButton name="없음" number={selectedNone ? 1 : 0} />
            </button>
          ) : (
            selectedAllergies.map((allergy) => (
              <button
                key={allergy}
                onClick={() => handleSelectAllergy(allergy)}
                className="pt-[12px]"
              >
                <SelectButton name={allergy} number={isSelected} />
              </button>
            ))
          )}
        </div>
      </div>
      <div className=" w-[343px] ">
        <RequiredLabel title="식단 선호도" />
        <div className="pt-[12px] flex flex-wrap gap-[12px] w-[319px]">
          {foods.map((food, index) => (
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => handlePreferencesChange(foods, index)}
              key={index}
            >
              <SelectButton
                name={food}
                number={isCheckedPreference[index] ? 1 : 0}
              />
            </button>
          ))}
        </div>
      </div>
      <div className=" w-[343px] ">
        <OptionalLabel title="좋아하는 식재료" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="직접 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
            onChange={handleLikeChange}
            value={formData.likedIngredients}
          />
        </div>
      </div>
      <div className=" w-[343px] ">
        <OptionalLabel title="싫어하는 식재료" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="직접 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
            onChange={handleDislikeChange}
            value={formData.dislikedIngredients}
          />
        </div>
      </div>
      <div className="pt-[131px] ">
        <Button text={"완료"} type="submit" disabled={!isValid()} />
      </div>
    </form>
  );
}
