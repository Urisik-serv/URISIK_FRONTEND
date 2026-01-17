import FamilyMemberButton from "../../components/family/FamilyMemberButton";
import PublicHeader from "../../components/header/PublicHeader";
import Button from "../../components/common/Button";
import { useFamilyProfileForm } from "../../hooks/useFamilyProfileForm";
import { useNavigate } from "react-router-dom";

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
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                닉네임
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
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
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                역할
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
            <div className="pt-[12px] flex gap-[12px] ">
              {roles.map((role) => (
                <button
                  onClick={() => handleRoleChange(role)}
                  key={role}
                  type="button"
                  className="cursor-pointer"
                >
                  <FamilyMemberButton
                    name={role}
                    number={selectedRole === role ? 1 : 0}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                알레르기 정보
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
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
              <FamilyMemberButton name="없음" number={selectedNone ? 1 : 0} />
            </button>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                식단 선호도
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
            <div className="pt-[12px] flex flex-wrap gap-[12px] w-[319px]">
              {foods.map((food, index) => (
                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => handlePreferencesChange(foods, index)}
                  key={index}
                >
                  <FamilyMemberButton
                    name={food}
                    number={isCheckedPreference[index] ? 1 : 0}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                좋아하는 식재료
              </label>

              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (선택)
              </div>
            </div>
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
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                싫어하는 식재료
              </label>

              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (선택)
              </div>
            </div>
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
