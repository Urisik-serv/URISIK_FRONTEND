import PublicHeader from "../../components/header/PublicHeader";
import { useFamilyData } from "../../hooks/use-family-data";
import profilePicture from "../../assets/profile/leader-mom.svg";
import ProfileDataBox from "../../components/profile/ProfileDataBox";
import AllergyDataBox from "../../components/profile/AllergyDataBox";
import alertImage from "../../assets/images/alert-circle.png";
import { useNavigate } from "react-router-dom";
import SmallButton from "../../components/common/SmallCommonButton";
import Footer from "../../components/common/Footer";
import EntityItem from "../../components/common/EntityItem";

export default function MyProfilePage() {
  const { familyData } = useFamilyData();
  const myData = familyData?.familyMembers[0];
  console.log(myData);
  const navigate = useNavigate();

  return (
    <>
      <PublicHeader title={"내 프로필"} />
      <div className="pt-[33px] w-[343px] mx-auto flex flex-col ">
        <div className="flex justify-between  w-full">
          <div className="flex gap-[12px] items-end">
            <img src={profilePicture} alt="내 프로필 사진" />
            <div className="text-2xl font-semibold leading-[36px]">
              {myData?.name}
            </div>
          </div>
          <button
            className="cursor-pointer flex items-start"
            onClick={() => navigate("../modify-profile")}
          >
            <div className="text-[#767676] text-sm leading-[22.26px] font-medium">
              프로필 편집
            </div>
          </button>
        </div>
        <div className="pt-[24px]">
          {(myData?.allergies?.length || 0) > 0 ? (
            myData?.allergies.map((allergy) => (
              <div className=" pb-[20px]">
                <div className="text-[16px] font-semibold leading-[24px]">
                  알레르기
                </div>
                <AllergyDataBox
                  name={allergy.name}
                  alternative={allergy.alternativeIngredients}
                />
              </div>
            ))
          ) : (
            <div className="pb-[20px] ">
              <div className="text-[16px] font-semibold leading-[24px]">
                알레르기
              </div>
              <div className="w-[48px] pt-[6px]">
                <ProfileDataBox name="없음" className="px-[7px]" />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="text-[16px] font-semibold leading-[24px]">
            선호 음식
          </div>
          <div className="flex gap-[8px] pt-[8px]">
            {myData?.preferences.likedFood.map((food) => (
              <ProfileDataBox name={food} className="px-[12px]" />
            ))}
          </div>
        </div>
        <div className="pt-[42px]">
          <div className="text-[16px] font-semibold leading-[24px]">
            내 위시리스트
          </div>
          {myData?.wishList ? (
            <div className="pt-[17px] flex flex-col gap-0">
              {myData?.wishList.map((item) => (
                <EntityItem
                  picture={item.FoodImageUrl}
                  name={item.name}
                  category={item.category}
                  tags={item.tags.join(", ")}
                  key={item.id}
                  border="border-b-1 border-b-gray-200"
                />
              ))}
            </div>
          ) : (
            <div className="pt-[48px] flex flex-col items-center gap-[11px]">
              <img src={alertImage} alt="알림 아이콘" className="size-[76px]" />
              <div className="text-center text-[16px] leading-[24px] text-[#4D4D4D]">
                추가된 위시리스트가 없어요
              </div>
              <div className="pt-[24px]">
                <SmallButton
                  text={"위시리스트 담기"}
                  type="button"
                  onClick={() => navigate("../")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
