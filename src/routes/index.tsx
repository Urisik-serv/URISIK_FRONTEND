import { createBrowserRouter } from "react-router-dom";
import MobileLayout from "../layouts/mobile-layout";
import ProtectedRoute from "./protected-route";
import SignupPage from "../pages/auth/signup-page";
import LoginPage from "../pages/auth/login-page";
import HomePage from "../pages/home/home-page";
import MyPage from "../pages/mypage/my-page";
import PlannerPage from "../pages/planner/planner-page";

import MealPlanCreatePage from "../pages/meal-plan/meal-plan-create-page";
import MealPlanResultPage from "../pages/meal-plan/meal-plan-result-page";


export const router = createBrowserRouter([
  {
    // 최상위: 모든 페이지를 감싸는 모바일 레이아웃
    path: "/",
    element: <MobileLayout />,
    errorElement: <div>에러가 발생했습니다</div>, // 전체 에러 바운더리
    children: [
      // Public Routes (로그인 없이 접근 가능)
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "agreement",
        element: <TermsAgreementPage />,
      },

      // Protected Routes (로그인 필요), 이후 페이지는 여기에 라우팅
      // 지금은 인증이 없을 때 접근 가능하게 해놓음
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true, // path: '/' 와 동일
            element: <HomePage />,
          },
          { path: "mypage", element: <MyPage /> }, // 마이페이지 라우팅, path는 임시로 부여
          { path: "planner", element: <PlannerPage /> },
          { path: "meal-plan/create", element: <MealPlanCreatePage /> },
          { path: "meal-plan/result", element: <MealPlanResultPage /> },
        ],
      },
    ],
  },
]);
