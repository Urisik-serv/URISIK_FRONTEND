import PublicHeader from "../../components/header/PublicHeader";
import EmptyImages from "../../assets/images/empty-profile.png";
import KakaoImage from "../../assets/images/kakao.png";
import LinkImage from "../../assets/images/link.png";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function FamilyInvitePage() {
  const navigate = useNavigate();
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
            <button className="cursor-pointer w-24 inline-flex flex-col justify-start items-center gap-2">
              <img className="w-8 h-8" src={KakaoImage} />
              <div className="self-stretch text-center justify-start text-neutral-600 text-base font-normal font-['Wanted_Sans'] leading-6">
                카카오톡
              </div>
            </button>
            <button className="cursor-pointer w-24 inline-flex flex-col justify-start items-center gap-2">
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
                navigate("/family-invite");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
