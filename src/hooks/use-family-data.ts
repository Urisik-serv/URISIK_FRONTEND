import { useEffect, useState } from "react";
import type { FamilyMembers } from "../types/family-profile";
import axios from "axios";

export const useFamilyData = () => {
  const [familyData, setFamilyData] = useState<FamilyMembers | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<FamilyMembers>(
          "/public/data/family-data.json",
        );

        setFamilyData(res.data);
        console.log(res);
      } catch (error) {
        console.log("데이터 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  return { familyData };
};
