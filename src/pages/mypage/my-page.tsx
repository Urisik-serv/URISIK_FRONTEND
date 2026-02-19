import PublicHeader from "../../components/header/PublicHeader";
import { useNavigate } from "react-router-dom";
import ListItem from "../../components/mypage/ListItem";
import { useState } from "react";
import AlertModal from "../../components/common/AlertModal";
import { useAuth } from "../../hooks/use-auth";
import { useProfileStore } from "../../stores/use-profile-store";
import LeaderProfile from "../../assets/images/profile/leader-profile";
import { rolePicture } from "../../constants/profile-record";
import BellIcon from "../../assets/mypage/bell.svg";
import ListBox from "../../assets/mypage/list-box.svg";
import Finance from "../../assets/mypage/finance.svg";
import { TemperBar } from "../../components/mypage/TemperBar";
import { useNoticeList } from "../../hooks/use-notice-list";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

const MyPage = () => {
  const { LogoutMutate, LogoutIsPending } = useAuth();
  const { generation } = useNoticeList();

  const myData = useProfileStore((state) => state.savedFormData);
  const isLeader = useProfileStore().isLeader;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    LogoutMutate();
  };

  if (LogoutIsPending) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <LoadingSpinner text="로딩중..." />
      </div>
    );
  }

  const profileImageSrc = myData.profilePicUrl?.includes("no_profile_image")
    ? rolePicture[myData.role]
    : myData.profilePicUrl;

  return (
    <>
      <PublicHeader title="마이페이지" />
      <div className="pt-[33px] w-[343px] mx-auto flex flex-col ">
        <div className="flex justify-between  w-full">
          <div className="flex gap-[12px] items-end">
            {isLeader ? (
              <LeaderProfile href={profileImageSrc as string} />
            ) : (
              <img src={profileImageSrc} className="size-[80px] rounded-full" />
            )}
            <div className="text-2xl font-semibold leading-[36px]">
              {myData.nickname}
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
          <div className=" w-full flex flex-col py-[16px] px-[8px] items-start rounded-xl bg-primary-100 gap-[6px] border border-primary-300">
            <div className="text-[#333] text-[14px] font-semibold leading-[21px] tracking-[-0.28px]">
              우리 가족 식탁 온도
            </div>
            <TemperBar generationNumber={generation ?? 0} />
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
          <div className="h-[109px] flex gap-[8px] bg-primary-100 border border-primary-300 rounded-xl justify-between items-center">
            <button
              onClick={() => navigate("notice")}
              className="cursor-pointer w-[103px] flex flex-col items-center gap-[4px]"
            >
              <img src={BellIcon} alt="알림" className="size-[36px]" />
              <div className="text-center text-primary-600 text-[14px] font-semibold leading-[24px">
                알림
              </div>
            </button>
            <div className="w-0 h-[57px] border-l border-l-primary-300" />
            <button
              className="cursor-pointer w-[103px] flex flex-col items-center gap-[4px]"
              onClick={() => {
                navigate("/family-wishlist");
              }}
            >
              <img src={ListBox} alt="위시리스트" className="size-[36px]" />
              <div className="text-center text-primary-600 text-[14px] font-semibold leading-[24px]">
                위시리스트
              </div>
            </button>
            <div className="w-0 h-[57px] border-l border-l-primary-300" />
            <button
              onClick={() => {
                navigate("history");
              }}
              className="cursor-pointer w-[103px] flex flex-col items-center gap-[4px]"
            >
              <img src={Finance} alt="기록" className="size-[36px]" />
              <div className="text-center text-primary-600 text-[16px] font-semibold leading-[24px]">
                기록
              </div>
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
          <div onClick={handleModal} className="cursor-pointer">
            <ListItem isOnOff={false} title="로그아웃" />
          </div>
        </div>
        {isOpen && (
          <AlertModal
            title="안내창"
            boldContent={`[${myData.nickname}]님`}
            mediumContent="우리식에서 로그아웃할까요?"
            buttonText="로그아웃"
            outsideText="탭해서 취소"
            handleModal={handleModal}
            onClick={handleLogout}
          />
        )}
      </div>
    </>
  );
};

export default MyPage;
