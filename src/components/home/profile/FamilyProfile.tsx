import { useNavigate } from "react-router-dom";
import HomeProfileCard from "./HomeProfileCard";
import { useEffect, useState } from "react";
import type { FamilyMembers } from "../../../types/family-profile";
import axios from "axios";

const FamilyProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FamilyMembers | null>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/data/family-data.json");

        setData(res.data);
        console.log(res);
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
        {data?.familyMembers.map((profile) => (
          <HomeProfileCard key={profile.id} data={profile} />
        ))}
      </div>
      <button
        onClick={() => navigate("family-wishlist")}
        className="self-stretch px-2.5 py-3 text-white bg-primary-700 rounded-xl justify-center items-center cursor-pointer"
      >
        우리가족 공통 위시리스트
      </button>
    </div>
  );
};

export default FamilyProfile;
