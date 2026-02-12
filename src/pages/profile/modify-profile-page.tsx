import { useEffect, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import PictureModifyModal from "../../components/profile/PictureModifyModal";
import ProfileDataForm from "../../components/profile/ProfileDataForm";
import { useFamilyStore } from "../../stores/use-family-store";
import { useProfileStore } from "../../stores/use-profile-store";
import { useGetProfile } from "../../hooks/queries/use-get-profile";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import ErrorUI from "../../components/common/ErrorUI";

export default function ModifyProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const familyRoomId = useFamilyStore((s) => s.familyRoomId);

  const { data, isPending, isError, refetch } = useGetProfile(familyRoomId);
  const { setSavedFormData, hasLoadedFromServer, markLoaded } =
    useProfileStore();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (data && !hasLoadedFromServer) {
      setSavedFormData(data);
      markLoaded();
    }
  }, [data, hasLoadedFromServer, setSavedFormData, markLoaded]);

  if (isPending) {
    return (
      <>
        <PublicHeader title="프로필 편집" />
        <div className="flex justify-center py-10">
          <LoadingSpinner text="로딩중..." />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <PublicHeader title="프로필 편집" />
        <ErrorUI message="프로필을 불러오지 못했습니다." onRetry={refetch} />
      </>
    );
  }

  return (
    <>
      <PublicHeader title="프로필 편집" />
      <div className="flex justify-center">
        <ProfileDataForm isEdit={true} handlePicture={handleModal} />
      </div>
      {isOpen && <PictureModifyModal onClick={handleModal} />}
    </>
  );
}
