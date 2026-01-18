import PublicHeader from "../../components/header/PublicHeader";
import Button from "../../components/common/Button";
import { useFamilyProfileForm } from "../../hooks/useFamilyProfileForm";
import { useNavigate } from "react-router-dom";
import RequiredLabel from "../../components/family/required-label";
import OptionalLabel from "../../components/family/optional-label";
import SelectButton from "../../components/family/select-button";

export default function FamilyProfileCreatePage() {
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
  } = useFamilyProfileForm();

  const roles = ["엄마", "아빠", "아들", "딸"];
  const foods = ["한식", "중식", "일식", "양식", "디저트"];
  const navigate = useNavigate();

  return (
    <>
      <PublicHeader title={"프로필 생성"} />
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="pt-[26px] w-[343px] flex flex-col gap-[32px]"
        >
          <div className=" w-[343px] ">
            <RequiredLabel title="닉네임" />
            <div className="pt-[12px]">
              <input
                required
                type="text"
                placeholder="닉네임을 입력해주세요."
                className="w-full h-[42px] ring-1 ring-[#C3C3C3] focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#AFAFAF]"
                onChange={handleNickNameChange}
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
                onClick={() => navigate("allergies-search")}
              />
            </div>
            <button
              onClick={() => handleAllergyChange(selectedNone)}
              className="cursor-pointer pt-[12px]"
              type="button"
            >
              <SelectButton name="없음" number={selectedNone ? 1 : 0} />
            </button>
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
              />
            </div>
          </div>
          <div className="pt-[131px] ">
            <Button text={"완료"} type="submit" disabled={!isValid()} />
          </div>
        </form>
      </div>
    </>
  );
}
