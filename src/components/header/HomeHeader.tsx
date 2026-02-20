import { useNavigate } from "react-router-dom";
import headerLogo from "../../assets/logos/main-logo.svg";
import accountImg from "../../assets/icons/account-outline.svg";

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 py-2.5 flex justify-between items-center">
      <img
        src={headerLogo}
        alt="우리식 로고"
        className="w-16 h-8 items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex justify-start items-center gap-3.5">
        <div className="flex justify-center items-center w-8 h-8 cursor-pointer bg-zinc-100 rounded-2xl">
          <img
            src={accountImg}
            alt="마이페이지 아이콘"
            className="w-6 h-6"
            onClick={() => navigate("/mypage")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
