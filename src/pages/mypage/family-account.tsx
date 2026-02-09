import PublicHeader from "../../components/header/PublicHeader";
import EntityItem from "../../components/common/EntityItem";
import ListItem from "../../components/mypage/ListItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProfile,
  getProfile,
  getProfiles,
} from "../../api/family-profile";
import { useFamilyStore } from "../../stores/use-family-store";
import { roleMap, rolePicture } from "../../constants/profile-record";
import { patchAgree } from "../../api/member";

export default function FamilyAccount() {
  const familyRoomId = useFamilyStore.getState().familyRoomId;

  const { data: myFamily = [] } = useQuery({
    queryKey: ["myFamily"],
    queryFn: async () => {
      const res = await getProfiles(familyRoomId as number);
      return res.result.familyDetails;
    },
    enabled: familyRoomId !== null,
  });

  const { data: myProfile } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const res = await getProfile(familyRoomId as number, -1);
      return res;
    },
    enabled: familyRoomId !== null,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (profileId: number) =>
      deleteProfile(familyRoomId as number, profileId),
  });

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
    deleteMutate(profileId);
    patchAgreeMutate();
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
              myProfile?.profilePicUrl ?? rolePicture[myProfile?.role as string]
            }
            alt="프로필 사진"
          />
          <div className="pt-[8px] text-center text-lg font-semibold tracking-[0.18px]">
            {myProfile?.nickname}
          </div>
        </div>
        <div className="pt-[44px] flex flex-col items-start w-[343px]">
          <div className="text-gray-800 text-xl font-semibold tracking-[0.2px]">
            우리가족
          </div>
          <div className="pt-[16px]">
            {myFamily?.map((member, index) => {
              if (member.profileId === myProfile?.profileId) {
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
              deleteProfile={() => handleDelete(myProfile?.profileId as number)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
