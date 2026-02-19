import PublicHeader from "../../components/header/PublicHeader";
import EmptyImages from "../../assets/images/empty-profile.png";
import KakaoImage from "../../assets/images/kakao.png";
import LinkImage from "../../assets/images/link.png";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "../../stores/use-family-store";
import { useInvite } from "../../hooks/mutations/use-invite";
import toast from "react-hot-toast";

export default function FamilyInvitePage() {
  const navigate = useNavigate();
  const { familyRoomId } = useFamilyStore();

  const { mutateAsync: createInvite, isPending: isInviting } =
    useInvite(familyRoomId);

  // 카카오톡 페이지로 넘어가도록
  const InviteByKakao = async () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      toast.error("카카오 SDK가 준비되지 않았습니다.");
      return;
    }

    try {
      const { inviteUrl } = await createInvite();

      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "가족방에 초대받았어요!",
          description: `아래 링크를 눌러 참여해주세요${inviteUrl}`,
          imageUrl: "",
          link: {
            webUrl: inviteUrl,
            mobileWebUrl: inviteUrl,
          },
        },
        buttons: [
          {
            title: "가족방 참여하기",
            link: {
              webUrl: inviteUrl,
              mobileWebUrl: inviteUrl,
            },
          },
        ],
      });
    } catch {}
  };

  // 클립보드에 초대링크 자동 복사
  const InviteByLink = async () => {
    try {
      const { inviteUrl } = await createInvite();
      await navigator.clipboard.writeText(inviteUrl);
      toast.success("링크가 복사되었습니다.");
    } catch {}
  };
  return (
    <>
      <PublicHeader title="가족초대" />
      <div className="pt-[141px] flex flex-col items-center">
        <div className=" inline-flex flex-col justify-start items-center">
          <div className="text-center justify-start text-neutral-700 text-2xl font-semibold leading-9">
            가족원을 초대하고
          </div>
          <div className="text-center justify-start text-neutral-600 text-xl font-normal tracking-tight">
            가족별 프로필을 설정해봐요
          </div>
          <div className="flex pt-[40px]">
            <img
              src={EmptyImages}
              alt="빈 프로필 이미지"
              className="translate-x-[16px]"
            />
            <img src={EmptyImages} alt="빈 프로필 이미지" />
            <img
              src={EmptyImages}
              alt="빈 프로필 이미지"
              className="translate-x-[-16px]"
            />
          </div>
          <div className="pt-[80px]">
            <button
              onClick={InviteByKakao}
              className="cursor-pointer w-24 inline-flex flex-col justify-start items-center gap-2"
            >
              <img className="w-8 h-8" src={KakaoImage} />
              <div className="self-stretch text-center justify-start text-neutral-600 text-base font-normal font-['Wanted_Sans'] leading-6">
                카카오톡
              </div>
            </button>
            <button
              onClick={InviteByLink}
              className="cursor-pointer w-24 inline-flex flex-col justify-start items-center gap-2"
            >
              <img className="w-8 h-8" src={LinkImage} />
              <div className="self-stretch text-center justify-start text-neutral-600 text-base font-normal font-['Wanted_Sans'] leading-6">
                URL 복사
              </div>
            </button>
          </div>
          <div className="pt-[156px]">
            <Button
              text="다음"
              type="submit"
              onClick={() => {
                navigate("/");
              }}
              disabled={isInviting}
            />
          </div>
        </div>
      </div>
    </>
  );
}
