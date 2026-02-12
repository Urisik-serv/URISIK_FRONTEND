import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getProfile } from "../api/family-profile";

interface MyProfileState {
  myProfileId: number | undefined;
  nickname: string;

  fetchMyProfile: (familyRoomId: number) => Promise<void>;
}

export const useMyProfileStore = create<MyProfileState>()(
  persist(
    (set) => ({
      myProfileId: undefined,
      nickname: "",

      fetchMyProfile: async (familyRoomId: number) => {
        try {
          const data = await getProfile(familyRoomId, -1);

          set({
            myProfileId: data.profileId,
            nickname: data.nickname,
          });
        } catch (error) {
          console.error("내 프로필 조회 실패:", error);
        }
      },
    }),
    {
      name: "my-profile-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
