import { useNavigate } from "react-router-dom";
import headerLogo from "../../assets/logos/header-logo.png";
import shoppingCart from "../../assets/icons/shopping-outline.svg";
import accountImg from "../../assets/icons/account-outline.svg";

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 py-2.5 flex justify-between items-center">
      <img
        src={headerLogo}
        alt="Urisik logo"
        className="w-16 h-8 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex justify-start items-center gap-3.5">
        <div className="flex justify-center items-center w-8 h-8 cursor-pointer">
          <img src={shoppingCart} className="w-6 h-6" />
        </div>{" "}
        {/*장바구니 페이지로 이동은 아직 미구현*/}
        <div className="flex justify-center items-center w-8 h-8 cursor-pointer bg-zinc-100 rounded-2xl">
          <img src={accountImg} className="w-6 h-6" />
        </div>{" "}
        {/*마이 페이지로 이동은 아직 미구현*/}
      </div>
    </div>
  );
};

export default HomeHeader;
