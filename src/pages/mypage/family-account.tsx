import PublicHeader from "../../components/header/PublicHeader";
import EntityItem from "../../components/common/EntityItem";
import ListItem from "../../components/mypage/ListItem";
import { useMutation } from "@tanstack/react-query";

import { useFamilyStore } from "../../stores/use-family-store";
import { roleMap, rolePicture } from "../../constants/profile-record";
import { patchAgree } from "../../api/member";
import { useProfileStore } from "../../stores/use-profile-store";
import { useFamilyProfiles } from "../../hooks/queries/use-get-family-profiles";
import { useMyProfile } from "../../hooks/queries/use-get-my-profile";
import { useDeleteProfile } from "../../hooks/queries/use-delete-profile";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import ErrorUI from "../../components/common/ErrorUI";
import toast from "react-hot-toast";
import { postLogout } from "../../api/auth";
import LeaderProfile from "../../assets/images/profile/leader-profile";

export default function FamilyAccount() {
  const familyRoomId = useFamilyStore((s) => s.familyRoomId);

  const {
    data: myFamily = [],
    isPending: familyLoading,
    isError: familyError,
    refetch: refetchFamily,
  } = useFamilyProfiles(familyRoomId);

  const {
    data: myProfile,
    isPending: profileLoading,
    isError: profileError,
    refetch: refetchProfile,
  } = useMyProfile(familyRoomId);

  const { mutateAsync: deleteMutate } = useDeleteProfile(
    familyRoomId as number,
  );
  const { mutateAsync: patchAgreeMutate } = useMutation({
    mutationFn: () =>
      patchAgree({
        serviceTermsAgreed: false,
        privacyPolicyAgreed: false,
        familyInfoAgreed: false,
        aiNoticeAgreed: false,
        marketingOptIn: false,
      }),
  });

  const handleDelete = async (profileId: number) => {
    try {
      await deleteMutate(profileId);

      await patchAgreeMutate();

      await postLogout();

      localStorage.removeItem("accessToken");

      useProfileStore.persist.clearStorage();
      useFamilyStore.persist.clearStorage();

      window.location.replace("/");
    } catch (error) {
      toast.error("계정 탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  const findKeyByValue = (record: Record<string, string>, value: string) => {
    return Object.entries(record).find(([_, v]) => v === value)?.[0];
  };

  const isLoading = familyLoading || profileLoading;
  const isError = familyError || profileError;

  if (isLoading) {
    return (
      <>
        <PublicHeader title="가족계정" />
        <div className="flex justify-center py-20">
          <LoadingSpinner text="로딩 중..." />
        </div>
      </>
    );
  }

  const handleRetry = () => {
    refetchFamily();
    refetchProfile();
  };

  if (isError) {
    return (
      <>
        <PublicHeader title="프로필 편집" />
        <ErrorUI
          message="프로필을 불러오지 못했습니다."
          onRetry={handleRetry}
        />
      </>
    );
  }
  return (
    <>
      <PublicHeader title={"가족계정"} />
      <div className="pt-[33px] flex flex-col items-center mx-auto">
        <div className="w-[80px]">
          {myProfile?.isLeader ? (
            <LeaderProfile
              href={
                useProfileStore.getState().savedFormData.profilePicUrl ??
                rolePicture[myProfile?.profile.role as string]
              }
            />
          ) : (
            <img
              src={
                useProfileStore.getState().savedFormData.profilePicUrl ??
                rolePicture[myProfile?.profile.role as string]
              }
              className="size-[80px] rounded-full"
            />
          )}
          <div className="pt-[8px] text-center text-lg font-semibold tracking-[0.18px]">
            {myProfile?.profile.nickname}
          </div>
        </div>
        <div className="pt-[44px] flex flex-col items-start w-[343px]">
          <div className="text-gray-800 text-xl font-semibold tracking-[0.2px]">
            우리가족
          </div>
          <div className="pt-[16px]">
            {myFamily?.map((member, index) => {
              if (member.profileId === myProfile?.profile.profileId) {
                return null;
              } else {
                return (
                  <EntityItem
                    key={member.profileId}
                    picture={
                      member.profilePicUrl?.includes("no_profile_image")
                        ? rolePicture[member.role]
                        : member.profilePicUrl
                    }
                    name={member.nickname}
                    category={findKeyByValue(roleMap, member.role) as string}
                    border={
                      index !== myFamily.length - 2
                        ? "border-b border-b-gray-200"
                        : ""
                    }
                    deleteProfile={() => handleDelete(member.profileId)}
                  />
                );
              }
            })}
          </div>
          <div className="pt-[44px] flex flex-col w-full gap-[8px] ">
            <ListItem
              title="가족원 초대하기"
              isOnOff={false}
              to={"../../invite"}
            />
            <ListItem
              title="가족 계정 나가기"
              isOnOff={false}
              deleteProfile={() =>
                handleDelete(myProfile?.profile.profileId as number)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
