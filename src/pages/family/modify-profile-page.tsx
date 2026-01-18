import ProfileDataForm from "../../components/family/ProfileDataForm";
import PublicHeader from "../../components/header/PublicHeader";

export default function ModifyProfilePage() {
  return (
    <>
      <PublicHeader title={"프로필 편집"} />
      <div className="flex justify-center">
        <ProfileDataForm isSelected={0} isEdit={true} />
      </div>
    </>
  );
}
