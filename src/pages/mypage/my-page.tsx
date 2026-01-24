import PublicHeader from "../../components/header/PublicHeader";
import { useFamilyData } from "../../hooks/use-family-data";
import profilePicture from "../../assets/profile/leader-mom.svg";
import SpeechBubble from "../../components/mypage/SpeechBubble";
import { useNavigate } from "react-router-dom";
import ListItem from "../../components/mypage/ListItem";

const MyPage = () => {
  const { familyData } = useFamilyData();
  const myData = familyData?.familyMembers[0];
  const navigate = useNavigate();
  return (
    <>
      <PublicHeader title="마이페이지" />
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
          <div className=" w-full flex flex-col py-[16px] px-[8px] items-start rounded-xl bg-gray-100 gap-[6px]">
            <div className="text-[#333] text-[14px] font-semibold leading-[21px] tracking-[-0.28px]">
              우리 가족 식탁 온도
            </div>
            <div className="flex justify-center w-full">
              <SpeechBubble text="따뜻해지는 중이에요" />
            </div>
            <div className="w-[327px] h-[10px] bg-white rounded-[10px] relative">
              <div className="w-[173px] h-[10px] bg-primary-700 rounded-[10px] absolute top-0" />
            </div>
            <div className="flex gap-[44px] text-gray-400 text-[12px] text-center font-semibold leading-[18px] tracking-[-0.24px]">
              <div>0°C</div>
              <div>25°C</div>
              <div>50°C</div>
              <div>75°C</div>
              <div>100°C</div>
            </div>
          </div>
        </div>
        <div className="pt-[8px]">
          <div className="h-[109px] flex gap-[8px] bg-gray-100 rounded-xl justify-between items-center">
            <button className="cursor-pointer w-[103px] text-center text-[16px] font-semibold leading-[24px]">
              알림
            </button>
            <div className="w-0 h-[57px] border-l border-l-[#E2E2E2]" />
            <button className="cursor-pointer w-[103px] text-center text-[16px] font-semibold leading-[24px]">
              위시리스트
            </button>
            <div className="w-0 h-[57px] border-l border-l-[#E2E2E2]" />
            <button className="cursor-pointer w-[103px] text-center text-[16px] font-semibold leading-[24px]">
              기록
            </button>
          </div>
        </div>
        <div className="pt-[48px] flex flex-col gap-[8px]">
          <ListItem isOnOff={true} title="알림 설정" />
          <ListItem isOnOff={false} title="가족계정" to={"family-account"} />
          <ListItem
            isOnOff={false}
            title="약관 및 정책"
            to={"terms-and-policies"}
          />
          <ListItem isOnOff={false} title="로그아웃" />
        </div>
      </div>
    </>
  );
};

export default MyPage;
