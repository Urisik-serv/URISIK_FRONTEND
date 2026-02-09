import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // 실제 앱에서는 전역 상태(Zustand 등)나 쿠키/스토리지 체크
  const isAuthenticated = !!localStorage.getItem("accessToken");
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    // 지금은 인증이 없을 때 접근 가능하게 해놓음
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}
