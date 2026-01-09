import logo from "../../assets/logos/logo.svg";

export default function SplashScreen() {
  return (
    <div className="h-dvh flex flex-col items-center">
      <div className=" pt-[269px] pl-[82px] pr-[82.4px]">
        <img
          src={logo}
          alt="로그인 화면 로고"
          className="w-[211px] h-[84.1px]"
        />
        <div className="text-center pt-[36px]">
          <span className="text-neutral-500 text-xs font-normal font-['Pretendard'] leading-4">
            모두의 식단 기호를 반영한 <br />
          </span>
          <span className="text-neutral-500 text-sm font-semibold font-['Pretendard'] leading-5">
            가족 단위의 식단 관리 서비스
          </span>
        </div>
      </div>
    </div>
  );
}
