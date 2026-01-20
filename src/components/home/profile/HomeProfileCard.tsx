import DefaultMomImg from "../../../assets/profile/default-mom.svg";
import type { FamilyProfile } from "../../../types/family-profile";
interface HomeProfileCardProps {
  data: FamilyProfile;
}

const HomeProfileCard = ({ data }: HomeProfileCardProps) => {
  // 서버와 연결하기 전까지 임시 myProfile 확인
  const myProfile = data.name === "김엄마";
  return (
    <div className="shrink-0">
      <img
        src={DefaultMomImg}
        alt="프로필 이미지"
        className={`w-14 h-14 rounded-full cursor-pointer ${
          myProfile ? "border-[3px] border-primary-700" : ""
        }`}
      />
      <p className="text-center text-neutral-500 text-sm font-normal leading-5">
        {myProfile ? "내 프로필" : data.name}
      </p>
    </div>
  );
};
export default HomeProfileCard;
