import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-50">
      <div className="relative w-full max-w-[375px] bg-white shadow-md">
        <Outlet />
      </div>
    </div>
  );
}
