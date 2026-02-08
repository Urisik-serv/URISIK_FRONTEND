import { useNavigate } from "react-router-dom";
import HomeProfileCard from "./HomeProfileCard";
import { useEffect, useState } from "react";
import type { FamilyDetails } from "../../../types/family-profile";
import { getProfiles } from "../../../api/family-profile";
import { useFamilyStore } from "../../../stores/use-family-store";

const FamilyProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FamilyDetails>();
  const familyRoomId = useFamilyStore.getState().familyRoomId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfiles(familyRoomId);

        setData(res);
        console.log("프로필 데이터: ", res);
      } catch (error) {
        console.log("데이터 로딩 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full  px-4 pt-5 pb-3 bg-white rounded-xl outline-1 outline-stone-300 flex flex-col justify-start items-center gap-3  ">
      <p className="self-stretch justify-start text-black text-lg font-medium leading-7">
        우리가족 프로필
      </p>
      <div className="flex self-stretch items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {data?.familyDetails.map((profile) => (
          <HomeProfileCard key={profile.profileId} data={profile} />
        ))}
      </div>
      <button
        onClick={() => navigate("family-wishlist")}
        className="self-stretch px-2.5 py-3 text-white text-[17px] font-semibold bg-primary-700 rounded-xl justify-center items-center cursor-pointer"
      >
        가족 위시리스트
      </button>
    </div>
  );
};

export default FamilyProfile;
