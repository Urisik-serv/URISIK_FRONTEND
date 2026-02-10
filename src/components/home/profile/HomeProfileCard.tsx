import { useNavigate } from "react-router-dom";
import type { FamilyDetail } from "../../../types/family-profile";
import { useProfileModalActions } from "../../../hooks/use-profile-modal-store";
import { getProfile } from "../../../api/family-profile";
import { useEffect, useState } from "react";
import { useFamilyStore } from "../../../stores/use-family-store";
import { rolePicture } from "../../../constants/profile-record";
interface HomeProfileCardProps {
  data: FamilyDetail;
}

const HomeProfileCard = ({ data }: HomeProfileCardProps) => {
  const navigate = useNavigate();
  const { isOpen } = useProfileModalActions();

  const familyRoomId = useFamilyStore.getState().familyRoomId;
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile(familyRoomId, -1);
      setNickname(profileData.nickname);
    };

    fetchProfile();
  }, []);
  const myProfile = data.nickname === nickname;

  const handleClick = () => {
    if (myProfile) navigate("my-profile");
    else isOpen(data);
  };

  // 프로필 이미지
  const profileImageSrc =
    data.profilePicUrl && data.profilePicUrl !== "테스트용 url"
      ? data.profilePicUrl
      : rolePicture[data.role];

  return (
    <div onClick={handleClick} className="shrink-0">
      <img
        src={profileImageSrc}
        alt="프로필 이미지"
        className={`w-14 h-14 rounded-full cursor-pointer ${
          myProfile ? "border-[3px] border-primary-700" : ""
        }`}
      />
      <p className="text-center text-neutral-500 text-sm font-normal leading-5">
        {myProfile ? "내 프로필" : data.nickname}
      </p>
    </div>
  );
};
export default HomeProfileCard;
