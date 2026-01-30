import logo from "../../assets/logos/main-logo.svg";
import kakaoLogo from "../../assets/logos/kakao-logo.svg";
import googleLogo from "../../assets/logos/Google Logo.svg";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="h-dvh flex flex-col items-center">
      <div className=" pt-[269px]">
        <img src={logo} alt="로그인 화면 로고" className="w-[240px] h-[80px]" />
        <div className="text-center justify-start pt-[36px]">
          <span className="text-neutral-500 text-xs font-normal  leading-4">
            모두의 식단 기호를 반영한 <br />
          </span>
          <span className="text-neutral-500 text-sm font-semibold  leading-5">
            가족 단위의 식단 관리 서비스
          </span>
        </div>
      </div>
      <div className="pt-[124px] flex flex-col items-center gap-[8px] w-[343px]">
        <button
          onClick={handleKakaoLogin}
          className="cursor-pointer self-stretch px-4 pt-[15px] pb-4 bg-[#FEE500] rounded-[10px] inline-flex justify-center items-center gap-3.5 h-[55px]"
        >
          <div className="flex justify-start items-center gap-[15px] ">
            <div className="w-6 h-6 relative overflow-hidden">
              <img src={kakaoLogo} alt="카카오 로그인 로고" />
            </div>
            <div className="justify-start text-black text-base font-normal ">
              카카오 로그인
            </div>
          </div>
        </button>
        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer self-stretch p-4 bg-white rounded-[10px] border border-1 border-neutral-300 inline-flex justify-center items-center gap-3.5 h-[56px]"
        >
          <div className="flex justify-start items-center gap-[15px] ">
            <div className="w-6 h-6 relative bg-white">
              <img src={googleLogo} alt="구글 로그인 로고" />
            </div>
            <div className="justify-start text-black/50 text-base font-normal  ">
              구글 로그인
            </div>
          </div>
        </button>
        <div className="pt-[8px]">
          <div className="inline-flex justify-start items-end gap-4">
            <div className="cursor-pointer justify-start text-[#B8B8B8] text-sm font-normal  underline underline-offset-4 decoration-1">
              아이디 찾기
            </div>
            <div className="w-0 h-4 outline outline-1 outline-offset-[-0.50px] outline-[#B8B8B8]" />
            <div className="cursor-pointer justify-start text-[#B8B8B8] text-sm font-normal  underline underline-offset-4 decoration-1">
              비밀번호 찾기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
