import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getFamilyRoom, postFamilyRoom } from "../api/family-room";
import { useFamilyStore } from "../stores/use-family-store";
import { useNavigate } from "react-router-dom";
import type { FamilyMembers, Role } from "../types/family-profile";
import axios from "axios";
import { POLICY_BY_ROLE } from "../constants/profile-record";

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

  const [familyCounts, setFamilyCounts] = useState({
    dad: 0,
    mom: 0,
    son: 0,
    daughter: 0,
    grandMother: 0,
    grandFather: 0,
  });
  const [isLeader, setIsLeader] = useState({
    dad: false,
    mom: false,
    grandMother: false,
    grandFather: false,
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
    const isParent =
      role === "mom" ||
      role === "dad" ||
      role === "grandMother" ||
      role === "grandFather";

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
  };

  // 자식 증가
  const increment = (role: keyof typeof familyCounts) => {
    setFamilyCounts((prev) => ({
      ...prev,
      [role]: prev[role] + 1,
    }));
  };

  // 자식 감소
  const decrement = (role: keyof typeof familyCounts) => {
    if (familyCounts[role] > 0) {
      setFamilyCounts((prev) => ({
        ...prev,
        [role]: prev[role] - 1,
      }));
    }
  };

  // 방장 설정
  const handleLeader = (
    role: "mom" | "dad" | "grandFather" | "grandMother",
  ) => {
    if (familyCounts[role] > 0) {
      setIsLeader((prev) => ({
        mom: role === "mom" ? !prev.mom : false,
        dad: role === "dad" ? !prev.dad : false,
        grandFather: role === "grandFather" ? !prev.grandFather : false,
        grandMother: role === "grandMother" ? !prev.grandMother : false,
      }));
    }
  };

  // 방장 반환
  const returnLeader = (): Role => {
    if (isLeader.dad) {
      return "DAD";
    } else if (isLeader.mom) {
      return "MOM";
    } else if (isLeader.grandFather) {
      return "GRANDFATHER";
    } else {
      return "GRANDMOTHER";
    }
  };

  const canAdjustChildren =
    familyCounts["mom"] > 0 ||
    familyCounts["dad"] > 0 ||
    familyCounts["grandMother"] > 0 ||
    familyCounts["grandFather"] > 0;

  const { mutateAsync: createFamilyMutation } = useMutation({
    mutationFn: postFamilyRoom,
  });

  // 전역 상태 저장
  const handleSubmit = async () => {
    const currentPolicy = POLICY_BY_ROLE[returnLeader()];

    const requestData = {
      familyComposition: {
        hasMother: familyCounts["mom"] > 0,
        hasFather: familyCounts["dad"] > 0,
        hasGrandFather: familyCounts["grandMother"] > 0,
        hasGrandMother: familyCounts["grandFather"] > 0,
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
