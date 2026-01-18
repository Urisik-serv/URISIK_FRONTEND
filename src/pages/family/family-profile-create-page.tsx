import PublicHeader from "../../components/header/PublicHeader";
import ProfileDataForm from "../../components/family/ProfileDataForm";

export default function FamilyProfileCreatePage() {
  return (
    <>
      <PublicHeader title={"프로필 생성"} />
      <div className="flex justify-center">
        <ProfileDataForm isSelected={1} isEdit={false} />
      </div>
    </>
  );
}
