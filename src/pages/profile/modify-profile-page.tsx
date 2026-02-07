import { useEffect, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import PictureModifyModal from "../../components/profile/PictureModifyModal";
import ProfileDataForm from "../../components/profile/ProfileDataForm";
import { useFamilyStore } from "../../stores/use-family-store";
import { getProfile } from "../../api/family-profile";
import { useProfileStore } from "../../stores/use-profile-store";
import {
  allergyMap,
  roleMap,
  rolePicture,
} from "../../constants/profile-record";

export default function ModifyProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const familyRoomId = useFamilyStore((s) => s.familyRoomId);
  const { setSavedFormData, hasLoadedFromServer, markLoaded } =
    useProfileStore();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const findKeyByValue = (record: Record<string, string>, value: string) => {
    return Object.entries(record).find(([_, v]) => v === value)?.[0];
  };

  useEffect(() => {
    if (familyRoomId === null) return;
    if (hasLoadedFromServer) return;

    const fetchProfile = async () => {
      try {
        const res = await getProfile(familyRoomId, -1);

        setSavedFormData({
          nickname: res.nickname,
          role: roleMap[res.role],
          allergies:
            res.allergyAndAlterIngredients.length === 1 &&
            res.allergyAndAlterIngredients[0].allergen === "NONE"
              ? false
              : (res.allergyAndAlterIngredients
                  .map((item: { allergen: string }) =>
                    findKeyByValue(allergyMap, item.allergen),
                  )
                  .filter(Boolean) as string[]),
          preferences: res.dietPreferences ?? [],
          likedIngredients: res.likedIngredients ?? "",
          dislikedIngredients: res.dislikedIngredients ?? "",
          profilePicUrl: rolePicture[res.role],
        });
        markLoaded();
      } catch (error) {
        console.error("프로필 조회 실패", error);
      }
    };

    fetchProfile();
  }, [familyRoomId, setSavedFormData]);

  return (
    <>
      <PublicHeader title={"프로필 편집"} />
      <div className="flex justify-center">
        <ProfileDataForm isEdit={true} handlePicture={handleModal} />
      </div>
      {isOpen && <PictureModifyModal onClick={handleModal} />}
    </>
  );
}
