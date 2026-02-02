import { createBrowserRouter } from "react-router-dom";
import MobileLayout from "../layouts/mobile-layout";
import ProtectedRoute from "./protected-route";
import SignupPage from "../pages/auth/signup-page";
import LoginPage from "../pages/auth/login-page";
import HomePage from "../pages/home/home-page";
import MyPage from "../pages/mypage/my-page";
import MealPlanCreatePage from "../pages/meal-plan/meal-plan-create-page";
import MealPlanResultPage from "../pages/meal-plan/meal-plan-result-page";
import MealPlanEditPage from "../pages/meal-plan/meal-plan-edit-page";
import TermsAgreementPage from "../pages/auth/terms-agreement-page";
import OnboardingPage from "../pages/auth/onboarding-page";
import FamilyCreatePage from "../pages/family/family-create-page";
import FamilyInvitePage from "../pages/family/family-invite-page";
import FamilyProfileCreatePage from "../pages/profile/family-profile-create-page";
import AllergiesSearchPage from "../pages/family/allergies-search-page";
import FamilyWishListPage from "../pages/family/family-wishlist-page";
import MenuInformationPage from "../pages/home/menu-information-page";
import ModifyProfilePage from "../pages/profile/modify-profile-page";
import TermsAndPolicies from "../pages/mypage/terms-and-policies";
import AiRecommendationNotice from "../pages/terms-and-policies/ai-recommendation-notice";
import ChildrenAndFamily from "../pages/terms-and-policies/children-and-family";
import MarketingPreferences from "../pages/terms-and-policies/marketing-preferences";
import PrivacyPolicy from "../pages/terms-and-policies/privacy-policy";
import TermsOfService from "../pages/terms-and-policies/term-of-service";
import MealPlanPage from "../pages/meal-plan/meal-plan-page";
import NoticePage from "../pages/mypage/notice-page";
import FamilyAccount from "../pages/mypage/family-account";
import MyProfilePage from "../pages/profile/my-profile-page";
import History from "../pages/mypage/history";
import LoginRedirectPage from "../pages/auth/login-redirect-page";

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
        path: "login/callback",
        element: <LoginRedirectPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "agreement",
        element: <TermsAgreementPage />,
      },
      {
        path: "onboarding",
        element: <OnboardingPage />,
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
          { path: "mypage", element: <MyPage /> },
          { path: "mypage/terms-and-policies", element: <TermsAndPolicies /> }, // 마이페이지 라우팅, path는 임시로 부여
          { path: "mypage/notice", element: <NoticePage /> },
          { path: "mypage/family-account", element: <FamilyAccount /> },
          { path: "mypage/history", element: <History /> },

          { path: "meal-plan", element: <MealPlanPage /> },
          { path: "meal-plan/create", element: <MealPlanCreatePage /> },
          { path: "meal-plan/result", element: <MealPlanResultPage /> },
          { path: "meal-plan/edit", element: <MealPlanEditPage /> },
          { path: "family-create", element: <FamilyCreatePage /> },
          { path: "family-invite", element: <FamilyInvitePage /> },
          { path: "family-wishlist", element: <FamilyWishListPage /> },
          {
            path: "family-profile-create",
            element: <FamilyProfileCreatePage />,
          },
          {
            path: "family-profile-create/allergy-search",
            element: <AllergiesSearchPage />,
          },
          {
            path: "modify-profile",
            element: <ModifyProfilePage />,
          },
          {
            path: "modify-profile/allergy-search",
            element: <AllergiesSearchPage />,
          },
          { path: "my-profile", element: <MyProfilePage /> },
          {
            path: "menu-information/:menuId",
            element: <MenuInformationPage />,
          },
          {
            path: "ai-recomendation-notice",
            element: <AiRecommendationNotice />,
          },
          { path: "children-and-family", element: <ChildrenAndFamily /> },
          { path: "marketing-preference", element: <MarketingPreferences /> },
          { path: "privacy-policy", element: <PrivacyPolicy /> },
          { path: "terms-of-service", element: <TermsOfService /> },
        ],
      },
    ],
  },
]);
