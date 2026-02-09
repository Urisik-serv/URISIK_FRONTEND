import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getFamilyRoom, postFamilyRoom } from "../api/family-room";
import { useFamilyStore } from "../stores/use-family-store";
import { useNavigate } from "react-router-dom";
import type { FamilyMembers } from "../types/family-profile";
import axios from "axios";

export const useFamilyData = () => {
  // 다른 파일 코드 에러 방지
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

  const {
    setFamilyData: setStoreFamilyData,
    setFamilyRoomId,
    familyRoomId,
  } = useFamilyStore();

  useEffect(() => {
    const syncFamilyId = async () => {
      try {
        const res = await getFamilyRoom();
        if (res?.result?.familyRoomId) {
          setFamilyRoomId(res.result.familyRoomId);
        }
      } catch (e) {
        console.error("ID 복구 실패:", e);
      }
    };

    if (!familyRoomId) syncFamilyId();
  }, []);

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

  const { mutateAsync: createFamilyMutation } = useMutation({
    mutationFn: postFamilyRoom,
  });

  // 전역 상태 저장
  const handleSubmit = async () => {
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

    try {
      const res = await createFamilyMutation(requestData);
      console.log("생성 응답:", res);
      if (res.result.familyRoomId) {
        setFamilyRoomId(res.result.familyRoomId);
        setStoreFamilyData(requestData);
        console.log(
          "스토어 업데이트 요청 직후:",
          useFamilyStore.getState().familyRoomId,
        );
        navigate("/family-profile-create");
      }
    } catch (error) {
      console.error("생성 실패:", error);
    }
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
