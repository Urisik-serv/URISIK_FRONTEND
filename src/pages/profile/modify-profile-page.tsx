import { useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import PictureModifyModal from "../../components/profile/PictureModifyModal";
import ProfileDataForm from "../../components/profile/ProfileDataForm";

export default function ModifyProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <PublicHeader title={"프로필 편집"} />
      <div className="flex justify-center">
        <ProfileDataForm
          isSelected={0}
          isEdit={true}
          handlePicture={handleModal}
        />
      </div>
      {isOpen && <PictureModifyModal onClick={handleModal} />}
    </>
  );
}
