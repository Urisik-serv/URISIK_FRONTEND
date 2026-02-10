import { useEffect, useState } from "react";
import AlertModal from "../../components/common/AlertModal";
import HomePage from "./home-page";
import { useNavigate, useParams } from "react-router-dom";
import { getInviteToken, postAcceptInvite } from "../../api/invite";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { useFamilyStore } from "../../stores/use-family-store";
import { useMutation } from "@tanstack/react-query";

export default function InviteEntry() {
  const [inviterName, setInviterName] = useState<string | null>(null);
  const { token } = useParams();
  const { getItem: getAccessToken } = useLocalStorage("accessToken");
  const navigate = useNavigate();
  const { setFamilyRoomId } = useFamilyStore();

  useEffect(() => {
    const fetchInviterName = async () => {
      if (!token) return;

      try {
        const inviteRes = await getInviteToken(token);
        if (inviteRes.expired) {
          alert("유효하지 않은 토큰입니다.");
          return;
        }

        setInviterName(inviteRes.inviterName);
      } catch (error) {
        console.error("초대 정보 조회 실패", error);
      }
    };

    fetchInviterName();
  }, [token]);

  const { mutate: acceptMutation } = useMutation({
    mutationFn: () => {
      console.log(token);
      if (!token) throw new Error("유효하지 않은 토큰입니다.");

      if (!getAccessToken()) {
        localStorage.setItem("loginRedirect", `/invite/${token}`);
        navigate("/login");
        return Promise.reject();
      }

      return postAcceptInvite(token);
    },
    onSuccess: (res) => {
      setFamilyRoomId(res.familyRoomId);
      navigate("/family-profile-create");
    },
    onError: (error: any) => {
      if (error.response?.data?.code === "FAMILY_JOIN_409") {
        navigate("/family-profile-create");
      } else {
        alert("참여 처리 중 오류가 발생했습니다.");
      }
    },
  });
  return (
    <>
      <HomePage />
      <AlertModal
        title={"초대장"}
        boldContent={`${inviterName}님의\n 가족구성원에 초대되었어요`}
        mediumContent="우리 가족 식단을 함께 관리해요"
        buttonText="참여하기"
        outsideText="탭해서 닫기"
        onClick={acceptMutation}
        handleModal={() => navigate("/")}
      />
    </>
  );
}
