import { useEffect } from "react";
import AlertModal from "../../components/common/AlertModal";
import HomePage from "./home-page";
import { useNavigate, useParams } from "react-router-dom";
import { getInviteToken, postAcceptInvite } from "../../api/invite";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { useFamilyStore } from "../../stores/use-family-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

export default function InviteEntry() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { getItem: getAccessToken } = useLocalStorage("accessToken");
  const { setFamilyRoomId } = useFamilyStore();

  // 초대 토큰 조회
  const { data, isLoading } = useQuery({
    queryKey: ["inviteToken", token],
    queryFn: () => {
      if (!token) throw new Error("토큰 없음");
      return getInviteToken(token);
    },
    enabled: !!token,
    retry: false,
  });

  // 초대 수락
  const { mutate: acceptInvite, isPending: isAccepting } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("토큰 없음");
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
        toast.error("참여 처리 중 오류가 발생했습니다.");
      }
    },
  });

  useEffect(() => {
    if (!data) return;

    if (data.expired) {
      toast.error("유효하지 않은 토큰입니다.");
      navigate("/");
    }
  }, [data, navigate]);

  const inviterName = data?.inviterName ?? null;

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center py-20">
          <LoadingSpinner text="로딩 중..." />
        </div>
      </>
    );
  }

  const handleAccept = () => {
    if (!getAccessToken()) {
      localStorage.setItem("loginRedirect", `/invite/${token}`);

      navigate("/login");
      return;
    }

    acceptInvite();
  };

  return (
    <>
      <HomePage />
      <AlertModal
        title={"초대장"}
        boldContent={`${inviterName}님의\n 가족구성원에 초대되었어요`}
        mediumContent="우리 가족 식단을 함께 관리해요"
        buttonText="참여하기"
        outsideText="탭해서 닫기"
        onClick={handleAccept}
        handleModal={() => navigate("/")}
        disabled={isAccepting}
      />
    </>
  );
}
