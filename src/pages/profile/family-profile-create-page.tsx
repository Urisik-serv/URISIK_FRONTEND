import PublicHeader from "../../components/header/PublicHeader";
import ProfileDataForm from "../../components/profile/ProfileDataForm";

export default function FamilyProfileCreatePage() {
  return (
    <>
      <PublicHeader title={"프로필 생성"} />
      <div className="flex justify-center">
        <ProfileDataForm isEdit={false} />
      </div>
    </>
  );
}
