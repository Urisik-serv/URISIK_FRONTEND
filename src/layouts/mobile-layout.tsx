import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";
import UpButton from "../components/common/UpButton";

export default function MobileLayout() {
  const location = useLocation();
  const footerPaths = ["/", "/meal-plan"];

  const showFooter = footerPaths.includes(location.pathname);
  return (
    <div className="flex min-h-[100dvh] justify-center bg-gray-50">
      <div className="relative w-full max-w-[375px] bg-white shadow-md">
        <Outlet />
        {showFooter && <Footer />}
        <UpButton />
      </div>
    </div>
  );
}
