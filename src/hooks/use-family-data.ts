import { useState, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFamilyRoom, postFamilyRoom } from "../api/family-room";
import { useFamilyStore } from "../stores/use-family-store";
import { useNavigate } from "react-router-dom";
import type { Role } from "../types/family-profile";
import { POLICY_BY_ROLE } from "../constants/profile-record";

export const useFamilyData = () => {
  const navigate = useNavigate();

  const {
    setFamilyData: setStoreFamilyData,
    setFamilyRoomId,
    familyRoomId,
  } = useFamilyStore();

  // 가족방 Id 복구
  const { data } = useQuery({
    queryKey: ["familyRoom"],
    queryFn: getFamilyRoom,
    enabled: !familyRoomId,
    retry: false,
  });

  useEffect(() => {
    const id = data?.result?.familyRoomId;
    if (id) {
      setFamilyRoomId(id);
    }
  }, [data, setFamilyRoomId]);

  // 상태 관리
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

  const select = useCallback((role: keyof typeof familyCounts) => {
    setFamilyCounts((prev) => {
      const isTurningOn = prev[role] === 0;

      return {
        ...prev,
        [role]: isTurningOn ? 1 : 0,
      };
    });

    if (
      role === "mom" ||
      role === "dad" ||
      role === "grandMother" ||
      role === "grandFather"
    ) {
      setIsLeader((prev) => ({
        ...prev,
        [role]: false,
      }));
    }
  }, []);

  const increment = useCallback((role: keyof typeof familyCounts) => {
    setFamilyCounts((prev) => ({
      ...prev,
      [role]: prev[role] + 1,
    }));
  }, []);

  const decrement = useCallback((role: keyof typeof familyCounts) => {
    setFamilyCounts((prev) => ({
      ...prev,
      [role]: Math.max(prev[role] - 1, 0),
    }));
  }, []);

  const handleLeader = useCallback(
    (role: "mom" | "dad" | "grandFather" | "grandMother") => {
      if (familyCounts[role] === 0) return;

      setIsLeader({
        mom: role === "mom",
        dad: role === "dad",
        grandFather: role === "grandFather",
        grandMother: role === "grandMother",
      });
    },
    [familyCounts],
  );

  const returnLeader = (): Role => {
    if (isLeader.dad) return "DAD";
    if (isLeader.mom) return "MOM";
    if (isLeader.grandFather) return "GRANDFATHER";
    return "GRANDMOTHER";
  };

  const canAdjustChildren =
    familyCounts.mom > 0 ||
    familyCounts.dad > 0 ||
    familyCounts.grandMother > 0 ||
    familyCounts.grandFather > 0;

  // 가족방 생성 mutation
  const { mutate: createFamily, isPending: isCreating } = useMutation({
    mutationFn: postFamilyRoom,
    onSuccess: (res) => {
      const id = res?.result?.familyRoomId;

      if (id) {
        setFamilyRoomId(id);
        setStoreFamilyData(res.result);
        navigate("/family-profile-create");
      }
    },
    onError: () => {
      alert("가족방 생성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = () => {
    const currentPolicy = POLICY_BY_ROLE[returnLeader()];

    const requestData = {
      familyComposition: {
        hasMother: familyCounts.mom > 0,
        hasFather: familyCounts.dad > 0,
        hasGrandMother: familyCounts.grandMother > 0,
        hasGrandFather: familyCounts.grandFather > 0,
        sonCount: familyCounts.son,
        daughterCount: familyCounts.daughter,
      },
      familyPolicy: currentPolicy,
    };

    createFamily(requestData);
  };

  return {
    select,
    familyCounts,
    increment,
    decrement,
    canAdjustChildren,
    handleLeader,
    isLeader,
    handleSubmit,
    isCreating,
  };
};
