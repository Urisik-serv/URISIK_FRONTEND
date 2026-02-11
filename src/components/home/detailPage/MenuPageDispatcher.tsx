import { useSearchParams } from "react-router-dom";
import TransMenuPage from "../../../pages/home/trans-menu-page";
import MenuInformationPage from "../../../pages/home/menu-information-page";

const MenuPageDispatcher = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  if (type === "TRANSFORMED") {
    return <TransMenuPage />;
  }

  return <MenuInformationPage />;
};

export default MenuPageDispatcher;
