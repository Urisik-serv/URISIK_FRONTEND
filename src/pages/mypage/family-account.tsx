import PublicHeader from "../../components/header/PublicHeader";
import profile from "../../assets/profile/leader-mom.svg";
import dadProfile from "../../assets/profile/dad-profile.svg";
import daughterProfile from "../../assets/profile/daughter-profile.svg";
import EntityItem from "../../components/common/EntityItem";
import ListItem from "../../components/mypage/ListItem";

export default function FamilyAccount() {
  return (
    <>
      <PublicHeader title={"가족계정"} />
      <div className="pt-[33px] flex flex-col items-center mx-auto">
        <div className="w-[80px]">
          <img src={profile} alt="프로필 사진" />
          <div className="pt-[8px] text-center text-lg font-semibold tracking-[0.18px]">
            김엄마(나)
          </div>
        </div>
        <div className="pt-[44px] flex flex-col items-start ">
          <div className="text-gray-800 text-xl font-semibold tracking-[0.2px]">
            우리가족
          </div>
          <div className="pt-[16px]">
            <EntityItem
              picture={dadProfile}
              name="강아빠"
              category="아빠"
              tags="xxx년 xx월 xx일"
              border="border-b-1 border-b-gray-200"
            />
            <EntityItem
              picture={daughterProfile}
              name="강민지"
              category="딸"
              tags="xxxx년 xx월 xx일"
            />
          </div>
          <div className="pt-[44px] flex flex-col w-full gap-[8px] ">
            <ListItem
              title="가족원 초대하기"
              isOnOff={false}
              to={"../../family-invite"}
            />
            <ListItem title="가족 계정 나가기" isOnOff={false} />
          </div>
        </div>
      </div>
    </>
  );
}
