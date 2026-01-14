import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";

export default function MobileLayout() {
  const location = useLocation();
  const footerPaths = ["/", "/planner"];

  const showFooter = footerPaths.includes(location.pathname);
  return (
    <div className="flex min-h-screen justify-center bg-gray-50">
      <div className="relative w-full max-w-[375px] bg-white shadow-md">
        <Outlet />
        {showFooter && <Footer />}
      </div>
    </div>
  );
}
