import { useState } from "react";
import AlertModal from "../../components/common/AlertModal";
import HomePage from "./home-page";
import { useNavigate, useParams } from "react-router-dom";
import { getInviteToken, postAcceptInvite } from "../../api/invite";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { useFamilyStore } from "../../stores/use-family-store";
import { useMutation } from "@tanstack/react-query";

export default function InviteEntry() {
  const [isOpen, setIsOpen] = useState(true);
  const { token } = useParams();
  const { getItem: getAccessToken } = useLocalStorage("accessToken");
  const navigate = useNavigate();
  const { setFamilyRoomId } = useFamilyStore();

  const getInviterName = async () => {
    if (token == null) {
      alert("유효하지 않은 토큰입니다.");
      return;
    }

    const res = await getInviteToken(token);

    if (res.expired) {
      alert("유효하지 않은 토큰입니다.");
      return;
    }

    if (!getAccessToken) {
      alert("로그인이 필요합니다");
      navigate("/login");
    }

    return res.inviterName;
  };

  const { mutate: acceptMutation } = useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error("유효하지 않은 토큰입니다.");
      }
      return postAcceptInvite(token);
    },
    onSuccess: (res) => {
      setFamilyRoomId(res.familyRoomId);
      navigate("/family-profile-create");
    },
  });
  return (
    <>
      <HomePage />
      {isOpen && (
        <AlertModal
          title={"초대장"}
          boldContent={`${getInviterName}님의 가족구성원에 초대되었어요`}
          mediumContent="우리 가족 식단을 함께 관리해요"
          buttonText="참여하기"
          outsideText="탭해서 닫기"
          onClick={() => setIsOpen((prev) => !prev)}
          handleModal={acceptMutation}
        />
      )}
    </>
  );
}
