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

export default function FamilyAccount() {
  const familyRoomId = useFamilyStore.getState().familyRoomId;
  const { resetProfile } = useProfileStore();

  const { data: myFamily = [] } = useFamilyProfiles(familyRoomId);
  const { data: myProfile } = useMyProfile(familyRoomId);
  const { mutate: deleteMutate } = useDeleteProfile(familyRoomId as number);

  const { mutate: patchAgreeMutate } = useMutation({
    mutationFn: () =>
      patchAgree({
        serviceTermsAgreed: false,
        privacyPolicyAgreed: false,
        familyInfoAgreed: false,
        aiNoticeAgreed: false,
        marketingOptIn: false,
      }),
  });

  const handleDelete = (profileId: number) => {
    patchAgreeMutate(undefined, {
      onSuccess: () => deleteMutate(profileId),
    });

    // 전역 상태 비워주기
    resetProfile();
  };

  const findKeyByValue = (record: Record<string, string>, value: string) => {
    return Object.entries(record).find(([_, v]) => v === value)?.[0];
  };

  return (
    <>
      <PublicHeader title={"가족계정"} />
      <div className="pt-[33px] flex flex-col items-center mx-auto">
        <div className="w-[80px]">
          <img
            src={
              myProfile?.profile.profilePicUrl ??
              rolePicture[myProfile?.profile.role as string]
            }
            alt="프로필 사진"
            className="rounded-full"
          />
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
                    picture={member.profilePicUrl ?? rolePicture[member.role]}
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
