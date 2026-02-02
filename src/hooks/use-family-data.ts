import { useEffect, useState } from "react";
import type { FamilyMembers } from "../types/family-profile";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { postFamilyRoom } from "../api/family-room";
import { useFamilyStore } from "../stores/use-family-store";
import { useNavigate } from "react-router-dom";

export const useFamilyData = () => {
  // ---------------------------------------------------------------
  //                                     가족방 조회
  // ---------------------------------------------------------------

  const [familyData, setFamilyData] = useState<FamilyMembers | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<FamilyMembers>("/data/family-data.json");

        setFamilyData(res.data);
        console.log(res);
      } catch (error) {
        console.log("데이터 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  // ---------------------------------------------------------------
  //                                   가족방 생성
  // ---------------------------------------------------------------
  const navigate = useNavigate();

  const [familyNumber, setFamilyNumber] = useState(3);
  const [availableFamilyNumber, SetAvailableFamilyNumber] =
    useState(familyNumber);
  const [familyCounts, setFamilyCounts] = useState({
    dad: 0,
    mom: 0,
    son: 0,
    daughter: 0,
  });
  const [isLeader, setIsLeader] = useState({
    dad: false,
    mom: false,
  });

  const setFamilyRoomData = useFamilyStore((state) => state.setFamilyData);

  // 토글
  const select = (role: keyof typeof familyCounts) => {
    const isTurningOn = familyCounts[role] === 0;
    const isParent = role === "mom" || role === "dad";
    if (isTurningOn && availableFamilyNumber <= 0) return;

    setFamilyCounts((prev) => ({
      ...prev,
      [role]: isTurningOn ? 1 : 0,
    }));

    // 선택 되어 있다면?
    if (!isTurningOn && isParent) {
      setIsLeader((prev) => ({
        ...prev,
        [role]: false,
      }));
    }

    SetAvailableFamilyNumber((prev) => (isTurningOn ? prev - 1 : prev + 1));
  };

  // 자식 증가
  const increment = (role: keyof typeof familyCounts) => {
    if (availableFamilyNumber > 0) {
      setFamilyCounts((prev) => ({
        ...prev,
        [role]: prev[role] + 1,
      }));

      SetAvailableFamilyNumber((prev) => prev - 1);
    }
  };

  // 자식 감소
  const decrement = (role: keyof typeof familyCounts) => {
    if (familyCounts[role] > 0) {
      setFamilyCounts((prev) => ({
        ...prev,
        [role]: prev[role] - 1,
      }));

      SetAvailableFamilyNumber((prev) => prev + 1);
    }
  };

  // 방장 설정
  const handleLeader = (role: "mom" | "dad") => {
    if (familyCounts[role] > 0) {
      setIsLeader((prev) => ({
        mom: role === "mom" ? !prev.mom : false,
        dad: role === "dad" ? !prev.dad : false,
      }));
    }
  };

  const canAdjustChildren = familyCounts["mom"] > 0 || familyCounts["dad"] > 0;

  const { mutate: createFamilyMutation } = useMutation({
    mutationFn: postFamilyRoom,
    onSuccess: (res) => {
      console.log("가족방 생성 성공:", res);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 전역 상태 저장
  const handleSubmit = () => {
    const currentPolicy = isLeader.mom
      ? "MOTHER_ONLY"
      : isLeader.dad
        ? "FATHER_ONLY"
        : "MOTHER_ONLY";

    const requestData = {
      familySize: familyNumber,
      familyComposition: {
        hasMother: familyCounts["mom"] > 0,
        hasFather: familyCounts["dad"] > 0,
        sonCount: familyCounts["son"],
        daughterCount: familyCounts["daughter"],
      },
      familyPolicy: currentPolicy,
    };

    setFamilyRoomData(requestData);
    createFamilyMutation(requestData);
    navigate("/family-invite");
  };

  return {
    familyData,
    familyNumber,
    setFamilyNumber,
    SetAvailableFamilyNumber,
    select,
    familyCounts,
    increment,
    decrement,
    canAdjustChildren,
    handleLeader,
    isLeader,
    handleSubmit,
  };
};
